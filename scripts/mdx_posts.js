const fm = require('front-matter')
const moment = require('moment')

const {
  getKeysCount,
  getDirectories,
  getFile,
  getEntityByName,
  getSlugUnlessIndex,
  getSortedKeys,
  countSectionKey,
  pushValue,
  writeCsv,
} = require('./mdx_utils')

const {
  splitPath,
} = require('../themes/gatsby-theme-lucifero/src/config/index.js')

const contentPath = 'projects/lux/pages/blog'
// const contentPath = 'examples/giuno/pages/blog'

let postsData = {
  areas: {
    counts: {},
    entities: [],
  },
  topics: {
    counts: {},
    entities: [],
  },
  attributes: {
    counts: {},
    entities: [],
  },
  tags: {
    counts: {},
    entities: [],
  },
  posts: [],
  // contains frontmatter attributes use count
  // attributesCount: {},
  // contains areas use count
  // areasCount: {},
  // allAreas: [],
  // // contains categories use count
  // categoriesCount: {},
  // allCategories: [],
  // contains tags use count
  // tagsCount: {},
  // allTags: [],
  // allPosts: [],
}

const getEntityKey = (e) => e.name
// const getEntityKey = (e) => e.id

const checkAttributes = (attributes, slug) => {
  const attributesKeys = Object.keys(attributes)

  const defaultAttributes = [
    'slug',
    'metaTitle',
    'title',
    'date',
    'description',
    'published',
    'order',
    'navPage',
    'noCover',
    'cover',
    'tags',
    'software',
    // 'folder',
    // 'ogImage',
    // 'album',
  ]

  attributesKeys.forEach((key) => {
    if (!defaultAttributes.includes(key)) {
      console.log('checkAttributes! unknown', key, 'in slug:', slug)
    }
  })
}
const parsePost = (fileData, postsData) => {
  const content = fm(fileData.content)

  let pathParts = splitPath(fileData.slug)
  const areaKey = getSlugUnlessIndex(pathParts.shift())
  const topicKey =
    (pathParts.length && getSlugUnlessIndex(pathParts.shift())) || null
  const pageSlug = getSlugUnlessIndex(pathParts.join('/'))

  checkAttributes(content.attributes, fileData.slug)

  const {
    slug: metaSlug,
    metaTitle,
    title,
    date,
    description,
    published,
    order,
    navPage,
    noCover,
    cover,
  } = content.attributes

  let area,
    topic,
    tags = []
  if (areaKey) {
    countSectionKey(postsData, 'areas', areaKey)
    area = getEntityByName(postsData, 'areas', areaKey)
    if (topicKey) {
      countSectionKey(postsData, 'topics', topicKey)
      topic = getEntityByName(postsData, 'topics', topicKey)
      pushValue(area, 'topics', getEntityKey(topic))
      pushValue(topic, 'areas', getEntityKey(area))
    }
  }

  Object.keys(content.attributes).forEach((attributeKey) => {
    countSectionKey(postsData, 'attributes', attributeKey)
    const attribute = content.attributes[attributeKey]

    if (attributeKey === 'tags') {
      attribute.forEach((tagKey) => {
        countSectionKey(postsData, 'tags', tagKey)
        let tag = getEntityByName(postsData, 'tags', tagKey)
        tags.push(tag)
        if (area) {
          pushValue(area, 'tags', getEntityKey(tag))
          pushValue(tag, 'areas', getEntityKey(area))
          if (topic) {
            pushValue(tag, 'topics', getEntityKey(topic))
            pushValue(topic, 'tags', getEntityKey(tag))
          }
        }
      })
    }
  })

  const dateF = moment(date).format('YYYY-MM-DD HH:mm:ss')

  postsData.posts.push({
    // Article Specific
    published,
    area: area && getEntityKey(area),
    topic: topic && getEntityKey(topic),
    i18nPath: fileData.slug,
    slug: fileData.slug.replace('/index', ''),
    pageSlug,
    // tags: tags.join(','),
    type: getPostType(pageSlug, topic),
    // seo thing
    description,
    image: cover,
    name: title,
    // seo CreativeWork
    tags: tags.map((tag) => tag.name),
    abstract: '',
    author: '',
    contentLocation: '',
    dateModified: dateF,
    dateCreated: dateF,
    datePublished: dateF,
    genre: '',
    headline: metaTitle,
    order,
    // Ui
    navPage,
    noCover,
    // Others
    metaSlug,
  })
}

const getPostType = (pageSlug, topic) => {
  return pageSlug ? 'article' : topic ? 'topic' : 'area'
}

const printInfo = (postsData) => {
  console.log('Posts:', postsData.posts.length)
  console.log('Attributes:', postsData.attributes.entities.length)
  console.log('Tags:', postsData.tags.entities.length)
}

const getMdx = (filesData) => {
  filesData.forEach((data) => parsePost(data, postsData))
  printInfo(postsData)

  writeCsv(postsData.posts, 'meta')
  writeCsv(getKeysCount(postsData, 'areas'), 'areas')
  writeCsv(getKeysCount(postsData, 'topics'), 'topics')
  writeCsv(getKeysCount(postsData, 'tags'), 'tags')
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
