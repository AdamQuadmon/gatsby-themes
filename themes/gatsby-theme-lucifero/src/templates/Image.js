import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import ImageContent from '../components/Content/ImageContent'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ImageTemplate({ data, pageContext }) {
  const { album, images, page } = data
  const { breadcrumb } = pageContext

  return (
    <Layout imageNode={page} crumbs={breadcrumb.crumbs}>
      <Breadcrumbs breadcrumb={breadcrumb} />

      <ImageContent album={album} page={page} images={images.edges} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ImageQuery($id: String!, $language: String!, $topic: String!) {
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
