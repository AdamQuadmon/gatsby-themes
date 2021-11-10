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
  const otherLanguages = languages.filter((lang) => lang !== defaultLanguage)

  return { languages, defaultLanguage }
}

const getPageOptions = (nodes, index, template, context = (node) => ({})) => {
  const { node } = nodes[index]
  return {
    path: node.fields.slug,
    component: withThemePath(template),
    context: merge(
      {
        id: node.id,
        prev: index === 0 ? null : nodes[index - 1].node,
        next: index === nodes.length - 1 ? null : nodes[index + 1].node,
      },
      context(node)
    ),
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
  getLanguages,
  getLanguageFromPath,
  getPageOptions,
  getSlug,
  getThemePaths,
  splitPath,
  slugify,
  withBasePath,
  withDefaults,
  withThemePath,
  mdxResolverPassthrough,
}
