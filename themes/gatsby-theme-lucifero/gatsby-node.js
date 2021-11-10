// Based on
// https://github.com/NickyMeuleman/gatsby-theme-nicky-blog/blob/master/theme/gatsby-node.js
const fs = require('fs')
const { createFilePath } = require('gatsby-source-filesystem')

const typeDefinitions = require('./src/config/typeDefinitions')
const MdxBlogPost = require('./src/config/models/MdxBlogPost')
const { defaultTrueConfig } = require('./src/config/fieldExtensions')

const {
  getLanguageFromPath,
  splitPath,
  getSlug,
  slugify,
  getThemePaths,
  withDefaults,
  withBasePath,
} = require('./src/config/index.js')

const { createMlPages } = require('./src/utils/i18n-redirects')

const onPreBootstrap = ({ reporter }, userConfig) => {
  const themePaths = getThemePaths(userConfig)

  themePaths.forEach((themePath) => {
    if (!fs.existsSync(themePath)) {
      reporter.info(`creating the ${themePath} directory`)
      fs.mkdirSync(themePath)
    }
  })
}

const onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  userConfig
) => {
  const options = withDefaults(userConfig)
  const { createNode, createNodeField, createParentChildLink } = actions

  if (node.internal.type === 'Mdx') {
    let slug = ''
    const path = createFilePath({ node, getNode, trailingSlash: false })
    const lang = getLanguageFromPath(path, options)
    let pathParts = splitPath(path)
    const pagesBasePath = pathParts[0]

    createNodeField({ node, name: 'langKey', value: lang })

    // nodes in the areas/ folder will create {area}/{topic}/{posts}
    if (pagesBasePath === 'areas') {
      pathParts.shift()

      if (!pathParts.length) {
        // this is the root blog node, no page to create
        createNodeField({ node, name: `type`, value: `blog` })
        return
      } else {
        // the rest of pathParts create the real post slug
        slug = withBasePath(options, pathParts.join('/'))
        createNodeField({ node, name: 'slug', value: slug })
        const area = pathParts.shift()
        createNodeField({ node, name: `area`, value: area })

        if (!pathParts.length) {
          createNodeField({ node, name: `type`, value: `area` })
        } else {
          const topic = pathParts.shift()
          createNodeField({ node, name: `topic`, value: topic })

          if (!pathParts.length) {
            createNodeField({ node, name: `type`, value: `topic` })
          } else {
            createNodeField({ node, name: `type`, value: `post` })
            const fieldData = {
              slug,
              // here to transform entries into Tag nodes
              tags: node.frontmatter.tags || [],
              // here because the creation of Tag nodes needs this info.
              published: node.frontmatter.published,
            }

            const proxyNode = {
              ...fieldData,
              id: createNodeId(`${node.id} >>> MdxBlogPost`),
              parent: node.id,
              children: [],
              internal: {
                type: `MdxBlogPost`,
                contentDigest: node.internal.contentDigest,
                content: JSON.stringify(fieldData),
                description: `MdxBlogPost node`,
              },
            }
            createNode(proxyNode)
            createParentChildLink({ parent: node, child: proxyNode })
          }
        }
      }
    } else {
      if (['ui'].includes(pagesBasePath)) {
        createNodeField({ node, name: `type`, value: pagesBasePath })
      } else {
        if (node.frontmatter.slug) {
          createNodeField({ node, name: `type`, value: `page` })
        }
      }
      slug = withBasePath(options, getSlug(node, path))
      createNodeField({ node, name: 'slug', value: slug })
    }

    // TODO: make this work or remove the options
    // slug is the pathName without the pathPrefix, used for creating pages
    // const pathName = urlJoin(options.pathPrefix, slug)
    // const url = urlJoin(options.website.url, pathName)

    // Pathname is used for internal linking
    // createNodeField({ node, name: 'pathName', value: pathName })
    // URL is the absolute website url to the post
    // createNodeField({ node, name: 'url', value: url })
  }

  // TODO: check this
  if (node.internal.type === `MdxBlogPost`) {
    // creating a Tag node for every entry in an MdxBlogPost tag array
    node.tags.forEach((tag, i) => {
      const fieldData = {
        name: tag,
        slug: slugify(tag),
        // TODO: How to filter tags based on parents published field
        // field on a tagnode to be able to filter nodes belonging to unpublished posts
        // duplicate logic from blogpost published resolver.
        postPublished: node.published === undefined ? true : node.published,
      }

      const proxyNode = {
        ...fieldData,
        id: createNodeId(`${node.id}${i} >>> Tag`),
        parent: node.id,
        children: [],
        internal: {
          type: `Tag`,
          contentDigest: createContentDigest(fieldData),
          content: JSON.stringify(fieldData),
          description: `Tag node`,
        },
      }

      createNode(proxyNode)
      createParentChildLink({ parent: node, child: proxyNode })
    })
  }
}

const createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions
  const { buildObjectType } = schema

  // Create custom directive that defaults a field to true if not specified
  createFieldExtension(defaultTrueConfig)

  createTypes(typeDefinitions, buildObjectType(MdxBlogPost))
}

const createPages = async ({ graphql, actions, reporter }, userConfig) => {
  const result = await graphql(`
    query {
      posts: allMdx(
        filter: {
          fields: { type: { eq: "post" } }
          frontmatter: { published: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
      pages: allMdx(filter: { fields: { type: { eq: "page" } } }) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
      areas: allMdx(
        filter: {
          fields: { type: { eq: "area" } }
          frontmatter: { published: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              area
            }
            frontmatter {
              title
            }
          }
        }
      }
      topics: allMdx(
        filter: {
          fields: { type: { eq: "topic" } }
          frontmatter: { published: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              area
              topic
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  createMlPages({
    nodes: result.data.posts.edges,
    template: `../templates/Post.js`,
    userConfig,
    actions,
  })

  createMlPages({
    nodes: result.data.pages.edges,
    template: `../templates/Page.js`,
    userConfig,
    actions,
  })

  createMlPages({
    nodes: result.data.areas.edges,
    template: `../templates/Area.js`,
    context: (node) => ({
      slug: node.fields.slug,
      area: node.fields.area,
    }),
    userConfig,
    actions,
  })

  createMlPages({
    nodes: result.data.topics.edges,
    template: `../templates/Topic.js`,
    context: (node) => ({
      slug: node.fields.slug,
      area: node.fields.area,
      topic: node.fields.topic,
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
  onPreBootstrap: onPreBootstrap,
  onCreateNode: onCreateNode,
  createSchemaCustomization: createSchemaCustomization,
  createPages: createPages,
  onPostBuild: onPostBuild,
}
