import React from 'react'
import { Box, Heading, Image, useStyleConfig } from '@chakra-ui/react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import MDXProvider from './MdxProvider'

const PageContent = ({ node, variant, ...rest }) => {
  const styles = useStyleConfig('Page', { variant })
  const { frontmatter, body } = node
  const { cover, title, noCover } = frontmatter
  const image = getImage(cover)
  const boxClass = !noCover ? 'has_cover' : 'no_cover'
  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      <Box className={boxClass}>
        {!noCover && image && (
          <Image
            className="page_image"
            as={GatsbyImage}
            image={image}
            alt={title}
          />
        )}
        <MDXProvider frontmatter={frontmatter} body={body} />
      </Box>
    </Box>
  )
}

export default PageContent
