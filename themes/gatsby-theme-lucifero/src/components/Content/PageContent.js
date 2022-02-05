import React from 'react'
import { Box, Heading, useStyleConfig } from '@chakra-ui/react'
import Image from '../Image'

import MDXWrapper from '../MDXWrapper'

const PageContent = ({ page, variant, ...rest }) => {
  const styles = useStyleConfig('Page', { variant })
  const { headline, image, noCover, mdx } = page
  const body = mdx ? mdx.body : description

  const boxClass = image ? 'has_cover' : 'no_cover'
  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1" size="2xl">
        {headline}
      </Heading>
      <Box className={boxClass}>
        {!noCover && image && (
          <Image className="page_image" image={image} alt={headline} />
        )}
        <MDXWrapper body={body} />
      </Box>
    </Box>
  )
}

export default PageContent
