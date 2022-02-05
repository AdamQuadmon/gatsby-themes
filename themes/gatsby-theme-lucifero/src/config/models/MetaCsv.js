const getMetaCsv = (options) => {
  const MetaCsv = {
    name: 'MetaCsv',
    interfaces: ['Node'],
    extensions: {
      infer: false,
    },
    fields: {
      // base fields
      id: 'ID!',
      published: 'String',
      order: 'String',
      area: 'String',
      topic: 'String',
      language: 'String',
      i18nPath: 'String',
      slug: 'String',
      // meta fields
      description: 'String',
      name: 'String',
      tags: 'String',
      abstract: 'String',
      author: 'String',
      contentLocation: 'String',
      dateCreated: 'String',
      dateModified: 'String',
      datePublished: 'String',
      genre: 'String',
      headline: 'String',
      // type specific fields
      type: 'String',
      image: 'String',
      navPage: 'String',
      noCover: 'String',
      mdx: {
        type: 'Mdx',
        resolve: async (source, args, context, info) => {
          const path = source.i18nPath
          const mdx = await context.nodeModel.findOne({
            query: {
              filter: {
                fileAbsolutePath: { eq: path },
              },
            },
            type: 'Mdx',
          })
          return mdx
        },
      },
    },
  }

  return MetaCsv
}

module.exports = { getMetaCsv }
