import React from 'react'

import { Box, Heading, LinkBox, useStyleConfig } from '@chakra-ui/react'
import { LinkOverlay } from '../Link'
import Card from '../Card'
import Image from '../Image'

const Album = ({ album, variant, ...rest }) => {
  const styles = useStyleConfig('Album', { variant })
  const { name, image, imagesLength, slug } = album

  return (
    <Card __css={styles} {...rest}>
      <LinkBox w={'100%'}>
        <Image className="image" image={image} aspectRatio={16 / 9} />

        <Box className="content">
          <Heading as="h2" size="md" className="album_title">
            <LinkOverlay to={slug} w={'100%'}>
              {name}
            </LinkOverlay>
          </Heading>
          <Box className="album_content">{`${imagesLength} immagini`}</Box>
        </Box>
      </LinkBox>
    </Card>
  )
}

export default Album
