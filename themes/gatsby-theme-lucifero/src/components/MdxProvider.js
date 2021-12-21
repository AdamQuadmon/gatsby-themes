import React from 'react'

import { Box, useStyleConfig } from '@chakra-ui/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider as DefaultProvider } from '@mdx-js/react'

import { mdxComponents } from './MdxComponents'

const MDXProvider = ({ frontmatter, body, variant, ...rest }) => {
  const styles = useStyleConfig('MDXProvider', { variant })
  if (!body) {
    return null
  }

  return (
    <Box className="mdx_content" __css={styles} {...rest}>
      <DefaultProvider components={mdxComponents}>
        <MDXRenderer frontmatter={frontmatter}>{body}</MDXRenderer>
      </DefaultProvider>
    </Box>
  )
}

export default MDXProvider
