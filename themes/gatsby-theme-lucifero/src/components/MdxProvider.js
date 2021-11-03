import React from 'react'

import { MDXProvider as DefaultProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const MDXProvider = ({ components, frontmatter, body }) => {
  return (
    <DefaultProvider components={components}>
      <MDXRenderer frontmatter={frontmatter}>{body}</MDXRenderer>
    </DefaultProvider>
  )
}

export default MDXProvider
