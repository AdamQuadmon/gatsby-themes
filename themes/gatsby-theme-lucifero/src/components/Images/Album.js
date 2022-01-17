import React from 'react'

import { Box, Heading, LinkBox, useStyleConfig } from '@chakra-ui/react'
import { LinkOverlay } from '../Link'
import Card from '../Card'
import Image from '../Image'
import { getAlbumSlug } from '../../utils/images'

const Album = ({ album, images, variant, ...rest }) => {
  const styles = useStyleConfig('Album', { variant })

  const image = images[0]

  return (
    <Card __css={styles} {...rest}>
      <LinkBox w={'100%'}>
        <Box w={'100%'} className="image">
          <Image image={image} aspectRatio={16 / 9} />
        </Box>
        <Box className="content">
          <Heading as="h2" size="md" className="album_title">
            <LinkOverlay to={getAlbumSlug(album)} w={'100%'}>
              {album.title}
            </LinkOverlay>
          </Heading>
          <Box className="album_content">{`${images.length} immagini`}</Box>
        </Box>
      </LinkBox>
    </Card>
  )
}

export default Album
