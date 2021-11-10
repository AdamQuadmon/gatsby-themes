// https://www.wesleylhandy.net/blog/seo-accessibility-first-gatsby.html
// https://www.iamtimsmith.com/blog/creating-a-better-seo-component-for-gatsby/
import React from 'react'
import { Helmet } from 'gatsby-plugin-react-i18next'
import SchemaOrg from './SchemaOrg'

import { useSeoValues } from '../hooks/use-seoValues'

const Seo = (props) => {
  const {
    title,
    titleTemplate,
    description,
    keywords,
    canonical,
    image,
    imagePath,
    iconPath,
    type,
    datePublished,
    otherMeta,
    isBlogPost,
    siteUrl,
    author,
    organization,
    isHome,
  } = useSeoValues(props)

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
          { rel: 'shortcut icon', type: 'image/png', href: iconPath },
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
            content: author,
          },
        ]
          // TODO: check if image or imagePath
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
        author={author}
        organization={organization}
        defaultTitle={title}
      />
    </React.Fragment>
  )
}

export default Seo
