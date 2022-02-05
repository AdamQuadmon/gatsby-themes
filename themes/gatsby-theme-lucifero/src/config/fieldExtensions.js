const { stringToBoolean } = require('./index')
const { toInteger } = require('lodash')

const defaultTrueConfig = {
  name: `defaultTrue`,
  extend() {
    return {
      resolve(source, args, context, info) {
        if (source[info.fieldName] === undefined) {
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
        if (!source[info.fieldName]) {
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
        return toInteger(value)
      },
    }
  },
}

module.exports = {
  defaultTrueConfig,
  defaultFalseConfig,
  defaultNumber,
}
