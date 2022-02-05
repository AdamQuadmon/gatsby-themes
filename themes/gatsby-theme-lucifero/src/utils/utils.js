export const edgesByLanguage = (data, language) => {
  if (!language) {
    return data.edges
  }
  return data.edges.filter(({ node }) => {
    return node.language === language
  })
}

// return an object of `properties`
// if there is a value in `first` or `second` object
// WARNING unused
export const initParams = (properties, first, second) => {
  const data = {}

  properties.forEach((property) => {
    const value = first[property] || (second && second[property])
    if (value) data[property] = value
  })

  return data
}
