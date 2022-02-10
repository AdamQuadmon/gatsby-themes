const getMetaCsv = (options) => {
  const MetaCsv = {
    name: 'MetaCsv',
    interfaces: ['Node'],
    extensions: {
      infer: false,
    },
    fields: {
      id: 'ID!',
      published: 'String',
      order: 'String',
      type: 'String',
      area: 'String',
      topic: 'String',
      language: 'String',
      i18nPath: 'String',
      slug: 'String',
      // meta fields
      name: 'String',
      headline: 'String',
      alternativeHeadline: 'String',
      description: 'String',
      tags: 'String',
      abstract: 'String',
      location: 'String',
      award: 'String',
      discussionUrl: 'String',
      dateCreated: 'String',
      dateModified: 'String',
      datePublished: 'String',
      author: 'String',
      // type specific fields
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
