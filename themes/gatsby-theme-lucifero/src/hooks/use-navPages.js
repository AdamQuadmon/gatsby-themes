import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useNavPages = (language) => {
  const data = useStaticQuery(
    graphql`
      # NOTE: don't use PageQuery or PagesQuery as these are reserved
      query NavPagesQuery {
        allBlogPost(
          filter: { type: { eq: "page" }, meta: { navPage: { eq: true } } }
          sort: { fields: order }
        ) {
          ...NavPagesEdges
        }
      }
    `
  )

  const { allBlogPost } = data

  return edgesByLanguage(allBlogPost, language)
}
