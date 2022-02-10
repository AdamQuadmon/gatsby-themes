import { getGatsbyImageData } from '@imgix/gatsby'
import { useUi } from '../hooks/use-ui'
import { pickFirst, addParams } from './utils'

// TODO unify with getImageParams
// <ImageLink /> component cal this to get next/prev image preloading
export const getImageData = (image) => {
  if (!image || !image.contentUrl) return null

  const { contentUrl, width, height } = image
  const imageData = getGatsbyImageData({
    src: contentUrl,
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

// <Image /> component call this function to get image info.
//
// Component params:
// - image
// - file, folder, source
// - width, height, aspectRatio
// - alt, caption, addCaption
// - imgixParams
//
// `image` params:
// - contentUrl
// - description
// - name
// - width
// - height
//
// Returns `params` and `src`

// `src` can be `file` or `image.contentUrl` if is valid URL
// otherwise returns https://${source}.imgix.net${path}
// where:
//   - `path` is made from `file` and `folder`
//   - `source` from siteMetadata if missing
//
// `params` contains:
//
// - `className`
//
// - `layout`
//
// - `imgixParams` defaults to auto=compress,format
//
// - `alt` and `caption` if `addCaption` is true
//   if `caption` is not defined and `image` is defined
//   it get caption value from image `description`, `name` or `headline`
//
// - `width` and `height` if defined
//
// - `aspectRatio` will default to `16/9` if not present
//    and only one of `width` and `height` is defined
//
// - `sourceWidth` and `sourceHeight` from image `width` and `heigth`
//    if both `width` and `height` are missing and `image` is defined
export const getImageParams = (props) => {
  const { className, layout } = props
  const imageData = getBaseParams(props)
  const sizeParams = getSizeParams(props)
  const imgixParams = getImgixParams(props)
  const src = getSrc(props)

  const params = {
    className,
    layout,
    ...imgixParams,
    ...imageData,
    ...sizeParams,
  }

  return {
    params,
    src,
  }
}

const getBaseParams = (props) => {
  const { image, addCaption } = props
  const imageParams = ['description', 'name', 'headline']
  let imageAlt = pickFirst(image, imageParams)
  let alt = props.alt || imageAlt
  let caption = props.caption || (addCaption && (imageAlt || props.alt))
  let data = {
    alt,
  }
  if (caption) data.caption = caption

  return data
}

// TODO: add max width/height or sizes for reducing file size
const getSizeParams = (props) => {
  let { image } = props
  let params = getSizePropsParams(props)
  if (!params.aspectRatio) {
    if (image.width && !params.width && !params.height) {
      addParams(image, params, [
        { s: 'width', d: 'sourceWidth' },
        { s: 'height', d: 'sourceHeight' },
      ])
    } else {
      params.aspectRatio = 16 / 9
    }
  }

  return params
}

// return only `width` and `height` if defined
// `aspectRatio` is returned if one or both are missing
const getSizePropsParams = (props) => {
  let { width, height } = props
  let params = {}

  if (width && height) {
    params = { width, height }
  } else {
    addParams(props, params, ['aspectRatio', 'width', 'height'])
  }
  return params
}

const getImgixParams = (props) => {
  let imgixParams = props.imgixParams || {}
  if (!imgixParams.auto) {
    imgixParams.auto = ['compress', 'format']
  }

  return { imgixParams }
}
// returns `file` or `image.contentUrl` if is valid URL
//
// otherwise returns https://${source}.imgix.net${path}
//
// - `path` is made from `file` and `folder`
// - `source` from siteMetadata if missing
export const getSrc = (props) => {
  let { source, file, folder, image } = props

  if (file && isValidHttpUrl(file)) return file
  if (image && isValidHttpUrl(image.contentUrl)) return image.contentUrl

  if (!source) {
    const { imgix } = useUi()
    source = imgix
  }

  if (!file) {
    return null
  }

  if (!folder) {
    const fileParts = file.split('/')

    if (fileParts > 1) {
      folder = fileParts[0]
      file = fileParts[1]
    }
  }

  const path = folder ? `/${folder}/${file}` : file

  let src = `https://${source}.imgix.net${path}`
  return src
}

// TODO unify with the other in models/Page
const isValidHttpUrl = (string) => {
  let url
  if (!string) return false
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
