import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  useStyleConfig,
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../components/LayoutContainer'
import Seo from '../components/Seo'

// Provide common components here
const shortcodes = { GatsbyLink, Link }

export default function PageTemplate({ data, variant }) {
  const styles = useStyleConfig('Page', { variant })
  const { mdx } = data
  const { frontmatter, body } = mdx
  const { cover, title, noCover } = frontmatter
  const image = getImage(cover)
  const boxClass = !noCover ? 'has_cover' : 'no_cover'

  return (
    <Layout>
      <Seo node={mdx} />
      <Box __css={styles}>
        <Heading as="h1">{title}</Heading>
        <Stack className={boxClass} direction={['column', '', 'row']}>
          {!noCover && (
            <Image
              className="page_image"
              as={GatsbyImage}
              image={image}
              alt={title}
            />
          )}
          <Box className="page_content">
            <MDXProvider components={shortcodes}>
              <MDXRenderer frontmatter={frontmatter}>{body}</MDXRenderer>
            </MDXProvider>
          </Box>
        </Stack>
      </Box>
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
