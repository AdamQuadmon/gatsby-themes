import React from 'react'

import { Box, useStyleConfig } from '@chakra-ui/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import { mdxComponents } from './MdxComponents'

const MDXWrapper = ({ body, variant, ...rest }) => {
  const styles = useStyleConfig('MDXWrapper', { variant })
  if (!body) {
    return null
  }

  return (
    <Box className="mdx_content" __css={styles} {...rest}>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Box>
  )
}

export default MDXWrapper
