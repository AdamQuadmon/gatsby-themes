import React from 'react'
import { Box, Heading, useStyleConfig } from '@chakra-ui/react'
import Image from '../Image'

import { Link } from '../Link'

const NavItemSub = ({ variant, item, ...rest }) => {
  const styles = useStyleConfig('NavItemSub', { variant })

  const { slug, abstract, image, name, headline, description, mdx } = item

  const content = abstract || mdx ? mdx.excerpt : description
  return (
    <Box __css={styles} {...rest}>
      <Link to={slug}>
        <Heading as="h4" size="md" className="item_header">
          {name}
        </Heading>
        {image && <Image image={image} alt={headline} aspectRatio={16 / 9} />}
        <Box className="item_content">{content}</Box>
      </Link>
    </Box>
  )
}

export default NavItemSub
