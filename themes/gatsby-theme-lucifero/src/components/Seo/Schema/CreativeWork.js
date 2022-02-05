import moment from 'moment'

import { isString, words } from 'lodash'
import { getKeywords } from '../Seo'
import { addParam, getThingParams, getType } from './Thing'
import { getOrganizationId } from './PlacesAndOrganizations'

const types = {
  article: 'Article',
  work: 'CreativeWork',
}

const defaultType = 'work'

// https://developers.google.com/search/docs/advanced/structured-data/article
export const getPageSchema = (site, page) => {
  const { type } = page

  if (type === 'website') {
    return null
  }

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    ...getThingParams(site, page),
    ...getCreativeWorkParams(site, page),
  }

  // TODO: add images
  if (type === 'gallery') {
    schema.associatedMedia = []
  }

  return schema
}

export const getWebPageSchema = (entity) => {
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    '@id': entity,
  }

  return schema
}

// https://developers.google.com/search/docs/advanced/structured-data/logo
// https://developers.google.com/search/docs/advanced/structured-data/image-license-metadata
export const getImageSchema = (image, options) => {
  if (!image) return null
  if (image['@type']) return image

  if (options) {
    if (options.resize) {
      // TODO: make 1x1, 4x3 and 16x9 formats
    }
    if (options.thumbnail) {
      // TODO: make thumb and use 'thumbnail' param
    }
  }

  // for an ImageObject contentUrl refers to the image file
  const contentUrl = (isString(image) && image) || image.contentUrl
  if (!contentUrl) return null

  const caption = image.description || image.headline

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    contentUrl,
    caption,
  }
  // for an ImageObject url refers to the image page
  addParam(schema, 'url', image.page)
  addImageSize(schema, image)
  addLicense(schema, image)

  return schema
}

const getCreativeWorkParams = (site, page) => {
  if (!page) return null
  let {
    type,
    order,
    topic,
    image,
    abstract,
    author,
    description,
    dateCreated,
    dateModified,
    datePublished,
    contentLocation,
    genre,
    headline,
    tags,
    language,
    mdx,
    // alternativeHeadline,
    // award,
    // discussionUrl,
  } = page
  const body = mdx ? mdx.body : description || name
  const timeToRead = mdx ? mdx.timeToRead : 0
  abstract = abstract || mdx ? mdx.excerpt : description || name

  const { organization, keywords } = site

  const orgId = getOrganizationId(organization)

  const person = getAuthor(author, orgId)
  const copyrightYear = moment(datePublished).format('YYYY')

  const schema = {
    '@context': 'http://schema.org',
    '@type': getType(type, types, defaultType),
    author: person,
    abstract,
    creator: person,
    copyrightHolder: person,
    copyrightYear,
    dateCreated,
    dateModified,
    datePublished,
    headline,
    inLanguage: language,
    keywords: getKeywords(tags, body, keywords),
    publisher: person,
    thumbnailUrl: getImageSchema(image, { thumbnail: true }),
    timeRequired: timeToRead,
  }

  const optionalParams = {
    contentLocation,
    genre,
    about: tags,
    position: order,
  }

  Object.keys(optionalParams).forEach((param) =>
    addParam(schema, param, optionalParams[param])
  )

  if (body) {
    addArticleParams(schema, body, topic)
  }

  return schema
}

const addArticleParams = (schema, body, topic) => {
  const params = {
    articleBody: body,
    articleSection: topic,
    speakable: getSpeakable(),
    wordcount: words(body),
    // for a TechArticle (HowTo)
    // dependencies,
    // proficiencyLevel,
  }

  Object.keys(params).forEach((param) => addParam(schema, param, params[param]))
}

const getAuthor = (author, defaultId) => {
  if (author.name) {
    return {
      '@context': 'https://schema.org',
      '@type': author.type || 'Person',
      name: author.name,
    }
  } else {
    return { '@id': author || defaultId }
  }
}

const addImageSize = (schema, image) => {
  let { width, height } = image
  if (!width || !height) {
    const searchParams = new URLSearchParams(image.url || image)
    width = searchParams.get('w')
    height = searchParams.get('h')
  }

  // TODO: notify image with no sizes
  if (width && height) {
    schema.width = width
    schema.height = height
  }
}

const addLicense = (schema, image) => {
  if (image.license) {
    schema.license = image.license
    // TODO: get from siteMetadata
    schema.acquireLicensePage = ''
    schema.copyrightHolder = ''
  }
}

const getSpeakable = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    // TODO: get from siteMetadata
    cssSelector: ['.speakable-wrapper'],
  }
}

const isArticle = (type) => {
  return ['article'].includes(type)
}
