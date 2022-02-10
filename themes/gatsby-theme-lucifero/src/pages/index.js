import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Home from '../components/Home'

const IndexPage = (pageData) => {
  return (
    <Layout pageData={pageData}>
      <Home pageData={pageData} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: page(i18nPath: { eq: "/" }, language: { eq: $language }) {
      ...PageNode
    }
    alternatePages: allPage(
      filter: { i18nPath: { eq: "/" }, language: { ne: $language } }
    ) {
      ...PageAlternateNodes
    }
    sections: allPage(
      filter: { type: { eq: "area" }, language: { eq: $language } }
      sort: { fields: [order], order: ASC }
    ) {
      ...PageEdges
    }
    totals: allPage(
      filter: {
        type: { eq: "article" }
        language: { eq: $language }
        published: { eq: true }
      }
      sort: { fields: timestamp, order: ASC }
    ) {
      totalCount
      group(field: area) {
        fieldValue
        totalCount
        group(field: topic) {
          fieldValue
          totalCount
        }
      }
    }
    latest: allPage(
      limit: 6
      filter: {
        type: { eq: "post" }
        language: { eq: $language }
        published: { eq: true }
      }
      sort: { fields: timestamp, order: ASC }
    ) {
      ...PageEdges
    }
    future: allPage(
      limit: 6
      filter: {
        type: { eq: "post" }
        language: { eq: $language }
        published: { eq: false }
      }
    ) {
      ...BasePageEdges
    }
  }
`
