const _createProxyNode = (gatsbyNodeHelpers, fieldData, type, index) => {
  const { node, actions, createNodeId, createContentDigest } = gatsbyNodeHelpers
  const { createNode, createParentChildLink } = actions
  const contentDigest = node.internal.contentDigest
  // const contentDigest = createContentDigest(fieldData)
  // const id = `${node.id}${index}`
  const id = node.id

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

const createPageProxy = (gatsbyNodeHelpers, type) => {
  const fieldData = getFieldsData(gatsbyNodeHelpers, type)
  _createProxyNode(gatsbyNodeHelpers, fieldData, 'Page')
}

const getFieldsData = (gatsbyNodeHelpers, type) => {
  const { node } = gatsbyNodeHelpers
  const fieldData = {
    type,
    ...getBaseFields(node),
    ...getTypeFields(node, type),
  }

  return fieldData
}
const getBaseFields = (node) => {
  return ({
    published,
    order,
    area,
    topic,
    language,
    i18nPath,
    slug,
    description,
    name,
    tags,
    abstract,
    author,
    contentLocation,
    dateCreated,
    dateModified,
    datePublished,
    genre,
    headline,
  } = node)
}

const getTypeFields = (node, type) => {
  switch (type) {
    case 'album':
      return ({
        // pageUrl,
        // pageLabel,
        // imagesLength,
      } = node)
    case 'image':
      return ({
        folder,
        file,
        imagePath,
        width,
        height,
        account,
        // domain,
        // zone,
        // subject,
        // season,
        // month,
        // daytime,
      } = node)
    default:
      return ({ image, navPage, noCover, mdx } = node)
  }
}

module.exports = {
  createPageProxy,
}
