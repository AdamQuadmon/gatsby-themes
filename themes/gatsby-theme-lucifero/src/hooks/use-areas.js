import { useStaticQuery, graphql } from 'gatsby'

export const useAreas = (language) => {
  const areas = useStaticQuery(
    graphql`
      query AreasQuery {
        allMdx(
          filter: { fields: { type: { eq: "area" } } }
          sort: { fields: frontmatter___date, order: ASC }
        ) {
          ...PostsEdges
        }
      }
    `
  )

  if (language) {
    return areas.allMdx.edges.filter(({ node }) => {
      return node.fields.langKey === language
    })
  }

  return areas.allMdx.edges
}
