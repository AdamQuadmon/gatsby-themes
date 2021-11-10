const { slugify, mdxResolverPassthrough } = require('../index')

const MdxBlogPost = {
  // the source in resolvers is the MdxBlogPost node
  name: `MdxBlogPost`,
  interfaces: [`Node`, `BlogPost`],
  extensions: {
    childOf: {
      types: [`Mdx`],
    },
    dontInfer: {},
  },
  fields: {
    id: `ID!`,
    slug: {
      type: `String!`,
      resolve: (source, args, context, info) => {
        const mdxNode = context.nodeModel.getNodeById({
          id: source.parent,
        })
        if (mdxNode.frontmatter.slug) {
          // get slug from frontmatter field
          return slugify(mdxNode.frontmatter.slug)
        }
        const fileNode = context.nodeModel.getNodeById({
          id: mdxNode.parent,
        })
        // if loose file, relativeDirectory === '', which is falsy
        if (fileNode.relativeDirectory) {
          // get slug from parent folder name
          return slugify(fileNode.relativeDirectory)
        }
        return slugify(fileNode.name)
      },
    },
    title: {
      type: `String!`,
      resolve: (source, args, context, info) => {
        const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
        if (mdxNode.frontmatter.title) {
          // get title from frontmatter field
          return mdxNode.frontmatter.title
        }
        const fileNode = context.nodeModel.getNodeById({
          id: mdxNode.parent,
        })
        if (fileNode.relativeDirectory) {
          // get title from parent folder name
          return fileNode.relativeDirectory
        }
        // get title from file name
        return fileNode.name
      },
    },
    date: {
      type: `Date!`,
      extensions: {
        dateformat: {},
        proxy: {},
      },
      resolve: (source, args, context, info) => {
        const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
        if (mdxNode.frontmatter.date) {
          return mdxNode.frontmatter.date
        }
        const fileNode = context.nodeModel.getNodeById({
          id: mdxNode.parent,
        })
        return fileNode.birthTime
      },
    },
    updatedAt: {
      type: `Date`,
      extensions: {
        dateformat: {},
        proxy: {},
      },
      resolve: (source, args, context, info) => {
        const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
        if (mdxNode.frontmatter.updatedAt) {
          return mdxNode.frontmatter.updatedAt
        }
        const fileNode = context.nodeModel.getNodeById({
          id: mdxNode.parent,
        })
        return fileNode.modifiedTime !== fileNode.birthTime
          ? fileNode.modifiedTime
          : null
      },
    },
    canonicalUrl: {
      type: `String`,
      resolve: (source, args, context, info) => {
        const parent = context.nodeModel.getNodeById({ id: source.parent })
        return parent.frontmatter.canonicalUrl
      },
    },
    tags: {
      type: `[Tag!]`,
      extensions: {
        link: { by: `name` },
      },
      resolve: (source, args, context, info) => {
        const parent = context.nodeModel.getNodeById({ id: source.parent })
        // return flat array of tags, works because of the link(by:"name") extension
        return parent.frontmatter.tags
      },
    },
    authors: {
      type: `[Author!]`,
      extensions: {
        link: { by: `shortName` },
      },
      resolve: (source, args, context, info) => {
        const parent = context.nodeModel.getNodeById({ id: source.parent })
        if (parent.frontmatter.author) {
          // return plain author shortName array, works because of the link(by:"name") extension
          return [].concat(parent.frontmatter.author)
        }
        if (parent.frontmatter.authors) {
          // use the "authors" key too in the frontmatter
          // because listing multiple authors under a singular author key is whack.
          return [].concat(parent.frontmatter.authors)
        }
        return null
      },
    },
    keywords: {
      type: `[String]`,
      resolve: (source, args, context, info) => {
        const parent = context.nodeModel.getNodeById({ id: source.parent })
        return parent.frontmatter.keywords || []
      },
    },
    excerpt: {
      type: `String!`,
      args: {
        pruneLength: {
          type: `Int`,
          defaultValue: 140,
        },
      },
      resolve: mdxResolverPassthrough(`excerpt`),
    },
    body: {
      type: `String!`,
      resolve: mdxResolverPassthrough(`body`),
    },
    cover: {
      type: `File`,
      extensions: {
        fileByRelativePath: {},
      },
      resolve: (source, args, context, info) => {
        const parent = context.nodeModel.getNodeById({ id: source.parent })
        // return relative path string, works because of fileByRelativePath directive
        return parent.frontmatter.cover
      },
    },
    timeToRead: {
      type: `Int`,
      resolve: mdxResolverPassthrough(`timeToRead`),
    },
    tableOfContents: {
      type: `JSON`,
      args: {
        maxDepth: { type: `Int`, defaultValue: 6 },
      },
      resolve: mdxResolverPassthrough(`tableOfContents`),
    },
    published: {
      type: `Boolean!`,
      extensions: {
        defaultTrue: {},
      },
      resolve: (source, args, context, info) => {
        const parent = context.nodeModel.getNodeById({ id: source.parent })
        return parent.frontmatter.published
      },
    },
    series: {
      type: `Series`,
      resolve: (source, args, context, info) => {
        const mdxNode = context.nodeModel.getNodeById({
          id: source.parent,
        })
        const seriesName = mdxNode.frontmatter.series
        const seriesPosts = context.nodeModel
          .getAllNodes({ type: `BlogPost` })
          .filter((post) => {
            // logic for MdxBlogPost (to add multi-sourcing series support expand logic for other types)
            if (source.internal.type === `MdxBlogPost`) {
              const parent = context.nodeModel.getNodeById({
                id: post.parent,
              })
              return seriesName === parent.frontmatter.series
            }
            return false
          })
        return (
          seriesName && {
            name: seriesName,
            posts: seriesPosts,
          }
        )
      },
    },
  },
}

module.exports = MdxBlogPost
