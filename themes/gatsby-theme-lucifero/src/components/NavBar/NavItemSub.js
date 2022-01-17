import React from 'react'
import { Box, Heading, useStyleConfig } from '@chakra-ui/react'
import Image from '../Image'

import { Link } from '../Link'

const NavItemSub = ({ variant, item, ...rest }) => {
  const styles = useStyleConfig('NavItemSub', { variant })

  const { slug, excerpt, meta } = item
  const { folder, cover, title } = meta
  return (
    <Box __css={styles} {...rest}>
      <Link to={`/${slug}`}>
        <Heading as="h4" size="md" className="item_header">
          {title}
        </Heading>
        {cover && <Image file={cover} folder={folder} alt={title} />}
        <Box className="item_content">{excerpt}</Box>
      </Link>
    </Box>
  )
}

export default NavItemSub
