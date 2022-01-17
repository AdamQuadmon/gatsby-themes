import _ from 'lodash'
import { getGatsbyImageData } from '@imgix/gatsby'
import { useSiteMetadata } from '../hooks/use-siteMetadata'

export const getImageData = (node) => {
  if (!node) {
    return null
  }
  const { file, folder, width, height } = node

  const imageData = getGatsbyImageData({
    src: getSrc(file, folder),
    imgixParams: { crop: 'faces' },
    layout: 'constrained',
    sourceWidth: width,
    sourceHeight: height,
  })

  if (!imageData) {
    return null
  }

  const { src, srcSet } = imageData.images.fallback

  return {
    src,
    srcSet,
  }
}

export const getImageParams = (props) => {
  const { className, layout, image, aspectRatio, ...rest } = props

  let { folder, file, source, alt, title, width, height, imgixParams } = props
  imgixParams = imgixParams || {}
  if (!imgixParams.auto) {
    imgixParams.auto = ['compress', 'format']
  }

  if (image) {
    folder = folder || image.folder
    file = file || image.file
    source = source || image.source
    alt = alt || image.alt
    title = title || image.title
  }

  alt = alt || makeTitle(file)
  title = title || alt

  const src = getSrc(file, folder, source)

  let sizeParams = {}
  if (aspectRatio) {
    sizeParams.aspectRatio = aspectRatio
    if (width) {
      sizeParams.width = width
    }
    if (height) {
      sizeParams.height = height
    }
  } else {
    if (image) {
      sizeParams = {
        sourceWidth: image.width,
        sourceHeight: image.height,
      }
    } else {
      sizeParams.aspectRatio = 4 / 3
    }
  }

  const params = {
    className,
    layout,
    alt,
    title,
    imgixParams,
    ...sizeParams,
    ...rest,
  }

  return {
    params,
    src,
  }
}

const cleanFileName = (file) => {
  return file.replace('LePietrebnb-', '').split('.')[0]
}

export const getAlbumSlug = (node) => {
  if (!node) return null
  return `/gallery/${node.album}`
}
export const getImageSlug = (node) => {
  if (!node) return null
  const fileName = cleanFileName(node.file)
  return `/gallery/${node.album}/${fileName}`
}

export const makeTitle = (string) => {
  return _.upperFirst(
    cleanFileName(string).replaceAll('-', ' ').replaceAll('/', ' ')
  )
}

export const getSrc = (file, folder, source) => {
  const {
    config: { imgix },
  } = useSiteMetadata()
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

export const getImagesByAlbum = (edges) => {
  let albums = {}
  edges.forEach(({ node }) => {
    const { album } = node
    if (!albums[album]) albums[album] = []
    albums[album].push(node)
  })

  return albums
}

export const getAlbumsByName = (edges) => {
  let albums = {}
  edges.forEach(({ node }) => {
    const { album } = node
    albums[album] = node
  })

  return albums
}

export const getAlbumsKeys = (imagesByAlbum, albumsByName) => {
  const albumKeys = Object.keys(imagesByAlbum)
  return albumKeys.sort((a, b) => albumsByName[a].order - albumsByName[b].order)
}
