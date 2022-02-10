import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Topic from '../components/Blog/Topic'

const TopicPage = (pageData) => {
  return (
    <Layout pageData={pageData}>
      <Topic pageData={pageData} className="speakable-wrapper" />
    </Layout>
  )
}

export default TopicPage

export const query = graphql`
  query TopicQuery(
    $id: String!
    $i18nPath: String!
    $topic: String!
    $language: String!
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
    totals: allPage(
      filter: {
        topic: { eq: $topic }
        language: { eq: $language }
        published: { eq: true }
      }
      sort: { fields: timestamp, order: ASC }
    ) {
      totalCount
    }
    latest: allPage(
      filter: { topic: { eq: $topic }, published: { eq: true } }
      sort: { fields: [timestamp], order: ASC }
    ) {
      ...PageEdges
    }
    future: allPage(
      filter: { topic: { eq: $topic }, published: { eq: false } }
      sort: { fields: [timestamp], order: ASC }
    ) {
      ...BasePageEdges
    }
  }
`
