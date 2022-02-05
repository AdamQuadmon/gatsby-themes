import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            alternateName
            author
            copyright
            dateCreated
            description
            keywords
            icon
            language
            mainKeyword
            ogImage
            shortTitle
            siteUrl
            title
            titleTemplate
            organization {
              type
              name
              description
              url
              legalName
              logo
              telephone
              hasMap
              slogan
              vatID
              alternateName
              address {
                streetAddress
                addressLocality
                addressRegion
                postalCode
                addressCountry
              }
              geo {
                latitude
                longitude
              }
            }
            socials {
              facebook
              instagram
              whatsapp
            }
            config {
              imgix {
                source
              }
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata
}
