import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import AlbumContent from '../components/Content/AlbumContent'
import Breadcrumbs from '../components/Breadcrumbs'

export default function AlbumTemplate({ data, pageContext }) {
  const { page, images, album } = data
  const { breadcrumb /*, previous, next*/ } = pageContext

  return (
    <Layout page={page}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <AlbumContent album={album} page={page} images={images} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlbumQuery($id: String, $language: String!, $album: String) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    album: albumsCsv(album: { eq: $album }) {
      ...AlbumDataNode
    }
    page: page(id: { eq: $id }) {
      ...PageNode
    }
    images: allImagesCsv(
      filter: { album: { eq: $album } }
      sort: { fields: order }
    ) {
      ...ImagesDataEdges
    }
  }
`
