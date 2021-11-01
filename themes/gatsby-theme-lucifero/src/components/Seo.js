// https://www.wesleylhandy.net/blog/seo-accessibility-first-gatsby.html
// https://www.iamtimsmith.com/blog/creating-a-better-seo-component-for-gatsby/
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'gatsby-plugin-react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
// import { getImage } from 'gatsby-plugin-image'

// import { useLocation } from '@reach/router'
import SchemaOrg from './SchemaOrg'
import favicon from '../images/lucifero-logo.png'

const Seo = ({
  isHome,
  pathname,
  node,
  title: metaTitle,
  description: metaDescription,
  keywords: metaKeywords,
  image: metaImage,
  meta,
  isBlogPost,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
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
              url
              logo
            }
            socials {
              facebook
              instagram
            }
          }
        }
      }
    `
  )

  const seo = site.siteMetadata
  const postMeta = (node && node.frontmatter) || {}

  const siteUrl = seo.siteUrl

  const title = metaTitle || postMeta.title || seo.title
  const description = metaDescription || postMeta.description || seo.description

  const titleTemplate = isHome ? `%s` : `%s | ${seo.titleTemplate}`

  const keywords = metaKeywords || postMeta.keywords || seo.keywords

  const postPath = pathname || postMeta.slug

  const canonical = postPath && `${siteUrl}${postPath}`

  // TODO: check if cover works as ogImage
  const image = metaImage || postMeta.cover || seo.ogImage
  if (!image) {
    console.log(`missing image for ${canonical}`)
  }

  const imagePath = `${siteUrl}/og-image/${image}`

  const type = canonical !== siteUrl ? 'article' : 'website'
  const datePublished = postMeta.datePublished ? postMeta.datePublished : false

  const otherMeta = meta || []

  if (!canonical && !isHome) {
    console.log(
      'missing canonical url, if this is the Home Page please add the isHome flag, otherwise check your pathname or node.frontmatter.slug'
    )
  }

  return (
    <React.Fragment>
      <Helmet
        title={title}
        titleTemplate={titleTemplate}
        link={[
          { rel: 'shortcut icon', type: 'image/png', href: favicon },
          // { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16x16 },
          // { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32x32 },
        ].concat(canonical ? [{ rel: 'canonical', href: canonical }] : [])}
        meta={[
          {
            name: `description`,
            content: description,
          },
          {
            property: `og:description`,
            content: description,
          },
          {
            property: `twitter:description`,
            content: description,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `twitter:title`,
            content: title,
          },
          {
            property: `og:url`,
            content: canonical || siteUrl,
          },
          {
            property: `og:type`,
            content: type,
          },
          {
            property: `twitter:creator`,
            content: seo.author,
          },
        ]
          .concat(
            imagePath
              ? [
                  {
                    name: `image`,
                    content: imagePath,
                  },
                  {
                    property: `og:image`,
                    content: imagePath,
                  },
                  {
                    property: `twitter:image`,
                    content: imagePath,
                  },
                  {
                    property: 'og:image:width',
                    content: 1080,
                  },
                  {
                    property: 'og:image:height',
                    content: 1080,
                  },
                  {
                    property: 'og:image:alt',
                    content: description,
                  },
                  {
                    property: 'twitter:image:alt',
                    content: description,
                  },
                  {
                    property: `twitter:card`,
                    content: `summary_large_image`,
                  },
                ]
              : [
                  {
                    name: 'twitter:card',
                    content: 'summary',
                  },
                ]
          )
          .concat(
            keywords.length > 0
              ? {
                  name: 'keywords',
                  content: keywords.join(', '),
                }
              : []
          )
          .concat(otherMeta)}
      />

      <SchemaOrg
        isBlogPost={isBlogPost}
        url={canonical}
        title={title}
        image={image}
        description={description}
        datePublished={datePublished}
        canonicalUrl={siteUrl}
        author={seo.author}
        organization={seo.organization}
        defaultTitle={seo.title}
      />
    </React.Fragment>
  )
}

Seo.propTypes = {
  isHome: PropTypes.bool,
  pathname: PropTypes.string,
  node: PropTypes.shape({
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }),
  otherMeta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  // image: PropTypes.shape({
  //   src: PropTypes.string.isRequired,
  //   height: PropTypes.number.isRequired,
  //   width: PropTypes.number.isRequired,
  // }),
  keywords: PropTypes.arrayOf(PropTypes.string),
  isBlogPost: PropTypes.bool,
}

// Seo.defaultProps = {
//   otherMeta: [],
//   description: '',
//   keywords: [],
//   isBlogPost: false,
//   node: {},
//   image: null,
// }

export default Seo
