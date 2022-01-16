import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useHomeAreas = (language) => {
  const data = useStaticQuery(
    graphql`
      query {
        section: blogPost(type: { eq: "blog" }) {
          ...PostNode
        }
        sections: allBlogPost(
          filter: { type: { eq: "area" } }
          sort: { fields: date, order: ASC }
        ) {
          #

          ...PostsEdges
        }
        latest: allBlogPost(
          filter: { type: { eq: "post" }, published: { eq: true } }
          sort: { fields: date, order: DESC }
        ) {
          ...PostsEdges
        }
        published: allBlogPost(
          filter: { type: { eq: "post" }, published: { eq: true } }
        ) {
          ...AreaGroup
        }
        future: allBlogPost(
          filter: { type: { eq: "post" }, published: { eq: false } }
        ) {
          ...AreaGroup
        }
      }
    `
  )

  const { section, sections, latest, published, future } = data

  return {
    section: edgesByLanguage(section, language),
    sections: edgesByLanguage(sections, language),
    latest: edgesByLanguage(latest, language),
    published: edgesByLanguage(published, language),
    future: edgesByLanguage(future, language),
  }
}
