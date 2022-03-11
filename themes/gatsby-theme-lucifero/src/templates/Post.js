import React from 'react'
import { graphql } from 'gatsby'
import { Box, useStyleConfig } from '@chakra-ui/react'

import Layout from '../components/LayoutContainer'
import PageContent from '../components/Content/PageContent'
import TableOfContents from '../components/Blog/Toc'

export default function PostTemplate(pageData) {
  const {
    data: { page },
  } = pageData
  const { mdx, hasToc } = page
  const displayToc = hasToc && !!mdx?.tableOfContents?.items
  const variant = displayToc ? 'toc' : null
  const styles = useStyleConfig('PostPage', { variant })
  return (
    <Layout pageData={pageData}>
      <Box __css={styles}>
        {displayToc && (
          <Box className="toc">
            <TableOfContents tableOfContents={mdx.tableOfContents} />
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

export const pageQuery = graphql`
  query PostQuery($id: String!, $i18nPath: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: page(id: { eq: $id }) {
      ...PageNode
    }
    alternatePages: allPage(
      filter: { i18nPath: { eq: $i18nPath }, language: { ne: $language } }
    ) {
      ...PageAlternateNodes
    }
  }
`
