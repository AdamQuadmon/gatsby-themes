// Create custom directive that defaults a field to true if not specified
const defaultTrueConfig = {
  name: `defaultTrue`,
  extend() {
    return {
      resolve(source, args, context, info) {
        if (source[info.fieldName] == null) {
          return true
        }
        return source[info.fieldName]
      },
    }
  },
}

module.exports = {
  defaultTrueConfig,
}
