const MdxBase = require('./MdxBase')

const MdxBlogPost = {
  // the source in resolvers is the MdxBlogPost node
  name: `MdxBlogPost`,
  interfaces: [`Node`, `Page`, `BlogPost`],
  extensions: {
    childOf: {
      types: [`Mdx`],
    },
    dontInfer: {},
  },
  fields: {
    ...MdxBase.fields,
    area: {
      type: `String`,
    },
    topic: {
      type: `String`,
    },
    tags: {
      type: `[Tag!]`,
      extensions: {
        link: { by: `name` },
      },
      resolve: (source, args, context, info) => {
        const { slug } = source
        const meta = getMetaBySlug(slug, context)
        // return flat array of tags, works because of the link(by:"name") extension
        return meta.tags || []
      },
    },
    // authors: {
    //   type: `[Author!]`,
    //   extensions: {
    //     link: { by: `shortName` },
    //   },
    //   resolve: (source, args, context, info) => {
    //     const mdxNode = getParent(source, context)
    //     if (mdxNode.meta.author) {
    //       // return plain author shortName array, works because of the link(by:"name") extension
    //       return [].concat(mdxNode.meta.author)
    //     }
    //     if (mdxNode.meta.authors) {
    //       // use the "authors" key too in the meta
    //       // because listing multiple authors under a singular author key is whack.
    //       return [].concat(mdxNode.meta.authors)
    //     }
    //     return null
    //   },
    // },
  },
}

module.exports = MdxBlogPost
