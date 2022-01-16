// Replace gatsby-plugin-image
import React from 'react'
import _ from 'lodash'
import { ImgixGatsbyImage } from '@imgix/gatsby'
import { Image as ChakraImage, useStyleConfig } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../hooks/use-siteMetadata'

const getSrc = (file, folder, source, imgix) => {
  if (!imgix) {
    return getImage(file)
  }

  source = source ? source : imgix.source

  if (!folder) {
    const fileParts = file.split('/')

    if (fileParts > 1) {
      folder = fileParts[0]
      file = fileParts[1]
    }
  }

  folder = folder ? `${folder}/` : ``

  let src = `https://${source || imgix.source}.imgix.net/${folder}${file}`
  return src
}

const makeTitle = (string) => {
  return _.upperFirst(
    string.split('.')[0].replaceAll('-', ' ').replaceAll('/', ' ')
  )
}

const Image = ({
  file,
  folder,
  height,
  layout,
  aspectRatio,
  alt,
  title,
  className,
  source,
  variant,
}) => {
  const {
    config: { imgix },
  } = useSiteMetadata()
  const styles = useStyleConfig('Image', { variant })
  const src = getSrc(file, folder, source, imgix)

  alt = alt || makeTitle(file)
  title = title || alt

  const params = {
    className,
    layout,
    aspectRatio,
    height,
    alt,
    title,
  }

  return imgix ? (
    <ChakraImage __css={styles} as={ImgixGatsbyImage} src={src} {...params} />
  ) : (
    <ChakraImage __css={styles} as={GatsbyImage} image={src} {...params} />
  )
}

Image.defaultProps = {
  layout: 'fullWidth',
  aspectRatio: 3 / 2,
}

export default Image
