const { createWriteStream, promises } = require('fs')
const glob = require('glob')
const fastcsv = require('fast-csv')
const sharp = require('sharp')

const outputPath = 'csv/'

const getDirectories = function (src, callback) {
  glob(src + '/**/*{.md,.mdx}', callback)
}

const getImages = function (src, callback) {
  glob(src + '/**/*.jpg', callback)
}

const getImage = async (contentPath, file) => {
  const metadata = await sharp(`${file}`).metadata()
  return {
    file: file.split(contentPath)[1],
    metadata,
  }
}

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

const getSortedKeys = (obj) => {
  return Object.keys(sortObjectByKeys(obj))
}

// return { slug, content } of file path
const getFile = async (contentPath, file) => {
  const slug = file.split(contentPath)[1].split('.md')[0]
  const content = await promises.readFile(file, 'utf8')
  return {
    slug,
    content,
  }
}

const pushValue = (object, key, value) => {
  if (!object[key]) object[key] = []
  if (value && !object[key].includes(value)) object[key].push(value)
}

const writeCsv = (data, name) => {
  const ws = createWriteStream(`${outputPath}${name}.csv`)
  fastcsv.write(data, { headers: true }).pipe(ws)
}

module.exports = {
  getDirectories,
  getImages,
  getImage,
  getFile,
  writeCsv,
  getSortedKeys,
  getCountsArray,
  pushValue,
  filterPostSlug,
  pushCounter,
}
