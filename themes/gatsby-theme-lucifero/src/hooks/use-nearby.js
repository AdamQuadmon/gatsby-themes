import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useNearby = (language) => {
  const data = useStaticQuery(
    graphql`
      query NearbyQuery {
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
        places: allPage(
          filter: { type: { eq: "place" }, published: { eq: true } }
          sort: { fields: [order] }
        ) {
          ...PageEdges
        }
      }
    `
  )

  const { restaurants, shops, places } = data

  return {
    restaurants: edgesByLanguage(restaurants, language),
    shops: edgesByLanguage(shops, language),
    places: edgesByLanguage(places, language),
  }
}
