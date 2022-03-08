import React from 'react'
import { graphql } from 'gatsby'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Flex, Heading, useStyleConfig } from '@chakra-ui/react'
import Layout from '../components/LayoutContainer'
import Album from '../components/Images/Album'

// TODO add collections meta
const GalleryPage = (pageData) => {
  const styles = useStyleConfig('Gallery')
  const {
    data: { albums },
  } = pageData

  const areas = getAreasAlbums(albums.edges)
  return (
    <Layout pageData={pageData}>
      <Box __css={styles}>
        {areas.map((area) => (
          <GallerySection
            key={area.name}
            areaName={area.name}
            albums={area.albums}
          />
        ))}
      </Box>
    </Layout>
  )
}

export default GalleryPage

const GallerySection = ({ areaName, albums }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Heading as="h2">{t(areaName)}</Heading>
      <Flex className="albums">
        {albums.map((album) => (
          <Box key={album.slug} className="album">
            <Album album={album} />
          </Box>
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

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    albums: allAlbumCsv(
      filter: { published: { eq: true }, language: { eq: $language } }
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
