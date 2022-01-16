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
export const placesEdgesFragment = graphql`
  fragment PlacesEdges on PageConnection {
    edges {
      node {
        ...BasePageNode
        ...ContentPageNode
        ...PlacesMeta
      }
    }
  }
`
export const pageEdgesFragment = graphql`
  fragment PageEdges on PageConnection {
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
    ...ContentPageNode
    ...DataPageNode
    ...PageMeta
  }
`
export const basePageNodeFragment = graphql`
  fragment BasePageNode on Page {
    lang
    slug
    order
  }
`
export const contentPageNodeFragment = graphql`
  fragment ContentPageNode on Page {
    excerpt
    body
  }
`
export const dataPageNodeFragment = graphql`
  fragment DataPageNode on Page {
    date(formatString: "MMM DD, YYYY")
    updatedAt
    timeToRead
    tableOfContents
  }
`
export const pageMetaFragment = graphql`
  fragment PageMeta on Page {
    meta {
      title
      description
      order
      ...CoverFields
    }
  }
`

export const placesMetaFragment = graphql`
  fragment PlacesMeta on Page {
    meta {
      title
      description
      order
      address
      city
      cap
      region
      places
      ...CoverFields
    }
  }
`
export const navPagesEdgesFragment = graphql`
  fragment NavPagesEdges on BlogPostConnection {
    edges {
      node {
        ...BasePageNode
      }
    }
  }
`
export const postsEdgesFragment = graphql`
  fragment PostsEdges on BlogPostConnection {
    totalCount
    edges {
      node {
        ...PostNode
      }
    }
  }
`
export const areaFragment = graphql`
  fragment AreaGroup on BlogPostConnection {
    totalCount
    group(field: area) {
      fieldValue
      totalCount
    }
  }
`
export const topicFragment = graphql`
  fragment TopicGroup on BlogPostConnection {
    totalCount
    group(field: topic) {
      fieldValue
      totalCount
    }
  }
`
export const postNodeFragment = graphql`
  fragment PostNode on BlogPost {
    ...BasePageNode
    ...ContentPageNode
    ...DataPageNode
    type
    area
    topic
    tags {
      name
    }
    ...PageMeta
  }
`

export const pagesDataEdgesFragment = graphql`
  fragment PagesDataEdges on PagesCsvConnection {
    edges {
      node {
        slug
        title
        published
        folder
        cover
      }
    }
  }
`
export const pageDataNodeFragment = graphql`
  fragment PageDataNode on PagesCsv {
    file
    slug
    title
    description
    published
    order
    navPage
    ...CoverFields
    gallery
    pax
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

export const coverFieldsFragment = graphql`
  fragment CoverFields on PagesCsv {
    cover
    folder
    noCover
  }
`
