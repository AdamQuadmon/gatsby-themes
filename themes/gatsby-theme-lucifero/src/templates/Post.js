import React from 'react'
import { graphql } from 'gatsby'

import { Box, useStyleConfig } from '@chakra-ui/react'

import Layout from '../components/LayoutContainer'
import Breadcrumbs from '../components/Breadcrumbs'
import PageContent from '../components/Content/PageContent'
import TableOfContents from '../components/Blog/toc'

export default function PostTemplate({ data, pageContext }) {
  const { page } = data
  const { tableOfContents } = page
  const { breadcrumb /*, previous, next*/ } = pageContext
  const hasToc = !!tableOfContents?.items
  const variant = hasToc ? 'toc' : null
  const styles = useStyleConfig('PostPage', { variant })
  return (
    <Layout page={page} crumbs={breadcrumb.crumbs}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Box __css={styles}>
        {hasToc && (
          <Box className="toc">
            <TableOfContents tableOfContents={tableOfContents} />
          </Box>
        )}
        <PageContent
          className="speakable-wrapper post"
          page={page}
          variant="blog"
        />
      </Box>
    </Layout>
  )
}
/*
TODO: implement
$prev: String!
$next: String!
prev: page(id: { eq: $prev }) {
  ...PageNode
}
next: page(id: { eq: $next }) {
  ...PageNode
}
*/
export const pageQuery = graphql`
  query PostQuery($id: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: page(id: { eq: $id }) {
      ...PageNode
    }
  }
`
