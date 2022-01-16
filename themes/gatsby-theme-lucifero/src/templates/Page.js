import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import PageContent from '../components/PageContent'
import Breadcrumbs from '../components/Breadcrumbs'

export default function PageTemplate({ data, pageContext }) {
  const { page } = data
  const { breadcrumb /*, previous, next*/ } = pageContext

  return (
    <Layout seoNode={page}>
      <Breadcrumbs breadcrumb={breadcrumb} />
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
