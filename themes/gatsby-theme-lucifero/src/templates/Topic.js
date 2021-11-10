import React from 'react'
import { graphql } from 'gatsby'
import Breadcrumbs from '../components/Breadcrumbs'

import Layout from '../components/LayoutContainer'
import Topic from '../components/Blog/topic'

const TopicPage = ({ data, pageContext }) => {
  let { breadcrumb } = pageContext

  return (
    <Layout title={data.section.frontmatter.title}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Topic data={data} />
    </Layout>
  )
}

export default TopicPage

export const query = graphql`
  query TopicPosts($slug: String!, $topic: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    section: mdx(fields: { slug: { eq: $slug } }) {
      ...PostNode
    }
    published: allMdx(
      filter: {
        fields: { topic: { eq: $topic }, type: { eq: "post" } }
        frontmatter: { published: { eq: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...PostsEdges
    }
    future: allMdx(
      filter: {
        fields: { topic: { eq: $topic }, type: { eq: "post" } }
        frontmatter: { published: { eq: false } }
      }
      sort: { fields: frontmatter___title, order: ASC }
    ) {
      ...PostsEdges
    }
  }
`
