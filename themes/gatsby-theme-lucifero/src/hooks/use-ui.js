import { useStaticQuery, graphql } from 'gatsby'

export const useUi = () => {
  const data = useStaticQuery(
    graphql`
      query SiteUiQuery {
        site {
          siteMetadata {
            ui {
              home
              imgix
              embedWidth
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata.ui
}
