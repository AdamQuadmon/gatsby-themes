import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import PageContent from '../components/PageContent'

export default function PageTemplate({ data }) {
  const { page } = data

  return (
    <Layout seoNode={page}>
      <PageContent node={page} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: mdx(id: { eq: $id }) {
      ...MdxNode
    }
  }
`
