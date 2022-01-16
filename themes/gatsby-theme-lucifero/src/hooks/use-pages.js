import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const usePages = (language) => {
  const data = useStaticQuery(
    graphql`
      # NOTE: don't use PageQuery or PagesQuery as these are reserved
      query BlogPagesQuery {
        allPage(filter: { type: { eq: "page" } }, sort: { fields: order }) {
          ...PageEdges
        }
      }
    `
  )

  const { allPage } = data

  return edgesByLanguage(allPage, language)
}
