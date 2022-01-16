const MdxBase = require('./MdxBase')

const MdxPage = {
  // the source in resolvers is the MdxPage node
  name: `MdxPage`,
  interfaces: [`Node`, `Page`],
  extensions: {
    childOf: {
      types: [`Mdx`],
    },
    dontInfer: {},
  },
  fields: MdxBase.fields,
}

module.exports = MdxPage
