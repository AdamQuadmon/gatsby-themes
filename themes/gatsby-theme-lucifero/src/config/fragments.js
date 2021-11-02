import { graphql } from 'gatsby'

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
export const mdxFrontmatterFragment = graphql`
  fragment MdxFrontmatter on Mdx {
    frontmatter {
      slug
      order
      title
      ...CoverFields
    }
  }
`

export const placesFrontmatterFragment = graphql`
  fragment PlacesFrontmatter on Mdx {
    frontmatter {
      slug
      order
      title
      address
      city
      cap
      region
      places
      noCover
      # descriptions {
      #   it
      #   en
      #   es
      # }
      ...CoverFields
    }
  }
`
export const mdxEdgesFragment = graphql`
  fragment MdxEdges on MdxConnection {
    edges {
      node {
        excerpt
        body
        fields {
          langKey
        }
        ...MdxFrontmatter
      }
    }
  }
`

export const placesEdgesFragment = graphql`
  fragment PlacesEdges on MdxConnection {
    edges {
      node {
        excerpt
        body
        fields {
          langKey
        }
        ...PlacesFrontmatter
      }
    }
  }
`
