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

// maybe better in other file
export const pickFirst = (item, properties) => {
  if (!item) return null
  const property = properties.find((property) => item[property])
  return property && item[property]
}

export const addParams = (source, dest, properties) => {
  properties.forEach((property) => {
    if (property.s) {
      if (source[property.s]) dest[property.d] = source[property.s]
    } else {
      if (source[property]) dest[property] = source[property]
    }
  })
}
