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
export const coverFieldsFragment = graphql`
  fragment CoverFields on MdxFrontmatter {
    cover {
      publicURL
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export const mdxOgImageFragment = graphql`
  fragment MdxOgImage on MdxFrontmatter {
    ogImage: cover {
      publicURL
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export const sectionFrontmatterFragment = graphql`
  fragment SectionFrontmatter on Mdx {
    frontmatter {
      title
      description
    }
  }
`

export const mdxNodeFragment = graphql`
  fragment MdxNode on Mdx {
    id
    body
    excerpt
    fields {
      langKey
      type
    }
    frontmatter {
      slug
      order
      title
      noCover
      navPage
      ...CoverFields
    }
  }
`

export const navPageNodeFragment = graphql`
  fragment NavPageNode on Mdx {
    fields {
      type
      langKey
    }
    frontmatter {
      slug
      title
      order
      navPage
    }
  }
`

export const postNodeFragment = graphql`
  fragment PostNode on Mdx {
    id
    body
    fields {
      slug
      area
      topic
      langKey
    }
    frontmatter {
      title
      description
      date(formatString: "MMM DD, YYYY")
      tags
      noCover
      ...CoverFields
    }
  }
`

export const areaFragment = graphql`
  fragment AreaGroup on MdxConnection {
    totalCount
    group(field: fields___area) {
      fieldValue
      totalCount
    }
  }
`
// TODO: Sorting on fields that need arguments to resolve is deprecated
// move topic and area data in md and filter by it
export const topicFragment = graphql`
  fragment TopicGroup on MdxConnection {
    totalCount
    group(field: fields___topic) {
      fieldValue
      totalCount
    }
  }
`

export const mdxEdgesFragment = graphql`
  fragment MdxEdges on MdxConnection {
    edges {
      node {
        ...MdxNode
      }
    }
  }
`

export const navPagesEdgesFragment = graphql`
  fragment NavPagesEdges on MdxConnection {
    edges {
      node {
        ...NavPageNode
      }
    }
  }
`

export const postsEdgesFragment = graphql`
  fragment PostsEdges on MdxConnection {
    totalCount
    edges {
      node {
        ...PostNode
      }
    }
  }
`
