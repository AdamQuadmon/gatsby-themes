import React from 'react'
import { Box, LinkBox, useStyleConfig } from '@chakra-ui/react'
import Image from '../Image'

import { LinkOverlay } from '../Link'

const NavItemSub = ({ variant, item, ...rest }) => {
  const styles = useStyleConfig('NavItemSub', { variant })

  const { slug, abstract, image, name, headline } = item
  return (
    <Box as={LinkBox} __css={styles} {...rest}>
      <LinkOverlay data-peer to={slug} className="item_header">
        {name}
      </LinkOverlay>

      {image && <Image image={image} alt={headline} height="180px" />}
      <Box className="item_content">{abstract}</Box>
    </Box>
  )
}

export default NavItemSub
