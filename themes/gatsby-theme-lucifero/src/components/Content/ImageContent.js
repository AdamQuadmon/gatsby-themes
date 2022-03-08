import React from 'react'
import { findIndex } from 'lodash'
import { navigate } from 'gatsby'
import { motion } from 'framer-motion'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  Box,
  Button,
  Flex,
  Heading,
  Show,
  Text,
  Tooltip,
  useStyleConfig,
} from '@chakra-ui/react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { BiPhotoAlbum, BiLink } from 'react-icons/bi'
import Image, { ImageLink } from '../Image'
import { Link } from '../Link'

const ImageContent = ({ pageData, variant, ...rest }) => {
  const {
    data: { page, album, images },
  } = pageData

  const { t } = useTranslation()

  const styles = useStyleConfig('ImageContent', { variant })
  const { image } = page

  const index = getIndex(images.edges, image.slug)

  const { prev, next } = getSiblings(index, images.edges)
  const direction = getDirection(next)

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      prev && navigate(prev.slug)
    } else if (swipe > swipeConfidenceThreshold) {
      next && navigate(next.slug)
    }
  }

  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1" size="2xl" lineHeight="1.2">
        {image.heading}
      </Heading>
      <Flex className="nav-container" justifyContent="space-between" mx="auto">
        <ImageLink
          leftIcon={<FaAngleDoubleLeft />}
          image={prev}
          label="Prev"
          keydown="ArrowLeft"
        />

        {/*
        // TODO: implement full screen
        <Button>Full Screen</Button>
        */}
        <Button as={Link} to={album.slug}>
          <Tooltip label={t('backToAlbum')}>
            <span>
              <BiPhotoAlbum />
            </span>
          </Tooltip>
          <Show above="md">&nbsp;{t('backToAlbum')}</Show>
        </Button>
        {album.pageUrl && (
          <Button as={Link} to={album.pageUrl}>
            <Tooltip label={album.pageLabel}>
              <span>
                <BiLink />
              </span>
            </Tooltip>
            <Show above="md">&nbsp;{album.pageLabel}</Show>
          </Button>
        )}
        <ImageLink
          rightIcon={<FaAngleDoubleRight />}
          image={next}
          label="Next"
          keydown="ArrowRight"
        />
      </Flex>
      <Flex className="image_container">
        <Box className="box_image">
          <motion.div
            key={image.file}
            initial="enter"
            animate="center"
            exit="leave"
            custom={direction}
            variants={variants}
            transition={{ type: 'tween', velocity: 2, stiffness: 100 }}
            drag="x"
            dragPropagation
            // dragElastic={1}
            dragSnapToOrigin
            whileDrag={{ scale: 0.9 }}
            onDragEnd={onDragEnd}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Image image={image} />
          </motion.div>
        </Box>
        <Box className="box_info">
          <Text>
            {index + 1}/{images.edges.length}
          </Text>
          <Heading as="h1" size="xl" className="box_title">
            {page.headline}
          </Heading>
          <Text>{page.abstract}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default ImageContent

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? -2000 : 2000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 5,
    x: 0,
    opacity: 1,
  },
  leave: (direction) => {
    console.log('exit', direction)
    return {
      x: direction > 0 ? 2000 : -2000,
      opacity: 0,
    }
  },
}

const getIndex = (images, slug) => {
  return findIndex(images, ({ node }) => node.slug === slug)
}

const getSiblings = (index, images) => {
  return {
    prev: index === 0 ? null : images[index - 1].node,
    next: index === images.length - 1 ? null : images[index + 1].node,
  }
}

const getDirection = (next) => {
  // this SMELLS, try a react way for it
  return isBrowser() && next && window.oldLocation === next.slug ? 0 : 1
}

const isBrowser = () => typeof window !== 'undefined'
