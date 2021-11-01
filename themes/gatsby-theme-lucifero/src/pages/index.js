import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import Seo from '../components/Seo'
import Hero from '../components/Hero'

const IndexPage = () => {
  return (
    <Layout>
      <Seo isHome />
      <Hero />
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
