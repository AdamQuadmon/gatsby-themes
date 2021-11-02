import { useStaticQuery, graphql } from 'gatsby'

export const useContent = (language) => {
  const content = useStaticQuery(
    graphql`
      query ContentQuery {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/pages/contenuti//" } }
          sort: { fields: [frontmatter___order], order: ASC }
        ) {
          ...MdxEdges
        }
      }
    `
  )

  if (language) {
    return content.allMdx.edges.filter(({ node }) => {
      return node.fields.langKey === language
    })
  }

  return content.allMdx.edges
}
