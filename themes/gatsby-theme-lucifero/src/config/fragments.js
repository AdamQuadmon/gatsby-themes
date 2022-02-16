import { graphql } from 'gatsby'

export const localeEdgesFragment = graphql`
  fragment LocaleEdges on LocaleConnection {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
`
// used by pageNav (name and slug)
export const basePageEdgesFragment = graphql`
  fragment BasePageEdges on PageConnection {
    edges {
      node {
        ...BasePageNode
      }
    }
  }
`
export const pageAlternateNodesFragment = graphql`
  fragment PageAlternateNodes on PageConnection {
    nodes {
      slug
      description
      headline
      language
    }
  }
`

export const pageEdgesFragment = graphql`
  fragment PageEdges on PageConnection {
    totalCount
    edges {
      node {
        ...PageNode
      }
    }
  }
`
export const pageNodeFragment = graphql`
  fragment PageNode on Page {
    ...BasePageNode
    ...PageMeta
    mdx {
      ...MdxMetaNode
    }
  }
`

export const basePageNodeFragment = graphql`
  fragment BasePageNode on Page {
    type
    slug
    headline
    language
    tags
  }
`
export const pageMetaFragment = graphql`
  fragment PageMeta on Page {
    published
    order
    type
    area
    topic
    language
    i18nPath
    slug
    # meta
    name
    headline
    alternativeHeadline
    description
    tags
    abstract
    location {
      ...PlaceCsvNode
    }
    award
    discussionUrl
    dateCreated
    dateModified
    datePublished
    author
    navPage
    noCover
    # generated
    url
    image {
      ...ImageCsvMinNode
    }
    imagePath
    contentUrl
  }
`
export const metaCsvNodeFragment = graphql`
  fragment MetaCsvNode on MetaCsv {
    published
    order
    type
    area
    topic
    language
    i18nPath
    slug
    name
    headline
    alternativeHeadline
    description
    tags
    abstract
    location
    award
    discussionUrl
    dateCreated
    dateModified
    datePublished
    author
    image
    navPage
    noCover
    mdx {
      ...MdxMetaNode
    }
  }
`
export const contentPageNodeFragment = graphql`
  fragment MdxMetaNode on Mdx {
    excerpt
    body
    timeToRead
    tableOfContents
  }
`
export const albumDataNodeFragment = graphql`
  fragment AlbumCsvNode on AlbumCsv {
    published
    order
    area
    topic
    language
    i18nPath
    slug
    name
    headline
    alternativeHeadline
    description
    tags
    abstract
    location
    award
    discussionUrl
    dateCreated
    dateModified
    datePublished
    author
    pageUrl
    pageLabel
    imagesLength
    image {
      ...ImageCsvMinNode
    }
  }
`

// Min params needed for Image rendering
export const imageCsvMinNodeFragment = graphql`
  fragment ImageCsvMinNode on ImageCsv {
    contentUrl
    name
    description
    width
    height
    area
    topic
    zone
    order
    subject
    # maybe not needed
    slug
    headline
  }
`

export const imageDataNodeFragment = graphql`
  fragment ImageCsvNode on ImageCsv {
    published
    order
    area
    topic
    language
    i18nPath
    slug
    name
    headline
    alternativeHeadline
    description
    tags
    abstract
    location
    award
    discussionUrl
    dateCreated
    dateModified
    datePublished
    author
    # additional fields
    folder
    file
    imagePath
    contentUrl
    width
    height
    account
    domain
    zone
    subject
    season
    month
    daytime
  }
`

export const imagesDataEdgesFragment = graphql`
  fragment ImageCsvEdges on ImageCsvConnection {
    edges {
      node {
        ...ImageCsvMinNode
      }
    }
  }
`

export const albumsDataEdgesFragment = graphql`
  fragment AlbumCsvEdges on AlbumCsvConnection {
    edges {
      node {
        ...AlbumCsvNode
      }
    }
  }
`

export const placeCsvNodeFragment = graphql`
  fragment PlaceCsvNode on PlaceCsv {
    published
    order
    type
    itineraries
    slug
    region
    city
    cap
    address
    cell
    places
    facebook
    instagram
    web
  }
`
