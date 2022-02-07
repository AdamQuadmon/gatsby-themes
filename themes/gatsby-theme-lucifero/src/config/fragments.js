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
    type
    published
    order
    area
    topic
    language
    i18nPath
    slug
    # generated
    url
    contentUrl
    imagePath
    image {
      ...ImageCsvMinNode
    }
    # date
    dateCreated
    dateModified
    datePublished
    # meta
    name
    headline
    description
    abstract
    author
    contentLocation
    genre
    tags
    # MetaCsv
    navPage
    noCover
  }
`
export const metaCsvNodeFragment = graphql`
  fragment MetaCsvNode on MetaCsv {
    published
    order
    area
    topic
    language
    i18nPath
    slug
    description
    name
    tags
    abstract
    author
    contentLocation
    dateCreated
    dateModified
    datePublished
    genre
    headline
    type
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
    description
    name
    tags
    abstract
    author
    contentLocation
    dateCreated
    dateModified
    datePublished
    genre
    headline
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
    description
    name
    width
    height
    # maybe not needed
    order
    slug
    area
    topic
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
    description
    name
    tags
    abstract
    author
    contentLocation
    dateCreated
    dateModified
    datePublished
    genre
    headline
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
        ...ImageCsvNode
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
