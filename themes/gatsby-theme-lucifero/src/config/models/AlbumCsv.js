const { toNumber } = require('lodash')
const { stringToBoolean } = require('../index')
const getAlbumCsv = () => {
  const AlbumCsv = {
    name: 'AlbumCsv',
    interfaces: ['Node'],
    extensions: {
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
      area: 'String',
      topic: 'String',
      language: 'String',
      i18nPath: 'String',
      slug: 'String',
      // meta fields
      name: 'String',
      headline: 'String',
      alternativeHeadline: 'String',
      description: 'String',
      tags: 'String',
      abstract: 'String',
      location: 'String',
      award: 'String',
      discussionUrl: 'String',
      dateCreated: 'String',
      dateModified: 'String',
      datePublished: 'String',
      author: 'String',
      // type specific fields
      pageUrl: 'String',
      pageLabel: 'String',
      image: {
        type: 'ImageCsv',
        resolve: async (source, args, context) => {
          return await context.nodeModel.findOne({
            query: {
              filter: {
                topic: { eq: source.topic },
                language: { eq: source.language },
                order: { eq: 1 },
              },
            },
            type: 'ImageCsv',
          })
        },
      },
      imagesLength: {
        type: 'Int',
        resolve: async (source, args, context) => {
          const result = await context.nodeModel.findAll({
            query: {
              filter: {
                topic: { eq: source.topic },
                language: { eq: source.language },
              },
            },
            type: 'ImageCsv',
          })
          const { totalCount } = await result
          return totalCount()
        },
      },
    },
  }

  return AlbumCsv
}

module.exports = { getAlbumCsv }
