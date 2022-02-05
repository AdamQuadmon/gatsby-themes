import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import AlbumContent from '../components/Content/AlbumContent'
import Breadcrumbs from '../components/Breadcrumbs'

export default function AlbumTemplate({ data, pageContext }) {
  const { page, album, images } = data
  const { breadcrumb /*, previous, next*/ } = pageContext

  return (
    <Layout page={page} crumbs={breadcrumb.crumbs}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <AlbumContent album={album} page={page} images={images} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumQuery($id: String, $language: String!, $topic: String) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: page(id: { eq: $id }) {
      ...PageNode
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
