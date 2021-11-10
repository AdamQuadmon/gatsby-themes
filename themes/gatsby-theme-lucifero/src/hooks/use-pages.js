import { useStaticQuery, graphql } from 'gatsby'

export const usePages = (language) => {
  const pages = useStaticQuery(
    graphql`
      # NOTE: don't use PageQuery or PagesQuery as these are reserved
      query BlogPagesQuery {
        allMdx(
          filter: { fields: { type: { eq: "page" } } }
          sort: { fields: frontmatter___order }
        ) {
          ...MdxEdges
        }
      }
    `
  )

  if (language) {
    return pages.allMdx.edges.filter(({ node }) => {
      return node.fields.langKey === language
    })
  }

  return pages.allMdx.edges
}
