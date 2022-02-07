const { withDefaults, withThemePath } = require('./index')

const templates = {
  page: 'Page',
  article: 'Post',
  area: 'Area',
  topic: 'Topic',
  album: 'Album',
  image: 'Image',
}

// Create Pages based on Page nodes.
// `template` is based on `type`
// `pageContext` contains following params:
//     id, slug, area, topic, i18nPath, next, prev
// `next` and `prev` are id specified to `type` and `language`
const createPagesTypes = ({ nodes, userConfig, actions }) => {
  const { createPage } = actions
  const options = withDefaults(userConfig)
  const { languageNodesByType } = getLanguageNodesByType(nodes, options)

  Object.keys(languageNodesByType).forEach((type) => {
    const languageNodes = languageNodesByType[type]
    const template = getTemplate(type)

    languageNodes.forEach((languageNode, index) => {
      Object.keys(languageNode).forEach((language) => {
        const node = languageNode[language]
        if (node) {
          createPage(getPageOptions(languageNodes, node, index, template))
        }
      })
    })
  })
}

const getLanguageNodesByType = (nodes, options) => {
  const languageNodesByType = {}
  const languageNodesByI18n = {}
  const { defaultLanguage } = options

  nodes.forEach(({ node }) => {
    const { type, language, i18nPath } = node
    if (!languageNodesByType[type]) {
      languageNodesByType[type] = []
    }
    if (!languageNodesByI18n[i18nPath]) languageNodesByI18n[i18nPath] = {}

    languageNodesByI18n[i18nPath][language] = node
  })

  Object.keys(languageNodesByI18n).forEach((i18nPath) => {
    const languageNodes = languageNodesByI18n[i18nPath]
    const { type } = languageNodes[defaultLanguage]
    languageNodesByType[type].push(languageNodes)
  })

  return { languageNodesByI18n, languageNodesByType }
}

const getTemplate = (type) => {
  const templateName = templates[type] || templates.page

  const template = `../templates/${templateName}.js`

  return withThemePath(template)
}

const getPageOptions = (languageNodes, node, index, template) => {
  const { id, slug, area, topic, i18nPath, language } = node
  const prev = getPrev(languageNodes, index, language)
  const next = getNext(languageNodes, index, language)

  return {
    path: slug,
    component: template,
    context: { id, slug, area, topic, i18nPath, prev, next },
  }
}

const getPrev = (languageNodes, index, language) => {
  if (index === 0) return null
  const languageNode = languageNodes[index - 1]

  return languageNode && languageNode[language] && languageNode[language].id
}

const getNext = (languageNodes, index, language) => {
  if (index === languageNodes.length - 1) return null
  const languageNode = languageNodes[index + 1]

  return languageNode && languageNode[language] && languageNode[language].id
}

module.exports = {
  createPagesTypes,
}
