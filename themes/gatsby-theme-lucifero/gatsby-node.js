// Based on
// https://github.com/NickyMeuleman/gatsby-theme-nicky-blog/blob/master/theme/gatsby-node.js
const fs = require('fs')
const { createFilePath } = require('gatsby-source-filesystem')

const typeDefinitions = require('./src/config/typeDefinitions')
const MdxBlogPost = require('./src/config/models/MdxBlogPost')
const MdxPage = require('./src/config/models/MdxPage')
const {
  defaultTrueConfig,
  defaultFalseConfig,
  defaultNumber,
} = require('./src/config/fieldExtensions')

const {
  createThemePaths,
  createProxyNode,
  createAlbums,
  getLanguageFromPath,
  getPagePathInfo,
  slugify,
  withDefaults,
} = require('./src/config/index')

const { createMlPages } = require('./src/utils/i18n-redirects')

const onPreBootstrap = ({ reporter }, userConfig) => {
  createThemePaths(reporter, userConfig)
}

const createSchemaCustomization = ({ actions, schema }, userConfig) => {
  const { createTypes, createFieldExtension } = actions
  const { buildObjectType } = schema

  createFieldExtension(defaultTrueConfig)
  createFieldExtension(defaultFalseConfig)
  createFieldExtension(defaultNumber)

  createTypes(typeDefinitions)
  createTypes(buildObjectType(MdxBlogPost))
  createTypes(buildObjectType(MdxPage))
}

const onCreateNode = (
  { node, getNode, actions, createNodeId, createContentDigest },
  userConfig
) => {
  const gatsbyNodeHelpers = { node, actions, createNodeId, createContentDigest }
  const options = withDefaults(userConfig)

  if (node.internal.type === 'Mdx') {
    const path = createFilePath({ node, getNode, trailingSlash: false })
    const lang = getLanguageFromPath(path, options)
    const pageInfo = getPagePathInfo(node, path, options)

    // nodes in the `areas/` folder will create `{area}/{topic}/{posts}`
    if (pageInfo.base === 'areas') {
      // no page to create for blog type node
      if (type !== 'blog') {
        const fieldData = {
          lang,
          ...pageInfo.fields,
        }

        createProxyNode(gatsbyNodeHelpers, fieldData, 'MdxBlogPost')
      }
    } else {
      if (pageInfo.fields.type === 'page') {
        const { slug, type } = pageInfo.fields
        const fieldData = {
          lang,
          slug,
          type,
        }

        createProxyNode(gatsbyNodeHelpers, fieldData, 'MdxPage')
      } else {
        // TODO fix this or remove
        // ['ui'].includes(pageInfo.base) was used to add content for UI
      }
    }
  }

  if (node.internal.type === `MdxBlogPost`) {
    // creating a Tag node for every entry in an MdxBlogPost tag array
    node.tags.forEach((tag, i) => {
      const fieldData = {
        name: tag,
        slug: slugify(tag),
        postPublished: node.published === undefined ? true : node.published,
      }

      createProxyNode(gatsbyNodeHelpers, fieldData, 'Tag', i)
    })
  }
}

const createPages = async (
  { graphql, actions, reporter, createNodeId },
  userConfig
) => {
  const result = await graphql(`
    query {
      images: allImagesCsv {
        edges {
          node {
            id
            album
            file
            order
            width
            height
          }
        }
      }
      pages: allPage(filter: { meta: { published: { eq: true } } }) {
        edges {
          node {
            id
            slug
            fileAbsolutePath
          }
        }
      }
      areas: allBlogPost(filter: { type: { eq: "area" } }) {
        edges {
          node {
            id
            slug
            fileAbsolutePath
            area
          }
        }
      }
      topics: allBlogPost(filter: { type: { eq: "topic" } }) {
        edges {
          node {
            id
            slug
            fileAbsolutePath
            area
            topic
          }
        }
      }
      posts: allBlogPost(filter: { meta: { published: { eq: true } } }) {
        edges {
          node {
            id
            slug
            fileAbsolutePath
            area
            topic
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  createAlbums({
    nodes: result.data.images.edges,
    albumTemplate: `../templates/Album.js`,
    imageTemplate: `../templates/Image.js`,
    userConfig,
    actions,
    createNodeId,
  })
  createMlPages({
    nodes: result.data.pages.edges,
    template: `../templates/Page.js`,
    userConfig,
    actions,
  })
  createMlPages({
    nodes: result.data.posts.edges,
    template: `../templates/Post.js`,
    userConfig,
    actions,
  })
  createMlPages({
    nodes: result.data.areas.edges,
    template: `../templates/Area.js`,
    context: (node) => ({
      area: node.area,
    }),
    userConfig,
    actions,
  })
  createMlPages({
    nodes: result.data.topics.edges,
    template: `../templates/Topic.js`,
    context: (node) => ({
      area: node.area,
      topic: node.topic,
    }),
    userConfig,
    actions,
  })
}

// https://www.felixparadis.com/posts/pretty-sitemaps-with-gatsby-plugin-sitemap-and-xsl-stylesheets/
const onPostBuild = () => {
  fs.readdir('./public/sitemap/', (err, files) => {
    files.forEach((file) => {
      fs.readFile(`./public/sitemap/${file}`, 'utf-8', (err, data) => {
        const newValue = data.replace(
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`
        )
        fs.writeFileSync(`./public/sitemap/${file}`, newValue, 'utf-8')
      })
    })
  })
}

module.exports = {
  onPreBootstrap,
  onCreateNode,
  createSchemaCustomization,
  createPages,
  onPostBuild,
}
