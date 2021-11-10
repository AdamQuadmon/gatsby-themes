import { useStaticQuery, graphql } from 'gatsby'

export const useHomeAreas = () => {
  const data = useStaticQuery(
    graphql`
      query {
        section: mdx(fields: { type: { eq: "blog" } }) {
          ...PostNode
        }
        sections: allMdx(
          filter: { fields: { type: { eq: "area" } } }
          sort: { fields: frontmatter___date, order: ASC }
        ) {
          ...PostsEdges
        }
        latest: allMdx(
          filter: {
            fields: { type: { eq: "post" } }
            frontmatter: { published: { eq: true } }
          }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          ...PostsEdges
        }
        published: allMdx(
          filter: {
            fields: { type: { eq: "post" } }
            frontmatter: { published: { eq: true } }
          }
        ) {
          ...AreaGroup
        }
        future: allMdx(
          filter: {
            fields: { type: { eq: "post" } }
            frontmatter: { published: { eq: false } }
          }
        ) {
          ...AreaGroup
        }
      }
    `
  )

  return data
}
