import React from 'react'
import { motion } from 'framer-motion'
import { Box, Button, Flex, Heading, useStyleConfig } from '@chakra-ui/react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import Image, { ImageLink } from '../Image'
import { Link, LinkTranslated } from '../Link'
import { navigate } from 'gatsby'
import { getImageSlug, getAlbumSlug, makeTitle } from '../../utils/images'

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
const isBrowser = typeof window !== 'undefined'

const getDirection = (nextSlug) => {
  if (!isBrowser || !nextSlug) return 1
  return window.oldLocation === nextSlug ? 0 : 1
}

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? -2000 : 2000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
}

const ImageContent = ({ album, image, prev, next, variant, ...rest }) => {
  const styles = useStyleConfig('ImageContent', { variant })

  const nextSlug = getImageSlug(next)
  const prevSlug = getImageSlug(prev)
  const albumSlug = getAlbumSlug(image)
  const direction = getDirection(nextSlug)

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      prevSlug && navigate(prevSlug)
    } else if (swipe > swipeConfidenceThreshold) {
      nextSlug && navigate(nextSlug)
    }
  }
  // TODO: implement full screen
  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1" size="2xl">
        {makeTitle(image.file)}
      </Heading>
      <Flex className="nav-container" justifyContent="space-between" mx="auto">
        <ImageLink
          leftIcon={<FaAngleDoubleLeft />}
          image={prev}
          label="Prev"
          keydown="ArrowLeft"
        />
        {/* <Button>Full Screen</Button> */}
        <Button as={Link} to={albumSlug}>
          Back to Album
        </Button>
        {album.page && (
          <Button as={LinkTranslated} to={album.page}>
            {album.pageTitle}
          </Button>
        )}
        <ImageLink
          rightIcon={<FaAngleDoubleRight />}
          image={next}
          label="Next"
          keydown="ArrowRight"
        />
      </Flex>
      <motion.div
        key={image.file}
        initial="enter"
        animate="center"
        custom={direction}
        variants={variants}
        transition={{ type: 'spring', velocity: 2 }}
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
  )
}

export default ImageContent
