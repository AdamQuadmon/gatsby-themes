// Based on @wottpal suggestion
// https://github.com/microapps/gatsby-plugin-react-i18next/issues/49#issuecomment-780695704
/**
 * Determines equally named markdown-files with a different language,
 * and creates redirects from the theoretically translated url to the actual slug.
 */
const createMlRedirects = (createRedirect, nodes, node, options) => {
  const { slug, language, i18nPath } = node

  nodes
    .filter(
      ({ language: tLang, i18nPath: tPath }) =>
        language !== tLang && i18nPath === tPath
    )
    .forEach(({ language: tLang, slug: tSlug }) => {
      const fromPath = getTranslatedUrlPath(slug, language, tLang, options)
      const newRedirect = {
        fromPath,
        toPath: tSlug,
        isPermanent: true,
        force: true,
        redirectInBrowser: true,
      }

      console.log(`Redirect: ${fromPath} --> ${tSlug}`)
      createRedirect(newRedirect)
    })
}

/**
 * Creates and returns the theoretically translated url with the original slug.
 * If `omitDefaultLang` si true, the given `defaultLanguage`
 * will not be included in paths for this language.
 */
const getTranslatedUrlPath = (slug, sourceLang, destLang, options) => {
  const { defaultLanguage } = options
  const slugPathRegex = new RegExp(`(?:/${sourceLang})?(.*)`)
  const slugPath = slug.match(slugPathRegex)?.[1] || ``

  return destLang !== defaultLanguage
    ? `/${destLang}${slugPath}`
    : `${slugPath}`
}

module.exports = {
  createMlRedirects,
}
