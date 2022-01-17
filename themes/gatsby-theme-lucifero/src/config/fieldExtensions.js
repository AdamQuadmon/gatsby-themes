const { stringToBoolean } = require('./index')
const _ = require('lodash')

const defaultTrueConfig = {
  name: `defaultTrue`,
  extend() {
    return {
      resolve(source, args, context, info) {
        if (source[info.fieldName] == null) {
          return true
        }
        return stringToBoolean(source[info.fieldName])
      },
    }
  },
}

const defaultFalseConfig = {
  name: `defaultFalse`,
  extend() {
    return {
      resolve(source, args, context, info) {
        if (source[info.fieldName] == null) {
          return false
        }
        return stringToBoolean(source[info.fieldName])
      },
    }
  },
}

const defaultNumber = {
  name: `defaultNumber`,
  args: {
    n: {
      type: 'Int!',
      defaultValue: 0,
    },
  },
  extend() {
    return {
      resolve(source, args, context, info) {
        let value = source[info.fieldName]
        if (value === undefined) {
          value = args.n
        }
        return _.toInteger(value)
      },
    }
  },
}

module.exports = {
  defaultTrueConfig,
  defaultFalseConfig,
  defaultNumber,
}
