import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useAreas = (language) => {
  const data = useStaticQuery(
    graphql`
      query AreasQuery {
        allPage(
          filter: { type: { eq: "area" } }
          sort: { fields: timestamp, order: ASC }
        ) {
          ...PageEdges
        }
      }
    `
  )

  const { allPage } = data

  return edgesByLanguage(allPage, language)
}
