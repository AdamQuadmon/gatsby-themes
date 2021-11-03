import React from 'react'
import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  useStyleConfig,
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import MDXProvider from './MdxProvider'

// Provide common components here
const shortcodes = { GatsbyLink, Link }

const PageContent = ({ node, variant, ...rest }) => {
  const styles = useStyleConfig('Page', { variant })
  const { frontmatter, body } = node
  const { cover, title, noCover } = frontmatter
  const image = getImage(cover)
  const boxClass = !noCover ? 'has_cover' : 'no_cover'
  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1">{title}</Heading>
      <Stack className={boxClass} direction={['column', '', 'row']}>
        {!noCover && (
          <Image
            className="page_image"
            as={GatsbyImage}
            image={image}
            alt={title}
          />
        )}
        <Box className="page_content">
          <MDXProvider
            components={shortcodes}
            frontmatter={frontmatter}
            body={body}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default PageContent
