import React from 'react'
import { graphql } from 'gatsby'

import { Box, Flex, Heading } from '@chakra-ui/layout'
import Layout from '../components/LayoutContainer'
import Breadcrumbs from '../components/Breadcrumbs'
import Album from '../components/Images/Album'
import {
  getImagesByAlbum,
  getAlbumsByName,
  getAlbumsKeys,
} from '../utils/images'

const GallerySection = ({ edges, albums, title }) => {
  const imagesByAlbum = getImagesByAlbum(edges)
  const albumsByName = getAlbumsByName(albums)
  const albumsKeys = getAlbumsKeys(imagesByAlbum, albumsByName)
  return (
    <Box>
      <Heading as="h2">{title}</Heading>

      <Flex justifyContent="space-between">
        {albumsKeys.map((album) => {
          const images = imagesByAlbum[album]
          return (
            <Album key={album} album={albumsByName[album]} images={images} />
          )
        })}
      </Flex>
    </Box>
  )
}
const GalleryPage = ({ data, pageContext }) => {
  const { breadcrumb } = pageContext
  const albums = data.albums.edges
  const tenuta = data.tenuta.edges
  const luoghi = data.luoghi.edges

  return (
    <Layout page={{ meta: { title: 'Gallery' } }}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <GallerySection edges={tenuta} albums={albums} title="La Tenuta" />
      <GallerySection edges={luoghi} albums={albums} title="I Dintorni" />
    </Layout>
  )
}

export default GalleryPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    albums: allAlbumsCsv(sort: { fields: [order], order: ASC }) {
      ...AlbumsDataEdges
    }
    tenuta: allImagesCsv(
      filter: { section: { eq: "tenuta" } }
      sort: { fields: [order], order: ASC }
    ) {
      ...ImagesDataEdges
    }
    luoghi: allImagesCsv(
      filter: { section: { eq: "luoghi" } }
      sort: { fields: [order], order: ASC }
    ) {
      ...ImagesDataEdges
    }
  }
`
