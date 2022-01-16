import React from 'react'
import { Box, Heading, useStyleConfig } from '@chakra-ui/react'
import Image from './Image'

import MDXWrapper from './MDXWrapper'

const PageContent = ({ page, variant, ...rest }) => {
  const styles = useStyleConfig('Page', { variant })
  const { body, title, meta } = page
  const { folder, cover, noCover } = meta

  const boxClass = !noCover ? 'has_cover' : 'no_cover'
  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      <Box className={boxClass}>
        {!noCover && cover && (
          <Image
            className="page_image"
            file={cover}
            folder={folder}
            alt={title}
          />
        )}
        <MDXWrapper meta={meta} body={body} />
      </Box>
    </Box>
  )
}

export default PageContent
