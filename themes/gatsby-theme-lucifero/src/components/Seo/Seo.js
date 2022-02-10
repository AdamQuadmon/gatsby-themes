// https://www.wesleylhandy.net/blog/seo-accessibility-first-gatsby.html
// https://www.iamtimsmith.com/blog/creating-a-better-seo-component-for-gatsby/
import React from 'react'
import { Helmet } from 'gatsby-plugin-react-i18next'

import SchemaOrg from './SchemaOrg'

const Seo = ({ site, page, crumbs }) => {
  const link = getLink(site, page)
  const metaTags = getBaseMeta(page)
    .concat(getOgMeta(site, page))
    .concat(getTwitterMeta(page))

  const { headline } = page

  const titleTemplate = site.website.titleTemplate

  return (
    <React.Fragment>
      <Helmet
        title={headline}
        titleTemplate={titleTemplate}
        link={link}
        meta={metaTags}
      />
      <SchemaOrg site={site} page={page} crumbs={crumbs} />
    </React.Fragment>
  )
}

export default Seo

const getLink = (site, page) => {
  const {
    website: { icon },
  } = site
  const { url } = page

  const link = [
    { rel: 'shortcut icon', type: 'image/png', href: icon },
    // { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16x16 },
    // { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32x32 },
  ]
  if (url) {
    link.concat([{ rel: 'canonical', href: url }])
  }
  return link
}

const getBaseMeta = (page) => {
  const { tags, author, datePublished, dateModified, description, image } = page

  const metaTags = [
    {
      name: `description`,
      content: description,
    },
  ]

  if (image) {
    // TODO: improve passing ImageCsv data
    metaTags.concat([
      {
        name: `image`,
        content: image,
      },
    ])
  }

  if (datePublished) {
    metaTags.concat([
      {
        name: 'article:published_time',
        content: datePublished,
      },
    ])
  }

  if (dateModified) {
    metaTags.concat([
      {
        name: 'article:modified_time',
        content: dateModified,
      },
    ])
  }

  if (author) {
    metaTags.concat([
      {
        name: 'article:author',
        content: author,
      },
    ])
  }

  if (tags.length > 0) {
    metaTags.concat([
      {
        name: 'keywords',
        content: tags.join(', '),
      },
    ])
  }

  return metaTags
}
const getTwitterMeta = (page) => {
  const { headline, author, description, image } = page
  const metaTags = [
    {
      property: `twitter:description`,
      content: description,
    },
    {
      property: `twitter:title`,
      content: headline,
    },

    {
      property: `twitter:creator`,
      content: author,
    },
  ].concat(
    // TODO: improve passing ImageCsv data
    image
      ? [
          {
            property: `twitter:image`,
            content: image,
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
  return metaTags
}

// https://neilpatel.com/blog/open-graph-meta-tags/
const getOgMeta = (site, page) => {
  const { title } = site.website
  const { type, headline, language, description, image, url } = page
  // - use types: https://ogp.me/#types
  // - mind that not all tipes are suited for Google Structured Data
  // - use this to render diferent schemas
  const ogType = type === 'website' ? type : 'article'

  const metaTags = [
    {
      property: `og:url`,
      content: url,
    },
    {
      property: `og:type`,
      content: ogType,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:site_name`,
      content: title,
    },
    {
      property: `og:title`,
      content: headline,
    },
    {
      property: `og:locale`,
      content: language,
    },
  ]
  // TODO: improve passing ImageCsv data
  if (image) {
    metaTags.concat([
      {
        property: `og:image`,
        content: image,
      },
      {
        property: 'og:image:width',
        content: 1200,
      },
      {
        property: 'og:image:height',
        content: 630,
      },
      {
        property: 'og:image:alt',
        content: description,
      },
    ])
  }
  return metaTags
}
