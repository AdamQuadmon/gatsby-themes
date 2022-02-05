// Based on @wottpal suggestion
// https://github.com/microapps/gatsby-plugin-react-i18next/issues/49#issuecomment-780695704
const { withDefaults, withThemePath } = require('./index')

const { createMlRedirects } = require('./i18n-redirects')

const templates = {
  page: 'Page',
  article: 'Post',
  area: 'Area',
  topic: 'Topic',
  album: 'Album',
  image: 'Image',
}

const createPagesTypes = ({ nodes, userConfig, actions }) => {
  const { createPage, createRedirect } = actions
  const options = withDefaults(userConfig)
  const pagesTypes = getPagesTypes(nodes)
  const types = Object.keys(pagesTypes)

  types.forEach((type) => {
    const typeNodes = pagesTypes[type]

    typeNodes.forEach((node, index) => {
      const template = getTemplate(type)
      if (!template) {
        console.log('createPagesTypes: node has no template', node.slug, type)
      } else {
        createPage(getPageOptions(typeNodes, index, template))
        createMlRedirects(createRedirect, typeNodes, node, options)
      }
    })
  })
}

const getPageOptions = (nodes, index, template) => {
  const node = nodes[index]
  const { id, slug, area, topic } = node
  const prev = index === 0 ? null : nodes[index - 1].id
  const next = index === nodes.length - 1 ? null : nodes[index + 1].id

  return {
    path: slug,
    component: template,
    context: { id, slug, area, topic, prev, next },
  }
}

const getPagesTypes = (nodes) => {
  const pageTypes = {}

  nodes.forEach(({ node }) => {
    if (!pageTypes[node.type]) pageTypes[node.type] = []
    pageTypes[node.type].push(node)
  })

  return pageTypes
}

const getTemplate = (type) => {
  const templateName = templates[type] || templates.page

  const template = `../templates/${templateName}.js`

  return withThemePath(template)
}

module.exports = {
  createPagesTypes,
}
