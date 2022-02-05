const { toNumber } = require('lodash')
const { stringToBoolean } = require('../index')
const getImageCsv = () => {
  const ImageCsv = {
    name: 'ImageCsv',
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
      description: 'String',
      name: 'String',
      tags: 'String',
      abstract: 'String',
      author: 'String',
      contentLocation: 'String',
      dateCreated: 'String',
      dateModified: 'String',
      datePublished: 'String',
      genre: 'String',
      headline: 'String',
      // type specific fields
      folder: 'String',
      file: 'String',
      imagePath: {
        type: 'String',
        resolve: (source) => `/${source.folder}/${source.file}`,
      },
      contentUrl: {
        type: 'String',
        resolve: (source) => {
          const account = source.account || imgixSource
          const path = `/${source.folder}/${source.file}`
          return path ? `https://${account}.imgix.net${path}` : ''
        },
      },
      width: 'String',
      height: 'String',
      account: 'String',
      domain: 'String',
      zone: 'String',
      subject: 'String',
      season: 'String',
      month: 'String',
      daytime: 'String',
    },
  }

  return ImageCsv
}

module.exports = { getImageCsv }
