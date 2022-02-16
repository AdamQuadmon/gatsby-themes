import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const usePlaces = (language) => {
  const data = useStaticQuery(
    graphql`
      query PlacesQuery {
        restaurants: allPage(
          filter: { type: { eq: "restaurant" }, published: { eq: true } }
        ) {
          ...PageEdges
        }
        shops: allPage(
          filter: { type: { eq: "shop" }, published: { eq: true } }
        ) {
          ...PageEdges
        }
        towns: allPage(
          filter: { type: { eq: "town" }, published: { eq: true } }
        ) {
          ...PageEdges
        }
      }
    `
  )

  const { restaurants, shops, towns } = data

  return {
    restaurants: edgesByLanguage(restaurants, language),
    shops: edgesByLanguage(shops, language),
    towns: edgesByLanguage(towns, language),
  }
}
