const { merge } = require('lodash')

const baseConfig = require('./defaultConfig')

const withDefaults = (userConfig) => merge(baseConfig, userConfig)

const withBasePath = (userConfig, url) =>
  userConfig.basePath ? urlJoin(userConfig.basePath, url) : url

const getLanguages = (userConfig) => {
  const languages = userConfig.languages
  const defaultLanguage = userConfig.defaultLanguage
  const otherLanguages = languages.filter((lang) => lang !== defaultLanguage)
  const localizeData = otherLanguages.map((lang) => {
    const data = userConfig.localizeData.find(locale.lang === lang)
    return {
      start_url: `/${lang}/`,
      lang,
      name: (data && data.name) || userConfig.website.title,
      short_name:
        (data && (data.shortName || data.name)) ||
        userConfig.website.shortTitle,
      description: (data && data.description) || userConfig.website.description,
    }
  })

  return { languages, localizeData }
}

module.exports = {
  withDefaults,
  withBasePath,
  getLanguages,
}
