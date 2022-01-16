// Based on @wottpal suggestion
// https://github.com/microapps/gatsby-plugin-react-i18next/issues/49#issuecomment-780695704
const { merge } = require('lodash')
const { withDefaults, withThemePath } = require('../config/index.js')

const createMlPages = ({ nodes, template, context, userConfig, actions }) => {
  const { createPage, createRedirect } = actions
  const options = withDefaults(userConfig)
  const allNodes = prepareMlNodes(nodes, options)

  nodes.forEach(({ node }, index) => {
    createMlRedirects(createRedirect, allNodes, node, options.defaultLanguage)
    createPage(getPageOptions(nodes, index, template, context))
  })
}

const prepareMlNodes = (allNodes, options) => {
  const { defaultLanguage, languages } = options
  if (languages.length < 1) return []

  return allNodes.map(({ node: tNode }) => ({
    tNode,
    tLang: getLang(tNode, defaultLanguage),
    tPath: removeExtensions(tNode),
  }))
}

/**
 * Determines equally named markdown-files with a different language,
 * and creates redirects from the theoretically translated url to the actual slug.
 */
const createMlRedirects = (createRedirect, allNodes, node, defaultLanguage) => {
  const { slug } = node

  const lang = getLang(node, defaultLanguage)
  const path = removeExtensions(node)

  allNodes
    .filter(({ tLang, tPath }) => lang !== tLang && path === tPath)
    .forEach(({ tNode, tLang }) => {
      const translatedUrlPath = getTranslatedUrlPath(
        slug,
        lang,
        tLang,
        defaultLanguage,
        true
      )
      const newRedirect = {
        fromPath: translatedUrlPath,
        toPath: `/${tNode.slug}`,
        isPermanent: true,
        force: true,
        redirectInBrowser: true,
      }

      console.log(`Redirect: ${translatedUrlPath} --> /${tNode.slug}`)
      createRedirect(newRedirect)
    })
}

const getPageOptions = (nodes, index, template, context = (node) => ({})) => {
  const { node } = nodes[index]
  const slug = node.slug

  return {
    path: slug,
    component: withThemePath(template),
    context: merge(
      {
        id: node.id,
        slug,
        prev: index === 0 ? null : nodes[index - 1].node,
        next: index === nodes.length - 1 ? null : nodes[index + 1].node,
      },
      context(node)
    ),
  }
}

/**
 * Returns language code from file path of given node. As a fallback `defaultLanguage` is returned.
 */
const getLang = (node, defaultLanguage) => {
  const langRegex = /(?:[^/]*\.)(.*)(?:\.md)/
  const { fileAbsolutePath } = node
  if (!fileAbsolutePath) {
    console.log('getLang', node)
  } else {
    return fileAbsolutePath.match(langRegex)?.[1] || defaultLanguage
  }
}

const removeExtensions = (node) => {
  const { fileAbsolutePath } = node
  if (!fileAbsolutePath) {
    console.log('removeExtensions', node)
  } else {
    return fileAbsolutePath.split(`.`)?.[0]
  }
}

/**
 * Creates and returns the theoretically translated url with the original slug.
 * If `omitDefaultLang` si true, the given `defaultLanguage` will not be included in paths for this language.
 */
const getTranslatedUrlPath = (
  slug,
  sourceLang,
  destLang,
  defaultLanguage,
  omitDefaultLang
) => {
  const baseUrlPathRegex = new RegExp(`(?:${sourceLang}/)?(.*)`)
  const baseUrlPath = slug.match(baseUrlPathRegex)?.[1] || ``

  return omitDefaultLang && destLang === defaultLanguage
    ? `/${baseUrlPath}`
    : `/${destLang}/${baseUrlPath}`
}

module.exports = {
  createMlPages,
}
