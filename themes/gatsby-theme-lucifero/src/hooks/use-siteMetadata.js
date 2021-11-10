import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            author
            keywords
            siteUrl
            ogImage
            organization {
              name
              subTitle
              address1
              address2
              address2short
              iva
              copyright
              cellNumber
              url
              logo
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
