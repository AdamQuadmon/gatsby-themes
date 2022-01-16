export const edgesByLanguage = (data, language) => {
  if (!language) {
    return data.edges
  }
  return data.edges.filter(({ node }) => {
    return node.lang === language
  })
}
