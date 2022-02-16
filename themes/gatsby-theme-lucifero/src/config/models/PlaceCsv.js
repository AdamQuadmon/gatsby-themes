const { toNumber } = require('lodash')
const { stringToBoolean } = require('../index')
const getPlaceCsv = () => {
  const PlaceCsv = {
    name: 'PlaceCsv',
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
      type: 'String',
      itineraries: {
        type: '[String!]',
        resolve: (source) => {
          itineraries =
            (source.itineraries && source.itineraries.split(',')) || []
          itineraries = itineraries.map((i) => i.trim())

          return itineraries
        },
      },
      slug: 'String',
      // type specific fields
      region: 'String',
      city: 'String',
      cap: 'String',
      address: 'String',
      cell: 'String',
      places: 'String',
      facebook: 'String',
      instagram: 'String',
      web: 'String',
    },
  }

  return PlaceCsv
}

module.exports = { getPlaceCsv }
