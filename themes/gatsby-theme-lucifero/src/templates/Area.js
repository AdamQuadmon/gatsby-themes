import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Breadcrumbs from '../components/Breadcrumbs'
import Sections from '../components/Blog/Sections'

const AreaPage = ({ data, pageContext }) => {
  let { breadcrumb } = pageContext
  const { section } = data

  return (
    <Layout page={section}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Sections data={data} field="topic" />
    </Layout>
  )
}

export default AreaPage

export const query = graphql`
  query AreaQuery($slug: String!, $area: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    section: blogPost(slug: { eq: $slug }) {
      ...PostNode
    }
    sections: allBlogPost(
      filter: { area: { eq: $area }, type: { eq: "topic" } }
      sort: { fields: date, order: ASC }
    ) {
      ...PostsEdges
    }
    latest: allBlogPost(
      filter: {
        published: { eq: true }
        type: { eq: "post" }
        area: { eq: $area }
      }
      sort: { fields: date, order: DESC }
    ) {
      ...PostsEdges
    }
    published: allBlogPost(
      filter: {
        published: { eq: true }
        type: { eq: "post" }
        area: { eq: $area }
      }
    ) {
      ...TopicGroup
    }
    future: allBlogPost(
      filter: {
        published: { eq: false }
        type: { eq: "post" }
        area: { eq: $area }
      }
    ) {
      ...TopicGroup
    }
  }
`
