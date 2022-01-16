import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useAreas = (language) => {
  const data = useStaticQuery(
    graphql`
      query AreasQuery {
        allBlogPost(
          filter: { type: { eq: "area" } }
          sort: { fields: date, order: ASC }
        ) {
          ...PostsEdges
        }
      }
    `
  )

  const { allBlogPost } = data

  return edgesByLanguage(allBlogPost, language)
}
