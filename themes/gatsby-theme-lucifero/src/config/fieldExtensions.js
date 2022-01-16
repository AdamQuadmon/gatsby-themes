const { stringToBoolean } = require('./index')

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

module.exports = {
  defaultTrueConfig,
  defaultFalseConfig,
}
