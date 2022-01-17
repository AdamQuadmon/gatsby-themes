import React from 'react'
import { graphql } from 'gatsby'
import Breadcrumbs from '../components/Breadcrumbs'

import Layout from '../components/LayoutContainer'
import Topic from '../components/Blog/Topic'

const TopicPage = ({ data, pageContext }) => {
  let { breadcrumb } = pageContext

  return (
    <Layout page={section}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Topic data={data} />
    </Layout>
  )
}

export default TopicPage

export const query = graphql`
  query TopicQuery($slug: String!, $topic: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    section: blogPost(slug: { eq: $slug }) {
      ...PostNode
    }
    published: allBlogPost(
      filter: { topic: { eq: $topic }, published: { eq: true } }
      sort: { fields: date, order: DESC }
    ) {
      ...PostsEdges
    }
    future: allBlogPost(
      filter: { topic: { eq: $topic }, published: { eq: false } }
      sort: { fields: date, order: ASC }
    ) {
      ...PostsEdges
    }
  }
`
