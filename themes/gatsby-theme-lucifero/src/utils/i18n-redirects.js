/**
 * Returns relative file path of given node under given `basePath`
 * (optionally omitting file-extension)
 */
function getNodeRelativePath({ fileAbsolutePath }, omitFileExt, basePath) {
  const relativePath = (fileAbsolutePath || ``).split(basePath)?.[1]
  if (!relativePath || !omitFileExt) return relativePath

  return relativePath.split(`.`)?.[0]
}

/**
 * Returns language code from file path of given node. As a fallback `defaultLang` is returned.
 */
function getNodeLangCode({ fileAbsolutePath }, defaultLang = `en`) {
  const langCodeRegex = /(?:[^/]*\.)(.*)(?:\.md)/
  return (fileAbsolutePath || ``).match(langCodeRegex)?.[1] || defaultLang
}

/**
 * Creates and returns the theoretically translated url with the original slug.
 * If `omitDefaultLang` si true, the given `defaultLang` will not be included in paths for this language.
 */
function getTranslatedUrlPath(
  slug,
  sourceLang,
  destLang,
  omitDefaultLang,
  defaultLang = `en`
) {
  const baseUrlPathRegex = new RegExp(`(?:/${sourceLang})?(/.*)`)
  const baseUrlPath = slug.match(baseUrlPathRegex)?.[1] || `/`

  return omitDefaultLang && destLang === defaultLang
    ? `${baseUrlPath}`
    : `/${destLang}${baseUrlPath}`
}

/**
 * Determines equally named markdown-files with a different language,
 * and creates redirects from the theoretically translated url to the actual slug.
 */
module.exports = function createMultilingualRedirects(
  { createRedirect },
  allNodes,
  node,
  defaultLang,
  basePath
) {
  const { slug } = node.frontmatter
  const langCode = getNodeLangCode(node, defaultLang)
  const relativePath = getNodeRelativePath(node, true, basePath)

  allNodes
    .map(({ node: translatedNode }) => ({
      translatedNode,
      translatedNodeLangCode: getNodeLangCode(translatedNode, defaultLang),
      translatedNodeRelativePath: getNodeRelativePath(
        translatedNode,
        true,
        basePath
      ),
    }))
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
        defaultLang
      )
      const newRedirect = {
        fromPath: translatedUrlPath,
        toPath: translatedNode.frontmatter.slug,
        isPermanent: true,
        force: true,
        redirectInBrowser: true,
      }

      // console.log(`Adding Redirect: `, newRedirect)
      createRedirect(newRedirect)
    })
}
