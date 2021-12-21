import { useStaticQuery, graphql } from 'gatsby'

export const useUi = () => {
  const data = useStaticQuery(
    graphql`
      query UiQuery {
        site {
          siteMetadata {
            config {
              ui {
                home
              }
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata.config.ui
}
