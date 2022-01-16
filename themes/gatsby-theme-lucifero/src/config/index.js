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

const getLanguages = (config) => {
  const languages = config.languages
  const defaultLanguage = config.defaultLanguage

  return { languages, defaultLanguage }
}

const getPagePathInfo = (node, path, options) => {
  let pathParts = splitPath(path)
  let slug, type, area, topic
  const base = pathParts[0]

  if (base === 'areas') {
    pathParts.shift()
    if (!pathParts.length) {
      slug = ''
      type = 'blog'
    } else {
      // the rest of pathParts create the real post slug
      slug = withBasePath(options, pathParts.join('/'))
      area = pathParts.shift()

      if (!pathParts.length) {
        type = 'area'
      } else {
        topic = pathParts.shift()

        if (!pathParts.length) {
          type = 'topic'
        } else {
          type = 'post'
        }
      }
    }
  } else {
    slug = withBasePath(options, getSlug(node, path))

    if (['ui'].includes(base)) {
      // TODO fix this or remove
      // it was used to add content for UI
    } else {
      if (node.frontmatter.slug) {
        type = 'page'
      }
    }
  }

  return {
    base,
    fields: {
      slug,
      type,
      area,
      topic,
    },
  }
}

const splitPath = (path) => {
  // remove slashes
  if (path.charAt(0) == '/') path = path.substr(1)
  if (path.charAt(path.length - 1) == '/')
    path = path.substr(0, path.length - 1)

  return path.split('/')
}
const getLanguageFromPath = (path, options) => {
  const { languages, defaultLanguage } = options
  const pathLang = path.split('.').pop().replace('/', '')
  const lang = (languages.includes(pathLang) && pathLang) || defaultLanguage

  return lang
}

const getThemePaths = (userConfig) => {
  const options = withDefaults(userConfig)
  return [
    options.dataPath,
    // options.imagesPath,
    options.pagesPath,
    options.localesPath,
  ]
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

const createProxyNode = (gatsbyNodeHelpers, fieldData, type, index) => {
  const { node, actions, createNodeId, createContentDigest } = gatsbyNodeHelpers
  const { createNode, createParentChildLink } = actions
  const contentDigest =
    type !== 'Tag'
      ? node.internal.contentDigest
      : createContentDigest(fieldData)
  const id = type !== 'Tag' ? node.id : `${node.id}${index}`

  const proxyNode = {
    ...fieldData,
    id: createNodeId(`${id} >>> ${type}`),
    parent: node.id,
    children: [],
    internal: {
      type,
      contentDigest,
      content: JSON.stringify(fieldData),
      description: `${type} node`,
    },
  }
  createNode(proxyNode)
  createParentChildLink({ parent: node, child: proxyNode })
}

const getSlug = (node, filePath) => {
  if (node.frontmatter.slug) {
    return node.frontmatter.slug
  }

  return filePath
}

const slugify = (str) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/(^-|-\$)+/g, ``)
  return slug
}

// Create custom directive that defaults a field to true if not specified
const stringToBoolean = (string) => {
  switch (string.toLowerCase().trim()) {
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
      return Boolean(string)
  }
}

// https://github.com/NickyMeuleman/gatsby-theme-nicky-blog/blob/master/theme/src/utils.js
// https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-emilia-core/gatsby-node.js
// helper that grabs the mdx resolver when given a string fieldname
const mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`)
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    })
    const resolver = type.getFields()[fieldName].resolve
    const result = await resolver(mdxNode, args, context, {
      fieldName,
    })
    return result
  }

module.exports = {
  createThemePaths,
  createProxyNode,
  getLanguages,
  getLanguageFromPath,
  getPagePathInfo,
  getSlug,
  splitPath,
  slugify,
  stringToBoolean,
  withBasePath,
  withDefaults,
  withThemePath,
  mdxResolverPassthrough,
}
