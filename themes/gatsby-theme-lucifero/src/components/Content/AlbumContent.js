import React from 'react'
import Masonry from 'react-masonry-css'

import { Box, Button, Flex, Heading, useStyleConfig } from '@chakra-ui/react'
import { Link, LinkTranslated } from '../Link'
import Image from '../Image'

const AlbumContent = ({ album, page, images, variant, ...rest }) => {
  const styles = useStyleConfig('AlbumContent', { variant })

  return (
    <Box __css={styles} {...rest}>
      <Flex justifyContent="space-between" mx="auto">
        <Heading as="h1" size="2xl">
          {album.name}
        </Heading>
        {album.pageUrl && (
          <Button as={LinkTranslated} to={album.pageUrl}>
            {album.pageLabel}
          </Button>
        )}
      </Flex>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.edges.map(({ node }, index) => (
          <Link key={node.file} d="inline-block" to={node.slug}>
            <Image image={node} borderRadius="md" mb={2} />
          </Link>
        ))}
      </Masonry>
    </Box>
  )
}

export default AlbumContent

// TODO: filter by fields (season, year, place, framing)
