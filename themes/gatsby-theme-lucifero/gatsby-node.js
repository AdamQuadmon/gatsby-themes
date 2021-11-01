const fs = require('fs')
const path = require('path')
const urlJoin = require('url-join')

const schema = require('./src/config/schema')

const { withDefaults, withBasePath } = require('./src/config/index.js')

const createMultilingualRedirects = require(`./src/utils/i18n-redirects`)
const { createFilePath } = require('gatsby-source-filesystem')

const withThemePath = (relativePath) => {
  let pathResolvedPath = path.resolve(relativePath)
  let finalPath = pathResolvedPath
  try {
    // check if the user's site has the file
    require.resolve(pathResolvedPath)
  } catch (e) {
    // if the user hasn't implemented the file,
    finalPath = require.resolve(relativePath)
  }
  return finalPath
}

const onPreBootstrap = ({ reporter }, userConfig) => {
  const options = withDefaults(userConfig)
  const themePaths = [options.dataPath, options.pagesPath, options.localesPath]

  themePaths.forEach((themePath) => {
    if (!fs.existsSync(themePath)) {
      reporter.info(`creating the ${themePath} directory`)
      fs.mkdirSync(themePath)
    }
  })
}

const onCreateNode = ({ node, actions, getNode }, userConfig) => {
  const options = withDefaults(userConfig)
  const { createNodeField } = actions
  const languages = options.languages
  const defaultLanguage = options.languages.defaultLanguage

  // If using remote CMS check also `File` node here
  if (node.internal.type === 'Mdx' /* && node.parent*/) {
    const slug = createFilePath({ node, getNode })
    const slugLang = slug.split('.').pop().replace('/', '')
    const lang = (languages.includes(slugLang) && slugLang) || defaultLanguage

    // Route is the pathName without the pathPrefix, used for creating pages
    const route = withBasePath(options, slug)

    // Pathname is used for internal linking
    const pathName = urlJoin(options.pathPrefix, route)

    // URL is the absolute website url to the post
    const url = urlJoin(options.website.url, pathName)

    // Set route/url/pathName/langKey fields
    createNodeField({ node, name: 'route', value: route })
    createNodeField({ node, name: 'pathName', value: pathName })
    createNodeField({ node, name: 'url', value: url })
    createNodeField({ node, name: 'langKey', value: lang })
  }
}

// Customize Gatsby schema
const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`#graphql
     ${schema}
  `)
}

const createPages = async ({ graphql, actions, reporter }, userConfig) => {
  const options = withDefaults(userConfig)
  const { createPage } = actions
  const basePath = options.pagesPath
  const defaultLanguage = options.defaultLanguage
  const languages = options.languages
  const hasLanguages = languages.length > 1

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    if (hasLanguages) {
      createMultilingualRedirects(
        actions,
        posts,
        node,
        defaultLanguage,
        basePath
      )
    }

    createPage({
      path: node.frontmatter.slug,
      component: withThemePath(`./src/components/LayoutPage.js`),
      context: {
        id: node.id,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
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
