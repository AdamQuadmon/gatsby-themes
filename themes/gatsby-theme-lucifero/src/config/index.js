const { merge } = require('lodash')

const baseConfig = require('./defaultConfig')

const withDefaults = (config) => merge(baseConfig, config)

const withBasePath = (config, url) =>
  config.basePath ? urlJoin(config.basePath, url) : url

const getLanguages = (config) => {
  const languages = config.languages
  const defaultLanguage = config.defaultLanguage
  const otherLanguages = languages.filter((lang) => lang !== defaultLanguage)
  const localizeData = otherLanguages.map((lang) => {
    const data = config.localizeData.find((locale) => locale.lang === lang)
    return {
      start_url: `/${lang}/`,
      lang,
      name: (data && data.name) || config.website.title,
      short_name:
        (data && (data.shortName || data.name)) || config.website.shortTitle,
      description: (data && data.description) || config.website.description,
    }
  })

  return { languages, defaultLanguage, localizeData }
}

module.exports = {
  withDefaults,
  withBasePath,
  getLanguages,
}
