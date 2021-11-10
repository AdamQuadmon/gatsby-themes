const { createWriteStream, promises } = require('fs')
const fm = require('front-matter')
const glob = require('glob')
const fastcsv = require('fast-csv')

const {
  splitPath,
} = require('../themes/gatsby-theme-lucifero/src/config/index.js')

const {
  sortObjectByKeys,
  pushCounter,
  filterPostSlug,
  getCountsArray,
} = require('./utils')

const getDirectories = function (src, callback) {
  glob(src + '/**/*{.md,.mdx}', callback)
}

const contentPath = 'examples/giuno/pages/areas'
const outputPath = 'csv/'

// contains frontmatter attributes use count
let attributesCount = {}
// contains areas use count
let areasCount = {}
let allAreas = []
// contains categories use count
let categoriesCount = {}
let allCagegories = []
// contains tags use count
let tagsCount = {}
let allTags = []

let allPosts = []

// return { slug, content } of file path
const getFile = async (file) => {
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

const parseContent = (fileData) => {
  const content = fm(fileData.content)

  let pathParts = splitPath(fileData.slug)
  const area = filterPostSlug(pathParts.shift())
  const topic = filterPostSlug(pathParts.length && pathParts.shift())
  const postSlug = filterPostSlug(pathParts.join('/'))

  const { title, description, tags, cover, published, date } =
    content.attributes

  let _area, _category
  if (area) {
    pushCounter(areasCount, area, allAreas)
    _area = allAreas.find((o) => o.name === area)
    if (topic) {
      pushCounter(categoriesCount, topic, allCagegories)
      _category = allCagegories.find((o) => o.name === topic)
      pushValue(_area, 'categories', _category.id)
      pushValue(_category, 'areas', _area.id)
    }
  }

  Object.keys(content.attributes).forEach((attributeKey) => {
    pushCounter(attributesCount, attributeKey)
    const attribute = content.attributes[attributeKey]

    if (attributeKey === 'tags') {
      attribute.forEach((tag) => {
        pushCounter(tagsCount, tag, allTags)
        let _tag = allTags.find((o) => o.name === tag)
        if (_area) {
          pushValue(_area, 'tags', _tag.id)
          pushValue(_tag, 'areas', _area.id)
          if (_category) {
            pushValue(_tag, 'categories', _category.id)
            pushValue(_category, 'tags', _tag.id)
          }
        }
      })
    }
  })

  allPosts.push({
    slug: fileData.slug,
    area: _area && _area.id,
    category: _category && _category.id,
    post_slug: postSlug,
    tags: tags && tags.map((tag) => allTags.find((o) => o.name === tag).id),
    title,
    description,
    image: cover,
    published,
    created_at: date,
    content: content.body,
    //   software,
  })
}

const printInfo = (filesData) => {
  //   console.log(tags)
  console.log('Posts:', allPosts.length)
  //   console.log(allPosts)
  console.log('Attributes:', Object.keys(attributesCount).length)
  //   console.log(attributesCount)
  console.log('Tags:', Object.keys(tagsCount).length)
  //   const tagsByUsage = Object.entries(tagsCount).sort(sortByPropertyValue)
  //   console.log(Object.entries(tagsCount))
  Object.keys(sortObjectByKeys(tagsCount)).forEach((tag) => {
    //     // console.log(tagsCount[tag])
    // if (tagsCount[tag] > 1) console.log(tag, tagsCount[tag])
  })
}

const writeCsv = (data, name) => {
  const ws = createWriteStream(`${outputPath}${name}.csv`)
  fastcsv.write(data, { headers: true }).pipe(ws)
}
const getMdx = (filesData) => {
  filesData.forEach(parseContent)
  printInfo()

  writeCsv(allPosts, 'posts')
  writeCsv(getCountsArray(areasCount, allAreas), 'areas')
  writeCsv(getCountsArray(categoriesCount, allCagegories), 'categories')
  writeCsv(getCountsArray(tagsCount, allTags), 'tags')
}

getDirectories(contentPath, (err, files) => {
  console.log('Files:', files.length)
  if (!err) {
    Promise.all(files.map(getFile))
      .then(getMdx)
      .catch((err) => {
        console.log(err)
      })
  }
})
