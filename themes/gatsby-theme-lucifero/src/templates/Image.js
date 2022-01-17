import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import ImageContent from '../components/Content/ImageContent'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ImageTemplate({ data, pageContext }) {
  const { page, album, image } = data
  const { breadcrumb, prev, next } = pageContext

  return (
    <Layout page={page}>
      <Breadcrumbs breadcrumb={breadcrumb} />

      <ImageContent album={album} image={image} prev={prev} next={next} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ImageQuery(
    $id: String
    $language: String!
    $album: String!
    $file: String!
  ) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    album: albumsCsv(album: { eq: $album }) {
      ...AlbumDataNode
    }
    page: page(id: { eq: $id }) {
      ...PageNode
    }
    image: imagesCsv(album: { eq: $album }, file: { eq: $file }) {
      ...ImageDataNode
    }
  }
`
