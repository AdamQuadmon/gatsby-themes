import { useStaticQuery, graphql } from 'gatsby'

export const useMap = () => {
  const data = useStaticQuery(
    graphql`
      query MapQuery {
        site {
          siteMetadata {
            maps {
              src
              address
              lat
              lng
              zoom
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata.maps
}
