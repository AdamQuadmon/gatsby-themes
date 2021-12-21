import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Breadcrumbs from '../components/Breadcrumbs'
import Sections from '../components/Blog/Sections'

const AreaPage = ({ data, pageContext }) => {
  let { breadcrumb } = pageContext
  const {
    section: { frontmatter },
  } = data

  return (
    <Layout seo={frontmatter}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Sections data={data} field="topic" />
    </Layout>
  )
}

export default AreaPage

export const query = graphql`
  query AreaTopicsAndPostsCount(
    $slug: String!
    $area: String!
    $language: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    section: mdx(fields: { slug: { eq: $slug } }) {
      ...PostNode
    }
    sections: allMdx(
      filter: { fields: { area: { eq: $area }, type: { eq: "topic" } } }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      ...PostsEdges
    }
    latest: allMdx(
      filter: {
        fields: { type: { eq: "post" }, area: { eq: $area } }
        frontmatter: { published: { eq: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...PostsEdges
    }
    published: allMdx(
      filter: {
        fields: { area: { eq: $area }, type: { eq: "post" } }
        frontmatter: { published: { eq: true } }
      }
    ) {
      ...TopicGroup
    }
    future: allMdx(
      filter: {
        fields: { area: { eq: $area }, type: { eq: "post" } }
        frontmatter: { published: { eq: false } }
      }
    ) {
      ...TopicGroup
    }
  }
`
