import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useNavPages = (language) => {
  const data = useStaticQuery(
    graphql`
      # NOTE: don't use PageQuery or PagesQuery as these are reserved
      query NavPagesQuery {
        allPage(
          filter: { type: { eq: "page" }, navPage: { eq: true } }
          sort: { fields: [order] }
        ) {
          ...BasePagesEdges
        }
      }
    `
  )

  const { allPage } = data

  return edgesByLanguage(allPage, language)
}
