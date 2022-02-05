import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Home from '../components/Home'

const IndexPage = ({ data }) => {
  const { page } = data

  return (
    <Layout page={page}>
      <Home page={page} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page(type: { eq: "blog" }, language: { eq: $language }) {
      ...PageNode
    }
  }
`
