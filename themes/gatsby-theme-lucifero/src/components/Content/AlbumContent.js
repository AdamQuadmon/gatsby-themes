import React from 'react'
import Masonry from 'react-masonry-css'

import { Box, Button, Flex, Heading, useStyleConfig } from '@chakra-ui/react'
import { Link, LinkTranslated } from '../Link'
import Image from '../Image'
import { getImageSlug } from '../../utils/images'

const AlbumContent = ({ album, page, images, variant, ...rest }) => {
  const styles = useStyleConfig('AlbumContent', { variant })

  return (
    <Box __css={styles} {...rest}>
      <Flex justifyContent="space-between" mx="auto">
        <Heading as="h1" size="2xl">
          {album.title}
        </Heading>
        {album.page && (
          <Button as={LinkTranslated} to={album.page}>
            {album.pageTitle}
          </Button>
        )}
      </Flex>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.edges.map(({ node }, index) => (
          <Link key={node.file} to={getImageSlug(node)}>
            <Image image={node} d="inline-block" borderRadius="md" mb={2} />
          </Link>
        ))}
      </Masonry>
    </Box>
  )
}

export default AlbumContent

// TODO: filter by fields (season, year, place, framing)
