const moment = require('moment')
const { toNumber, isString, startCase } = require('lodash')
const { stringToBoolean } = require('../index')

const getPage = (options) => {
  const {
    defaultLanguage,
    siteUrl,
    website,
    ui: { imgix },
  } = options
  const { ogImage, author } = website

  const Page = {
    name: 'Page',
    interfaces: ['Node'],
    extensions: {
      childOf: { types: ['MdxMeta', 'AlbumCsv', 'ImageCsv'] },
      infer: false,
    },
    fields: {
      // base fields
      id: 'ID!',
      published: {
        type: 'Boolean',
        resolve: (source) => stringToBoolean(source.published),
      },
      order: {
        type: 'Int',
        resolve: (source) => toNumber(source.order) || 666,
      },
      type: {
        type: 'String',
        resolve: (source) => source.type || 'page',
      },
      area: 'String',
      topic: 'String',
      language: {
        type: 'String',
        resolve: (source) => source.language || defaultLanguage,
      },
      i18nPath: 'String',
      slug: 'String!',
      // meta fields
      name: {
        type: 'String',
        resolve: (source) =>
          source.name ||
          source.headline ||
          startCase(source.slug.split('/').pop()),
      },
      headline: {
        type: 'String',
        resolve: (source) =>
          source.headline ||
          source.name ||
          startCase(source.slug.split('/').pop()),
      },
      alternativeHeadline: 'String',
      description: {
        type: 'String',
        resolve: (source) =>
          source.description || source.headline || source.name,
      },
      tags: {
        type: '[String!]',
        resolve: (source) => {
          tags = (source.tags && source.tags.split(',')) || []
          tags = tags.map((tag) => tag.trim())

          return tags
        },
      },
      abstract: {
        type: 'String',
        resolve: (source) => source.abstract || source.description,
      },
      location: {
        type: 'PlaceCsv',
        resolve: async (source, args, context) => {
          const { location } = source

          return await context.nodeModel.findOne({
            query: {
              filter: { slug: { eq: location } },
            },
            type: 'PlaceCsv',
          })
        },
      },
      award: 'String',
      discussionUrl: 'String',
      dateCreated: {
        type: 'Date',
        extensions: { dateformat: {} },
      },
      dateModified: {
        type: 'Date',
        extensions: { dateformat: {} },
      },
      // WARNING!
      // you should avoid publish posts without publishingDate
      // this value should not change in time
      datePublished: {
        type: 'Date',
        extensions: { dateformat: {} },
      },
      author: {
        type: 'String',
        resolve: (source) => source.author || author,
      },
      navPage: {
        type: 'Boolean',
        resolve: (source) => stringToBoolean(source.navPage),
      },
      noCover: {
        type: 'Boolean',
        resolve: (source) => stringToBoolean(source.noCover),
      },
      // generated fields
      mdx: {
        type: 'Mdx',
        resolve: async (source, args, context) => {
          if (!['album', 'image'].includes(source.type)) {
            const { i18nPath, language } = source
            let slug =
              i18nPath.charAt(0) === '/' ? i18nPath.substring(1) : i18nPath

            if (language !== defaultLanguage) slug = `${slug}.${language}`

            return await context.nodeModel.findOne({
              query: {
                filter: { slug: { eq: slug } },
              },
              type: 'Mdx',
            })
          }
        },
      },
      url: {
        type: 'String',
        resolve: (source) => getUrl(source, siteUrl),
      },
      // TODO: add ogImage too to chose a different cover/ogImage
      image: {
        type: 'ImageCsv',
        resolve: async (source, args, context) => {
          switch (source.type) {
            case 'image':
              return source
            case 'album':
              return await context.nodeModel.findOne({
                query: {
                  filter: {
                    topic: { eq: source.topic },
                    order: { eq: 1 },
                  },
                },
                type: 'ImageCsv',
              })
            default:
              const imagePath = getImagePath(source, ogImage)
              return await context.nodeModel.findOne({
                query: {
                  filter: { imagePath: { eq: imagePath } },
                },
                type: 'ImageCsv',
              })
          }
        },
      },
      imagePath: {
        type: 'String',
        resolve: (source) => getImagePath(source, ogImage),
      },
      contentUrl: {
        type: 'String',
        resolve: (source) => {
          const account = (source.image && source.account) || imgix
          const path = getImagePath(source, ogImage)

          return path ? `https://${account}.imgix.net${path}` : ''
        },
      },
      timestamp: {
        type: 'Int',
        resolve: (source) => {
          const { published, datePublished } = source
          return (published && moment(datePublished).format('X')) || 0
        },
      },
    },
  }

  return Page
}

module.exports = { getPage }

const getUrl = (source, siteUrl) => {
  return source.slug ? `${siteUrl}${source.slug}` : siteUrl
}

const getImagePath = (source, ogImage) => {
  let image = source.image || source || ogImage

  if (isValidHttpUrl(image)) {
    image = new URL(image).pathname
  }

  if (isString(image)) {
    image = {
      file: image,
    }
  }

  if (image) {
    let { folder, file } = image

    if (file && !folder) {
      const fileParts = file.split('/')

      if (fileParts > 1) {
        folder = fileParts[0]
        file = fileParts[1]
      }
    }
    const path = folder && file ? `/${folder}/${file}` : file
    return path
  }

  return image
}

// TODO unify with the other in utils/images
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
