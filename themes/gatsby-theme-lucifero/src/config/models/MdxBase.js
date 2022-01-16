const { stringToBoolean, mdxResolverPassthrough } = require('../index')

const getParent = (node, context) => {
  return context.nodeModel.getNodeById({
    id: node.parent,
  })
}

const getMetaBySlug = (slug, context) => {
  return context.nodeModel.findOne({
    type: 'PagesCsv',
    query: {
      filter: { slug: { eq: slug } },
    },
  })
}

const getSlug = (node, context) => {
  const mdxNode = getParent(node, context)
  if (mdxNode.frontmatter.slug) {
    return mdxNode.frontmatter.slug
  }
  const fileNode = getParent(mdxNode, context)
  if (fileNode.relativeDirectory) {
    return fileNode.relativeDirectory
  }
  return fileNode.name
}

const MdxBase = {
  name: `MdxBase`,
  interfaces: [`Node`, `Post`],
  extensions: {
    childOf: {
      types: [`Mdx`],
    },
    dontInfer: {},
  },
  fields: {
    id: `ID!`,
    lang: {
      type: `String!`,
    },
    slug: {
      type: `String!`,
    },
    type: {
      type: `String`,
    },
    meta: {
      type: `PagesCsv`,
      resolve: (source, args, context, info) => {
        return getMetaBySlug(source.slug, context)
      },
    },
    order: {
      type: `Int`,
      resolve: async (source, args, context, info) => {
        const meta = await getMetaBySlug(source.slug, context)
        const order = meta.order || 999

        return order
      },
    },
    published: {
      type: `Boolean`,
      resolve: async (source, args, context, info) => {
        const meta = await getMetaBySlug(source.slug, context)
        const published = stringToBoolean(meta.published)

        return published
      },
    },
    date: {
      type: `Date!`,
      extensions: {
        dateformat: {},
        proxy: {},
      },
      resolve: async (source, args, context, info) => {
        const meta = await getMetaBySlug(source.slug, context)
        if (meta.date) {
          return meta.date
        }
        const mdxNode = getParent(source, context)
        const fileNode = getParent(mdxNode, context)
        return fileNode.birthTime
      },
    },
    updatedAt: {
      type: `Date`,
      extensions: {
        dateformat: {},
        proxy: {},
      },
      resolve: async (source, args, context, info) => {
        const meta = await getMetaBySlug(source.slug, context)

        if (meta.updatedAt) {
          return meta.updatedAt
        }
        const mdxNode = getParent(source, context)
        const fileNode = getParent(mdxNode, context)
        return fileNode.modifiedTime !== fileNode.birthTime
          ? fileNode.modifiedTime
          : null
      },
    },
    fileAbsolutePath: {
      type: `String!`,
      resolve: (source, args, context, info) => {
        const mdxNode = getParent(source, context)
        return mdxNode.fileAbsolutePath
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
  },
}

module.exports = MdxBase
