import moment from 'moment'

import { isString, words } from 'lodash'
import { addParam, getThingParams, getType } from './Thing'
import { getOrganizationId } from './PlacesAndOrganizations'

// https://schema.org/WebPage
const pageTypes = {
  home: 'WebPage',
  about: 'AboutPage',
  album: 'ImageGallery',
  article: 'Article',
  checkout: 'CheckoutPage',
  collection: 'CollectionPage', // -> MediaGallery -> ImageGallery
  contact: 'ContactPage',
  gallery: 'CollectionPage',
  // A listing that describes one or more real-estate Offers
  // (whose businessFunction is typically to lease out, or to sell).
  // The RealEstateListing type itself represents the overall listing,
  // as manifested in some WebPage
  // properties: datePosted, leaseLength
  listing: 'RealEstateListing',
  item: 'ItemPage', // a single item, such as a particular product or hotel.
  faq: 'FAQPage', // collection of Frequenly Questions and Answers.
  qa: 'QAPage', // A Question and Answers
  profile: 'ProfilePage',
  search: 'SearchResultsPage',
}

const defaultPageType = 'item'

// https://developers.google.com/search/docs/advanced/structured-data/article
export const getPageSchema = (siteUrl, organization, page) => {
  const { type } = page

  if (type === 'website') {
    return null
  }

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    ...getThingParams(siteUrl, page),
    ...getCreativeWorkParams(organization, page),
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

export const getImageUrl = (image, options) => {
  if (!image) return null
  if (image.contentUrl) image = image.contentUrl

  if (options) {
    if (options.resize) {
      // TODO: make 1x1, 4x3 and 16x9 formats
    }
    if (options.thumbnail) {
      // TODO: make thumb and use 'thumbnail' param
    }
  }

  return image
}
// https://developers.google.com/search/docs/advanced/structured-data/logo
// https://developers.google.com/search/docs/advanced/structured-data/image-license-metadata
export const getImageSchema = (image, options) => {
  if (!image) return null
  if (image['@type']) return image

  // for an ImageObject contentUrl refers to the image file
  const contentUrl = getImageUrl(image, options)
  if (!contentUrl) return null

  const caption = image.description || image.headline

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    contentUrl,
    url: contentUrl,
  }

  // for an ImageObject url refers to the image page
  // but for Google it only matter `contentUrl` and `url` is an alias
  // https://developers.google.com/search/docs/advanced/structured-data/image-license-metadata#structured-data-type-definitions
  // addParam(schema, 'url', image.page)
  addParam(schema, 'caption', caption)
  addImageSize(schema, image)
  addLicense(schema, image)

  return schema
}

const getCreativeWorkParams = (organization, page) => {
  if (!page) return null
  let {
    type,
    // order,
    language,
    name,
    headline,
    alternativeHeadline,
    description,
    tags,
    abstract,
    location,
    award,
    discussionUrl,
    dateCreated,
    dateModified,
    datePublished,
    author,
    image,
  } = page

  const orgId = getOrganizationId(organization)
  const person = getAuthor(author, orgId)
  const copyrightYear = moment(datePublished).format('YYYY')

  const schema = {
    '@context': 'http://schema.org',
    '@type': getType(type, pageTypes, defaultPageType),
    author: person,
    copyrightHolder: person,
    copyrightYear,
    creator: person,
    dateCreated,
    datePublished,
    name,
    description,
    headline,
    inLanguage: language,
    publisher: person,
    image: getImageSchema(image),
    thumbnailUrl: getImageUrl(image, { thumbnail: true }),
  }

  const optionalParams = {
    // a page about a Thing (subjectOf this CreativeWork or Event)
    // about: Place, Organization, Product, etc
    // TODO, generate analizing tags pointing to entities
    // about,
    abstract,
    alternativeHeadline,
    award,
    dateModified,
    contentLocation: location,
    discussionUrl,
    keywords: tags.length ? tags : null,
    // this is needed only in lists
    // position: order === 666 ? null : order,
  }

  Object.keys(optionalParams).forEach((param) =>
    addParam(schema, param, optionalParams[param])
  )

  if ('article' === type) {
    addArticleParams(schema, page)
  }

  return schema
}

const addArticleParams = (schema, page) => {
  const { topic, mdx } = page
  if (!mdx) return null
  const { timeToRead = 0, body } = mdx

  const params = {
    articleBody: body,
    articleSection: topic,
    speakable: getSpeakable(),
    wordcount: words(body),
    timeRequired: timeToRead,
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
