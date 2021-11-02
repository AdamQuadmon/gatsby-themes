import React from 'react'
import { Box, Image, Heading, useStyleConfig } from '@chakra-ui/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const NavItemSub = ({ variant, item, ...rest }) => {
  const styles = useStyleConfig('NavItemSub', { variant })
  const { body, frontmatter } = item
  const { cover, slug, title } = frontmatter
  const coverImage = cover && getImage(cover)
  return (
    <Box __css={styles} {...rest}>
      <Link to={slug}>
        <Heading as="h4" size="md" className="item_header">
          {title}
        </Heading>
        {cover && <Image as={GatsbyImage} image={coverImage} alt={title} />}
        <Box className="item_content">
          <MDXRenderer>{body}</MDXRenderer>
        </Box>
      </Link>
    </Box>
  )
}

export default NavItemSub
