// Based on @wottpal suggestion
// https://github.com/microapps/gatsby-plugin-react-i18next/issues/49#issuecomment-780695704
const { merge } = require('lodash')

const { withDefaults, getPageOptions } = require('../config/index.js')

/**
 * Returns language code from file path of given node. As a fallback `defaultLanguage` is returned.
 */
const getNodeLangCode = ({ fileAbsolutePath }, defaultLanguage = `en`) => {
  // TODO: check if this works also with mdx
  const langCodeRegex = /(?:[^/]*\.)(.*)(?:\.md)/
  return (fileAbsolutePath || ``).match(langCodeRegex)?.[1] || defaultLanguage
}

/**
 * Returns relative file path of given node under given `basePath`
 * (optionally omitting file-extension)
 */
const getNodeRelativePath = ({ fileAbsolutePath }, omitFileExt, basePath) => {
  const absolutePath = fileAbsolutePath || ``
  const relativePath = basePath
    ? absolutePath.split(basePath)?.[1]
    : absolutePath
  if (!relativePath || !omitFileExt) return relativePath

  return relativePath.split(`.`)?.[0]
}

const createMlPages = ({ nodes, template, context, userConfig, actions }) => {
  const options = withDefaults(userConfig)
  const allNodes = prepareMlNodes(nodes, options)
  const { createPage, createRedirect } = actions

  nodes.forEach(({ node }, index) => {
    if (!node.fields.slug) {
      // TODO: improve notifications
      console.log('node has no slug field: ', node.fileAbsolutePath)
      return
    }
    createMlRedirects(createRedirect, allNodes, node, options)

    createPage(getPageOptions(nodes, index, template, context))
  })
}

const prepareMlNodes = (allNodes, options) => {
  const { basePath, defaultLanguage, languages } = options
  if (languages.length < 1) return []

  return allNodes.map(({ node: translatedNode }) => ({
    translatedNode,
    translatedNodeLangCode: getNodeLangCode(translatedNode, defaultLanguage),
    translatedNodeRelativePath: getNodeRelativePath(
      translatedNode,
      true,
      basePath
    ),
  }))
}

/**
 * Determines equally named markdown-files with a different language,
 * and creates redirects from the theoretically translated url to the actual slug.
 */
const createMlRedirects = (createRedirect, allNodes, node, options) => {
  const { basePath, defaultLanguage, languages } = options
  if (languages.length < 1) return

  const { slug } = node.fields
  const langCode = getNodeLangCode(node, defaultLanguage)
  const relativePath = getNodeRelativePath(node, true, basePath)

  allNodes
    .filter(
      ({ translatedNodeLangCode, translatedNodeRelativePath }) =>
        langCode !== translatedNodeLangCode &&
        relativePath === translatedNodeRelativePath
    )
    .forEach(({ translatedNode, translatedNodeLangCode }) => {
      const translatedUrlPath = getTranslatedUrlPath(
        slug,
        langCode,
        translatedNodeLangCode,
        true,
        defaultLanguage
      )
      const newRedirect = {
        fromPath: translatedUrlPath,
        toPath: `/${translatedNode.fields.slug}`,
        isPermanent: true,
        force: true,
        redirectInBrowser: true,
      }

      console.log(`Adding Redirect: `, newRedirect)
      createRedirect(newRedirect)
    })
}

/**
 * Creates and returns the theoretically translated url with the original slug.
 * If `omitDefaultLang` si true, the given `defaultLanguage` will not be included in paths for this language.
 */
const getTranslatedUrlPath = (
  slug,
  sourceLang,
  destLang,
  omitDefaultLang,
  defaultLanguage
) => {
  const baseUrlPathRegex = new RegExp(`(?:${sourceLang}/)?(.*)`)
  const baseUrlPath = slug.match(baseUrlPathRegex)?.[1] || ``

  return omitDefaultLang && destLang === defaultLanguage
    ? `${baseUrlPath}`
    : `/${destLang}/${baseUrlPath}`
}

module.exports = {
  createMlPages,
}
