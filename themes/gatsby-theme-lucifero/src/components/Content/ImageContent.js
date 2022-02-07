import React from 'react'
import { navigate } from 'gatsby'
import { motion } from 'framer-motion'
import { Box, Button, Flex, Heading, useStyleConfig } from '@chakra-ui/react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import Image, { ImageLink } from '../Image'
import { Link, LinkTranslated } from '../Link'

const ImageContent = ({ pageData, variant, ...rest }) => {
  const {
    data: { page, album, images },
  } = pageData
  const styles = useStyleConfig('ImageContent', { variant })
  const { image } = page
  const { prev, next } = getSiblings(page, images)
  const direction = getDirection(next, window)

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
      <Heading as="h1" size="2xl">
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
          Back to Album
        </Button>
        {album.pageUrl && (
          <Button as={LinkTranslated} to={album.pageUrl}>
            {album.pageLabel}
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
    zIndex: 1,
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

const getSiblings = (page, images) => {
  const index = images.findIndex(({ node }) => node.slug === page.slug)
  return {
    prev: index === 0 ? null : images[index - 1].node,
    next: index === images.length - 1 ? null : images[index + 1].node,
  }
}

const getDirection = (next, window) => {
  // this SMELLS, try a react way for it
  return window && next && window.oldLocation === next.slug ? 0 : 1
}
