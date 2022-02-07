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
    page: page(type: { eq: "blog" }, language: { eq: $language }) {
      ...PageNode
    }
    alternatePages: allPage(
      filter: { type: { eq: "blog" }, language: { ne: $language } }
    ) {
      ...PageAlternateNodes
    }
    sections: allPage(
      filter: { type: { eq: "area" }, language: { eq: $language } }
      sort: { fields: [order], order: ASC }
    ) {
      ...PageEdges
    }
    latest: allPage(
      filter: {
        type: { eq: "post" }
        language: { eq: $language }
        published: { eq: true }
      }
      sort: { fields: timestamp, order: ASC }
      limit: 3
    ) {
      ...PageEdges
    }
    future: allPage(
      filter: {
        type: { eq: "post" }
        language: { eq: $language }
        published: { eq: false }
      }
      limit: 3
    ) {
      ...BasePageEdges
    }
  }
`
