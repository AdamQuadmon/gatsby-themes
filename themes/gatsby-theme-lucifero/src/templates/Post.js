import React from 'react'
import { graphql } from 'gatsby'

import { Box, useStyleConfig } from '@chakra-ui/react'

import Layout from '../components/LayoutContainer'
import Breadcrumbs from '../components/Breadcrumbs'
import PageContent from '../components/Content/PageContent'
import TableOfContents from '../components/Blog/toc'

export default function PostTemplate({ data, pageContext }) {
  const { post } = data
  const { tableOfContents } = post
  const { breadcrumb /*, previous, next*/ } = pageContext
  const hasToc = !!tableOfContents?.items
  const variant = hasToc ? 'toc' : null
  const styles = useStyleConfig('PostPage', { variant })
  return (
    <Layout page={post}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Box __css={styles}>
        {hasToc && (
          <Box className="toc">
            <TableOfContents tableOfContents={tableOfContents} />
          </Box>
        )}
        <PageContent className="post" node={post} variant="blog" />
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostQuery($id: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    post: blogPost(id: { eq: $id }) {
      ...PostNode
    }
  }
`
