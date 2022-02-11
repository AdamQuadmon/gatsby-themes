import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            defaultLanguage
            languages
            siteUrl
            website {
              author
              copyright
              dateCreated
              icon
              ogImage
              translations {
                language
                titleTemplate
                title
                shortTitle
                alternateName
                description
                url
                mainKeyword
                keywords
              }
            }
            organization {
              type
              name
              description
              url
              legalName
              logo
              telephone
              mapUrl
              slogan
              vatID
              image
              alternateName
              socials {
                facebook
                instagram
                whatsapp
              }
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
              meta {
                name
                value
              }
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata
}
