import React from 'react'
import { graphql } from 'gatsby'

import { Box, Flex, Heading } from '@chakra-ui/layout'
import Layout from '../components/LayoutContainer'
import Album from '../components/Images/Album'

// TODO add collections meta
const GalleryPage = (pageData) => {
  const {
    data: { albums },
  } = pageData

  const areas = getAreasAlbums(albums.edges)
  return (
    <Layout pageData={pageData}>
      {areas.map((area) => (
        <GallerySection
          key={area.name}
          areaName={area.name}
          albums={area.albums}
        />
      ))}
    </Layout>
  )
}

export default GalleryPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    albums: allAlbumCsv(
      filter: { published: { eq: true } }
      sort: { fields: [order], order: ASC }
    ) {
      ...AlbumCsvEdges
    }
    page: page(i18nPath: { eq: "/gallery" }, language: { eq: $language }) {
      ...PageNode
    }
    alternatePages: allPage(
      filter: { i18nPath: { eq: "/gallery" }, language: { ne: $language } }
    ) {
      ...PageAlternateNodes
    }
  }
`

const GallerySection = ({ areaName, albums }) => {
  return (
    <Box>
      <Heading as="h2">{areaName}</Heading>
      <Flex justifyContent="space-between">
        {albums.map((album) => (
          <Album key={album.slug} album={album} />
        ))}
      </Flex>
    </Box>
  )
}

const getAreasAlbums = (albums) => {
  const areas = []
  const areasNames = {}

  albums.forEach(({ node }) => {
    if (!areasNames[node.area]) areasNames[node.area] = []
    areasNames[node.area].push(node)
  })

  Object.keys(areasNames).forEach((areaKey) => {
    areas.push({
      name: areaKey,
      albums: areasNames[areaKey],
    })
  })
  return areas
}
