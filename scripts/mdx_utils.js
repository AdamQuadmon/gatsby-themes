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

const getKeysCount = (counters, section) => {
  const counter = counters[section]

  return Object.keys(counter.counts).map((key) => {
    const count = counter.counts[key]
    let entity = getEntityByName(counters, section, key)
    entity['count'] = count
    return entity
  })
}

// add key to array
const countSectionKey = (counters, section, key) => {
  const counter = counters[section]
  if (!counter.counts[key]) {
    counter.counts[key] = 0
    counter.entities.push({
      id: counter.entities.length + 1,
      name: key,
    })
  }

  counter.counts[key]++
}

// filter index from slug
const getSlugUnlessIndex = (slug) => {
  if (slug === 'index') return null
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

const getEntityByName = (object, section, key) => {
  return object[section].entities.find((o) => o.name === key)
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
  getEntityByName,
  getKeysCount,
  getDirectories,
  getFile,
  getImage,
  getImages,
  getSlugUnlessIndex,
  getSortedKeys,
  pushValue,
  countSectionKey,
  writeCsv,
}

const getNodePath = (node) => {
  const { fileAbsolutePath } = node
  if (!fileAbsolutePath) {
    console.log('getNodePath: node has no fileAbsolutePath', node)
    return ''
  }

  return fileAbsolutePath
}

const removeExtensions = (node, options) => {
  const { languages } = options
  let fileAbsolutePath = getNodePath(node)
  const parts = fileAbsolutePath.split('.')
  if (parts.length > 1 && languages.includes(parts.pop())) {
    fileAbsolutePath = parts.join('.')
  }

  return fileAbsolutePath
}
