import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { ImgixGatsbyImage } from '@imgix/gatsby'
import {
  Box,
  Button,
  Image as ChakraImage,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'
import { Link } from './Link'
import { getImageData, getImageParams } from '../utils/images'

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

  const { slug } = image
  const imageData = getImageData(image)

  if (!imageData) return ImageLinkInactive(label, rest)

  useEffect(() => {
    const handleKey = (e) => {
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

// - `file` property can be a valid url, a folder/file slug or just a file slug
// - `folder` can be provided if not present in the url
// - `source` can be provided to override default value
// - `aspectRatio` or `width` and `height` should be provided
// - `alt` and `title` are also used or autogenerated based on file name
// - `caption` is showed in a Text box
// - `imgixParams` default sets auto=compress,format
const Image = ({ variant, image, caption, ...rest }) => {
  const styles = useStyleConfig('Image', { variant })
  if (!image) return null
  const imageParams = getImageParams({ image, caption, ...rest })

  return (
    <Box as="figure" w="100%">
      <ChakraImage
        __css={styles}
        as={ImgixGatsbyImage}
        src={imageParams.src}
        {...imageParams.params}
      />
      {caption && <Text as="figcaption">{caption}</Text>}
    </Box>
  )
}

Image.defaultProps = {
  layout: 'fullWidth',
}

export default Image

export { ImageLink }
