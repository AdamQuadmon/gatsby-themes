import React from 'react'
import { graphql } from 'gatsby'
import Breadcrumbs from '../components/Breadcrumbs'

import Layout from '../components/LayoutContainer'
import Topic from '../components/Blog/Topic'

const TopicPage = ({ data, pageContext }) => {
  let { section } = data
  let { breadcrumb } = pageContext

  return (
    <Layout page={section} crumbs={breadcrumb.crumbs}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Topic data={data} className="speakable-wrapper" />
    </Layout>
  )
}

export default TopicPage

export const query = graphql`
  query TopicQuery($slug: String!, $topic: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    section: page(slug: { eq: $slug }) {
      ...PageNode
    }
    published: allPage(
      filter: { topic: { eq: $topic }, published: { eq: true } }
      sort: { fields: timestamp, order: ASC }
    ) {
      ...PageEdges
    }
    future: allPage(
      filter: { topic: { eq: $topic }, published: { eq: false } }
      sort: { fields: timestamp, order: ASC }
    ) {
      ...BasePagesEdges
    }
  }
`
