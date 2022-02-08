const fs = require('fs')
const path = require('path')
const { merge } = require('lodash')
const urlJoin = require('url-join')

const baseConfig = require('./defaultConfig')

const withDefaults = (config) => merge(baseConfig, config)

const withBasePath = (config, url) =>
  config.basePath ? urlJoin(config.basePath, url) : url

const withThemePath = (relativePath) => {
  let pathResolvedPath = path.resolve(relativePath)
  let finalPath = pathResolvedPath
  try {
    // check if the user's site has the file
    require.resolve(pathResolvedPath)
  } catch (e) {
    // if the user hasn't implemented the file,
    finalPath = require.resolve(relativePath)
  }
  return finalPath
}

const splitPath = (path) => {
  // remove slashes
  if (path.charAt(0) == '/') path = path.substr(1)
  if (path.charAt(path.length - 1) == '/')
    path = path.substr(0, path.length - 1)

  return path.split('/')
}

const getThemePaths = (userConfig) => {
  const options = withDefaults(userConfig)
  return [options.dataPath, options.pagesPath, options.localesPath]
}

const createThemePaths = (reporter, userConfig) => {
  const themePaths = getThemePaths(userConfig)

  themePaths.forEach((themePath) => {
    if (!fs.existsSync(themePath)) {
      reporter.info(`creating the ${themePath} directory`)
      fs.mkdirSync(themePath)
    }
  })
}

// TODO merge with getImageSlug() from utils component
// this version does not prepent slug with /
const getImageSlug = (node, replaceText) => {
  if (!node) return null
  const fileName = node.file.replace(replaceText, '').split('.')[0]
  return `gallery/${node.album}/${fileName}`
}

// TODO: Move to a custom directive
const stringToBoolean = (string) => {
  const value =
    (typeof string === 'string' && string.toLowerCase().trim()) || string
  switch (value) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
    case null:
      return false

    default:
      return Boolean(value)
  }
}

module.exports = {
  createThemePaths,
  getImageSlug,
  splitPath,
  stringToBoolean,
  withBasePath,
  withDefaults,
  withThemePath,
}
