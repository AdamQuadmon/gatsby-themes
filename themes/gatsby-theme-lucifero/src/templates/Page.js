import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import PageContent from '../components/Content/PageContent'

export default function PageTemplate(pageData) {
  const {
    data: { page },
  } = pageData

  return (
    <Layout pageData={pageData}>
      <PageContent className="speakable-wrapper" page={page} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String!, $i18nPath: String!, $language: String!) {
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
