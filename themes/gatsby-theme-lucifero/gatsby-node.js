// Inspired by https://github.com/NickyMeuleman/gatsby-theme-nicky-blog/blob/master/theme/gatsby-node.js
const fs = require('fs')

const {
  defaultTrueConfig,
  defaultFalseConfig,
  defaultNumber,
} = require('./src/config/fieldExtensions')

const typeDefinitions = require('./src/config/typeDefinitions')
const { getPage } = require('./src/config/models/Page')
const { getMetaCsv } = require('./src/config/models/MetaCsv')
const { getAlbumCsv } = require('./src/config/models/AlbumCsv')
const { getImageCsv } = require('./src/config/models/ImageCsv')
const { getPlaceCsv } = require('./src/config/models/PlaceCsv')

const { createPageProxy } = require('./src/config/proxy')
const { createPagesTypes } = require('./src/config/pages')
const { createThemePaths } = require('./src/config/index')

const onPreBootstrap = ({ reporter }, userConfig) => {
  createThemePaths(reporter, userConfig)
}

// https://www.gatsbyjs.com/docs/schema-generation/
const createSchemaCustomization = ({ actions, schema }, userConfig) => {
  const { createTypes, createFieldExtension } = actions
  const { buildObjectType } = schema

  createFieldExtension(defaultTrueConfig)
  createFieldExtension(defaultFalseConfig)
  createFieldExtension(defaultNumber)

  createTypes(typeDefinitions)
  createTypes(buildObjectType(getAlbumCsv(userConfig)))
  createTypes(buildObjectType(getImageCsv(userConfig)))
  createTypes(buildObjectType(getPlaceCsv(userConfig)))
  createTypes(buildObjectType(getMetaCsv(userConfig)))
  createTypes(buildObjectType(getPage(userConfig)))
}

const onCreateNode = ({ node, actions, createNodeId, createContentDigest }) => {
  const gatsbyNodeHelpers = { node, actions, createNodeId, createContentDigest }

  switch (node.internal.type) {
    case 'AlbumCsv': {
      createPageProxy(gatsbyNodeHelpers, 'album')
      break
    }
    case 'ImageCsv': {
      createPageProxy(gatsbyNodeHelpers, 'image')
      break
    }
    case 'MetaCsv': {
      createPageProxy(gatsbyNodeHelpers, 'page')
      break
    }
  }
}

const createPages = async ({ graphql, actions, reporter }, userConfig) => {
  const result = await graphql(`
    query {
      allPage(
        filter: { published: { eq: true }, type: { nin: ["gallery", "home"] } }
      ) {
        edges {
          node {
            id
            type
            language
            slug
            i18nPath
            topic
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  if (!result.data.allPage) {
    reporter.warn('🚨  WARN: on "createPages" query: no pages to create')
    return
  }

  const nodes = result.data.allPage.edges

  createPagesTypes({ nodes, userConfig, actions })
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

// https://tjaddison.com/blog/2020/11/monitoring-your-gatsbyjs-bundle-size/
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const onCreateWebpackConfig = ({ stage, actions }) => {
//   const analyzerMode = process.env.INTERACTIVE_ANALYZE ? 'server' : 'json'
//   // const analyzerMode = 'server'

//   if (stage === 'build-javascript') {
//     actions.setWebpackConfig({
//       plugins: [
//         new BundleAnalyzerPlugin({
//           analyzerMode,
//           reportFileName: `./__build/bundlereport.json`,
//         }),
//       ],
//     })
//   }
// }

module.exports = {
  onPreBootstrap,
  onCreateNode,
  onPostBuild,
  createSchemaCustomization,
  createPages,
  // onCreateWebpackConfig,
}
