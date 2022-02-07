import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import AlbumContent from '../components/Content/AlbumContent'

export default function AlbumTemplate(pageData) {
  return (
    <Layout pageData={pageData}>
      <AlbumContent pageData={pageData} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumQuery(
    $id: String!
    $i18nPath: String
    $language: String!
    $topic: String
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
    album: albumCsv(topic: { eq: $topic }) {
      ...AlbumCsvNode
    }
    images: allImageCsv(
      filter: { topic: { eq: $topic } }
      sort: { fields: [order] }
    ) {
      ...ImageCsvEdges
    }
  }
`
