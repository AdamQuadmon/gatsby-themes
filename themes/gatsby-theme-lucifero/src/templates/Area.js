import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Breadcrumbs from '../components/Breadcrumbs'
import Sections from '../components/Blog/Sections'

const AreaPage = ({ data, pageContext }) => {
  let { breadcrumb } = pageContext
  const { section } = data

  return (
    <Layout page={section} crumbs={breadcrumb.crumbs}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <Sections
        className="speakable-wrapper"
        data={data}
        page={section}
        field="topic"
      />
    </Layout>
  )
}

export default AreaPage

export const query = graphql`
  query AreaQuery($slug: String!, $area: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    section: page(slug: { eq: $slug }) {
      ...PageNode
    }
    sections: allPage(
      filter: {
        area: { eq: $area }
        type: { eq: "topic" }
        language: { eq: $language }
      }
      sort: { fields: timestamp, order: ASC }
    ) {
      ...PageEdges
    }
    latest: allPage(
      filter: {
        published: { eq: true }
        type: { eq: "post" }
        area: { eq: $area }
        language: { eq: $language }
      }
      sort: { fields: timestamp, order: ASC }
    ) {
      ...PageEdges
    }
    published: allPage(
      filter: {
        published: { eq: true }
        type: { eq: "post" }
        area: { eq: $area }
        language: { eq: $language }
      }
    ) {
      ...PageEdges
    }
    future: allPage(
      filter: {
        published: { eq: false }
        type: { eq: "post" }
        area: { eq: $area }
        language: { eq: $language }
      }
    ) {
      ...BasePagesEdges
    }
  }
`
