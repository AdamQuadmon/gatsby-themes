import React from 'react'
import Masonry from 'react-masonry-css'

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'
import { Link, LinkTranslated } from '../Link'
import Image from '../Image'

const AlbumContent = ({ pageData, variant, ...rest }) => {
  const styles = useStyleConfig('AlbumContent', { variant })
  const {
    data: { album, images },
  } = pageData

  return (
    <Box __css={styles} {...rest}>
      <Flex className="header">
        <Heading as="h1" size="2xl" className="album_title">
          {album.name}
        </Heading>
        {album.pageUrl && (
          <Button as={Link} to={album.pageUrl}>
            {album.pageLabel}
          </Button>
        )}
      </Flex>
      <Text className="description">{album.description}</Text>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.edges.map(({ node }, index) => (
          <Link key={index} d="inline-block" to={node.slug}>
            <Image image={node} borderRadius="md" mb={2} />
          </Link>
        ))}
      </Masonry>
    </Box>
  )
}

export default AlbumContent

// TODO: filter by fields (season, year, place, framing)
