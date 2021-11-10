import { useStaticQuery, graphql } from 'gatsby'

export const useNavPages = (language) => {
  const pages = useStaticQuery(
    graphql`
      # NOTE: don't use PageQuery or PagesQuery as these are reserved
      query NavPagesQuery {
        allMdx(
          filter: {
            fields: { type: { eq: "page" } }
            frontmatter: { navPage: { eq: true } }
          }
          sort: { fields: frontmatter___order }
        ) {
          ...NavPagesEdges
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
