const fm = require('front-matter')

const {
  getDirectories,
  getFile,
  printInfo,
  writeCsv,
  getSortedKeys,
  getCountsArray,
  pushValue,
  filterPostSlug,
  pushCounter,
} = require('./mdx_utils')

const {
  splitPath,
} = require('../themes/gatsby-theme-lucifero/src/config/index.js')

const contentPath = 'examples/giuno/pages/areas'

let postsData = {
  // contains frontmatter attributes use count
  attributesCount: {},
  // contains areas use count
  areasCount: {},
  allAreas: [],
  // contains categories use count
  categoriesCount: {},
  allCategories: [],
  // contains tags use count
  tagsCount: {},
  allTags: [],
  allPosts: [],
}

// const getValue = (e) => e.name
const getValue = (e) => e.id

const parsePost = (fileData, postsData) => {
  const content = fm(fileData.content)

  let pathParts = splitPath(fileData.slug)
  const area = filterPostSlug(pathParts.shift())
  const topic = filterPostSlug(pathParts.length && pathParts.shift())
  const postSlug = filterPostSlug(pathParts.join('/'))

  const { title, description, tags, published, date } = content.attributes

  let _area, _category
  if (area) {
    pushCounter(postsData.areasCount, area, postsData.allAreas)
    _area = postsData.allAreas.find((o) => o.name === area)
    if (topic) {
      pushCounter(postsData.categoriesCount, topic, postsData.allCategories)
      _category = postsData.allCategories.find((o) => o.name === topic)
      pushValue(_area, 'categories', getValue(_category))
      pushValue(_category, 'areas', getValue(_area))
    }
  }

  Object.keys(content.attributes).forEach((attributeKey) => {
    pushCounter(postsData.attributesCount, attributeKey)
    const attribute = content.attributes[attributeKey]

    if (attributeKey === 'tags') {
      attribute.forEach((tag) => {
        pushCounter(postsData.tagsCount, tag, postsData.allTags)
        let _tag = postsData.allTags.find((o) => o.name === tag)
        if (_area) {
          pushValue(_area, 'tags', getValue(_tag))
          pushValue(_tag, 'areas', getValue(_area))
          if (_category) {
            pushValue(_tag, 'categories', getValue(_category))
            pushValue(_category, 'tags', getValue(_tag))
          }
        }
      })
    }
  })

  postsData.allPosts.push({
    slug: fileData.slug,
    area: _area && getValue(_area),
    category: _category && getValue(_category),
    post_slug: postSlug,
    tags:
      tags &&
      tags.map((tag) =>
        getValue(postsData.allTags.find((o) => o.name === tag))
      ),
    title,
    description,
    // image: cover,
    published,
    // created_at: date,
    // content: content.body,
    //   software,
  })
}

const printInfo = (postsData) => {
  //   console.log(tags)
  console.log('Posts:', postsData.allPosts.length)
  //   console.log(allPosts)
  console.log('Attributes:', Object.keys(postsData.attributesCount).length)
  //   console.log(attributesCount)
  console.log('Tags:', Object.keys(postsData.tagsCount).length)
  //   const tagsByUsage = Object.entries(tagsCount).sort(sortByPropertyValue)
  //   console.log(Object.entries(tagsCount))
  getSortedKeys(postsData.tagsCount).forEach((tag) => {
    //     // console.log(tagsCount[tag])
    // if (tagsCount[tag] > 1) console.log(tag, tagsCount[tag])
  })
}

const getMdx = (filesData) => {
  filesData.forEach((data) => parsePost(data, postsData))
  printInfo(postsData)

  writeCsv(postsData.allPosts, 'posts')
  writeCsv(getCountsArray(postsData.areasCount, postsData.allAreas), 'areas')
  writeCsv(
    getCountsArray(postsData.categoriesCount, postsData.allCategories),
    'categories'
  )
  writeCsv(getCountsArray(postsData.tagsCount, postsData.allTags), 'tags')
}

getDirectories(contentPath, (err, files) => {
  console.log('Files:', files.length)
  if (!err) {
    Promise.all(files.map((file) => getFile(contentPath, file)))
      .then(getMdx)
      .catch((err) => {
        console.log(err)
      })
  }
})
