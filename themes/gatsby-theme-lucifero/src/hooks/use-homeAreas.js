import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useHomeAreas = (language) => {
  const data = useStaticQuery(
    graphql`
      query {
        sections: allPage(
          filter: { type: { eq: "area" } }
          sort: { fields: timestamp, order: ASC }
        ) {
          ...PageEdges
        }
        latest: allPage(
          filter: { type: { eq: "post" }, published: { eq: true } }
          sort: { fields: timestamp, order: ASC }
        ) {
          ...PageEdges
        }
        published: allPage(
          filter: { type: { eq: "post" }, published: { eq: true } }
        ) {
          ...PageEdges
        }
        future: allPage(
          filter: { type: { eq: "post" }, published: { eq: false } }
        ) {
          ...BasePagesEdges
        }
      }
    `
  )

  const { sections, latest, published, future } = data

  return {
    sections: edgesByLanguage(sections, language),
    latest: edgesByLanguage(latest, language),
    published: edgesByLanguage(published, language),
    future: edgesByLanguage(future, language),
  }
}
