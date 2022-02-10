import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Sections from '../components/Blog/Sections'

const AreaPage = (pageData) => {
  return (
    <Layout pageData={pageData}>
      <Sections
        className="speakable-wrapper"
        pageData={pageData}
        field="topic"
      />
    </Layout>
  )
}

export default AreaPage

export const query = graphql`
  query AreaQuery(
    $id: String!
    $i18nPath: String!
    $language: String!
    $area: String!
  ) {
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
    sections: allPage(
      filter: {
        type: { eq: "topic" }
        area: { eq: $area }
        language: { eq: $language }
      }
      sort: { fields: [order], order: ASC }
    ) {
      ...PageEdges
    }
    totals: allPage(
      filter: {
        type: { eq: "article" }
        area: { eq: $area }
        language: { eq: $language }
        published: { eq: true }
      }
      sort: { fields: timestamp, order: ASC }
    ) {
      totalCount
      group(field: topic) {
        fieldValue
        totalCount
      }
    }
    latest: allPage(
      limit: 6
      filter: {
        type: { eq: "post" }
        area: { eq: $area }
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
        area: { eq: $area }
        language: { eq: $language }
        published: { eq: false }
      }
    ) {
      ...BasePageEdges
    }
  }
`
