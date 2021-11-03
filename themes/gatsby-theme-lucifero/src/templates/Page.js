import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import PageContent from '../components/PageContent'

export default function PageTemplate({ data }) {
  const { mdx } = data

  return (
    <Layout seoNode={mdx}>
      <PageContent node={mdx} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    mdx: mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        slug
        title
        description
        order
        category
        tags
        noCover
        coverAlt
        cover {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 1080
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`
