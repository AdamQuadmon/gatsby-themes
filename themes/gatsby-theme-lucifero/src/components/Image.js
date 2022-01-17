// Replace gatsby-plugin-image
import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { ImgixGatsbyImage } from '@imgix/gatsby'
import {
  Box,
  Button,
  Image as ChakraImage,
  useStyleConfig,
} from '@chakra-ui/react'
import { Link } from './Link'
import { getImageData, getImageParams, getImageSlug } from '../utils/images'

const ImageLinkInactive = (label, rest) => {
  const styles = useStyleConfig('Link', { variant: 'inactive' })
  return (
    <Button isDisabled {...rest}>
      <Box __css={styles}>{label}</Box>
    </Button>
  )
}

const ImageLink = ({ image, label, keydown, ...rest }) => {
  const styles = useStyleConfig('Link', { variant: 'imageLink' })
  if (!image) return ImageLinkInactive(label, rest)

  const slug = getImageSlug(image)
  const imageData = getImageData(image)

  if (!imageData) return ImageLinkInactive(label, rest)

  useEffect(() => {
    const handleKey = (e) => {
      console.log(e)
      if (e.ctrlKey || e.metaKey) return false
      e.code === keydown && navigate(slug)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [keydown, slug])

  return (
    <Button {...rest}>
      <Link __css={styles} to={slug}>
        {label}
      </Link>
      <link
        rel="preload"
        href={imageData.src}
        as="image"
        imagesrcset={imageData.srcSet}
      />
    </Button>
  )
}

const Image = ({ variant, ...rest }) => {
  const styles = useStyleConfig('Image', { variant })
  const imageParams = getImageParams(rest)

  return (
    <ChakraImage
      __css={styles}
      as={ImgixGatsbyImage}
      src={imageParams.src}
      {...imageParams.params}
    />
  )
}

Image.defaultProps = {
  layout: 'fullWidth',
}

export default Image

export { ImageLink }
