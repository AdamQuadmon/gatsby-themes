// https://www.wesleylhandy.net/blog/seo-accessibility-first-gatsby.html
// https://www.iamtimsmith.com/blog/creating-a-better-seo-component-for-gatsby/
import React from 'react'
import moment from 'moment'
import { Helmet } from 'gatsby-plugin-react-i18next'
import { NormalizerIt, TokenizerIt, StopwordsIt } from '@nlpjs/lang-it'

import { useSiteMetadata } from '../../hooks/use-siteMetadata'

import SchemaOrg from './SchemaOrg'

const Seo = ({ page, crumbs }) => {
  const site = useSiteMetadata()
  // TODO: improve default using crumbs
  page = page || getDefaultPage(site)
  const pageMeta = withDefaultMeta(site, page)

  const link = getLink(site, pageMeta)
  const metaTags = getBaseMeta(pageMeta)
    .concat(getOgMeta(pageMeta))
    .concat(getTwitterMeta(pageMeta))

  const { title, titleTemplate } = pageMeta

  return (
    <React.Fragment>
      <Helmet
        title={title}
        titleTemplate={titleTemplate}
        link={link}
        meta={metaTags}
      />

      <SchemaOrg site={site} page={page} crumbs={crumbs} />
    </React.Fragment>
  )
}

export default Seo

// name is the minimum needed page param
const withDefaultMeta = (site, page) => {
  let { title, titleTemplate } = site
  const {
    type,
    language,
    author,
    description,
    headline,
    name,
    tags,
    datePublished,
    dateModified,
    image,
    mdx,
  } = page
  const body = mdx ? mdx.body : description || name

  if (type === 'website' || !name) {
    titleTemplate = '%s'
  } else {
    title = headline || name
  }

  const keywords = getKeywords(tags, body, site.keywords)

  return {
    title,
    titleTemplate,
    body: body || title,
    canonical: getCanonical(site, page),
    author: author || site.author,
    description: description || site.description,
    image: image || site.image,
    language: language || site.language,
    keywords,
    datePublished,
    dateModified,
  }
}

const getDefaultPage = (site) => {
  const {
    author,
    dateCreated,
    description,
    keywords,
    language,
    mainKeyword,
    ogImage,
    shortTitle,
    siteUrl,
    title,
  } = site
  const type = 'website'
  const dateModified = moment().toISOString()

  return {
    type: 'website',
    published: true,
    area: null,
    topic: null,
    i18nPath: '/',
    slug: shortTitle,
    type,
    description,
    image: ogImage,
    name: title,
    tags: keywords || [],
    abstract: description,
    author,
    contentLocation: null,
    dateCreated,
    dateModified,
    datePublished: dateCreated,
    genre: mainKeyword,
    headline: title,
    language,
    order: 1,
    navPage: false,
    noCover: true,
    url: siteUrl,
    mdx: { body: '' },
  }
}

const getCanonical = (site, page) => {
  const { siteUrl } = site
  const { url, slug, type } = page
  if (url) {
    return url
  }

  if (slug) {
    return `${siteUrl}${slug}`
  }

  if (type !== 'website') {
    console.log('page has no meta', page)
  }
  return siteUrl
}

const getLink = (site, pageMeta) => {
  const { icon } = site
  const { canonical } = pageMeta

  const link = [
    { rel: 'shortcut icon', type: 'image/png', href: icon },
    // { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16x16 },
    // { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32x32 },
  ]
  if (canonical) {
    link.concat([{ rel: 'canonical', href: canonical }])
  }
  return link
}

const getBaseMeta = (pageMeta) => {
  const { keywords, author, datePublished, dateModified, description, image } =
    pageMeta

  const metaTags = [
    {
      name: `description`,
      content: description,
    },
  ]

  if (image) {
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

  if (keywords.length > 0) {
    metaTags.concat([
      {
        name: 'keywords',
        content: keywords.join(', '),
      },
    ])
  }

  return metaTags
}
const getTwitterMeta = (pageMeta) => {
  const { title, author, description, image } = pageMeta
  const metaTags = [
    {
      property: `twitter:description`,
      content: description,
    },
    {
      property: `twitter:title`,
      content: title,
    },

    {
      property: `twitter:creator`,
      content: author,
    },
  ].concat(
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
const getOgMeta = (pageMeta) => {
  const { title, language, description, image, slug, canonical } = pageMeta
  // - use types: https://ogp.me/#types
  // - mind that not all tipes are suited for Google Structured Data
  // - use this to render diferent schemas
  const ogType = slug && slug !== '/' ? 'article' : 'website'

  const metaTags = [
    {
      property: `og:url`,
      content: canonical,
    },
    {
      property: `og:type`,
      content: ogType,
    },
    {
      property: `og:description`,
      content: description,
    },
    // TODO use different site name
    {
      property: `og:site_name`,
      content: title,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:locale`,
      content: language,
    },
  ]
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
// TODO: this should be language specific
export const getKeywords = (keywords, body, siteKeywords) => {
  if (!keywords && body) {
    const normalizer = new NormalizerIt()
    const tokenizer = new TokenizerIt()
    const stopwords = new StopwordsIt()
    const normalized = normalizer.normalize(body)
    const tokenized = tokenizer.tokenize(normalized)
    keywords = stopwords.removeStopwords(tokenized)
  }

  return keywords || siteKeywords
}
