import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Home from '../components/Home'

const IndexPage = () => {
  return (
    <Layout isHome>
      <Home />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
