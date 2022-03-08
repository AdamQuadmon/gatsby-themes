import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Heading, LinkBox, Text, useStyleConfig } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { LinkOverlay } from '../Link'
import Card from '../Card'
import Image from '../Image'

const MotionLinkBox = motion(LinkBox)

const Album = ({ album, variant, ...rest }) => {
  const styles = useStyleConfig('Album', { variant })
  const { name, image, imagesLength, slug, description } = album
  const { t } = useTranslation()

  return (
    <Card sx={styles} as={MotionLinkBox} whileHover={{ scale: 1.05 }} {...rest}>
      <Image className="image" image={image} aspectRatio={16 / 9} />

      <Box className="content">
        {`${imagesLength} ${t('pictures')}`}
        <Heading as="h2" size="md" className="album_title">
          <LinkOverlay to={slug} w={'100%'}>
            {name}
          </LinkOverlay>
        </Heading>
        <Box className="album_content">
          <Text>{description}</Text>
        </Box>
      </Box>
    </Card>
  )
}

export default Album
