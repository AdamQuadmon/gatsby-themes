// sort a-z then for key value
const sortObjectByKeys = (o) => {
  return Object.keys(o)
    .sort()
    .sort((a, b) => o[b] - o[a])
    .reduce((r, k) => ((r[k] = o[k]), r), {})
}

const getCountsArray = (object, objectsArray) => {
  const valueKey = 'count'
  return Object.keys(object).map((key) => {
    const value = object[key]
    if (objectsArray) {
      let _object = objectsArray.find((o) => o.name === key)
      if (_object) {
        _object[valueKey] = value
        return _object
      }
    }

    return {
      name: key,
      count: object[key],
    }
  })
}

// add key to array
const pushCounter = (elements, key, elementsArray) => {
  if (!elements[key]) {
    elements[key] = 0
    if (elementsArray)
      elementsArray.push({ id: elementsArray.length + 1, name: key })
  }

  elements[key]++
}

// filter index from slug
const filterPostSlug = (slug) => {
  if (slug === 'index') slug = ''
  return slug
}

module.exports = {
  sortObjectByKeys,
  pushCounter,
  filterPostSlug,
  getCountsArray,
}
