import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import ImageContent from '../components/Content/ImageContent'

export default function ImageTemplate(pageData) {
  return (
    <Layout pageData={pageData}>
      <ImageContent pageData={pageData} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ImageQuery(
    $id: String!
    $i18nPath: String!
    $language: String!
    $topic: String!
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
    album: albumCsv(topic: { eq: $topic }, language: { eq: $language }) {
      ...AlbumCsvNode
    }
    images: allImageCsv(
      filter: { topic: { eq: $topic }, language: { eq: $language } }
      sort: { fields: [order] }
    ) {
      ...ImageCsvEdges
    }
  }
`
