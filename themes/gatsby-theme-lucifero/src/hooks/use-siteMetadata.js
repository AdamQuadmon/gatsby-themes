import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            organization {
              name
              subTitle
              address1
              address2
              address2short
              iva
              copyright
              cellNumber
            }
            socials {
              facebook
              instagram
              whatsapp
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata
}
