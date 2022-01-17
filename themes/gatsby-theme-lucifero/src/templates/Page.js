import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import PageContent from '../components/Content/PageContent'
import Breadcrumbs from '../components/Breadcrumbs'

export default function PageTemplate({ data, pageContext }) {
  const { page } = data
  const { breadcrumb /*, previous, next*/ } = pageContext

  return (
    <Layout page={page}>
      <Breadcrumbs breadcrumb={breadcrumb} removeStart />
      <PageContent page={page} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: page(id: { eq: $id }) {
      ...PageNode
    }
  }
`
