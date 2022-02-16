import React from 'react'
import { Box, Heading, Flex, useStyleConfig } from '@chakra-ui/react'
import Image from '../Image'
import Place from '../Place'
import MDXWrapper from '../MDXWrapper'

const PageContent = ({ page, variant, ...rest }) => {
  const styles = useStyleConfig('Page', { variant })
  const { description, headline, image, noCover, mdx, location } = page
  const body = mdx ? mdx.body : description

  return (
    <Box __css={styles} {...rest}>
      <Heading as="h1" size="2xl" lineHeight="1.2">
        {headline}
      </Heading>
      <Flex direction="column" gap={4}>
        {location && <Place place={location} addressFormat="full" />}
        {!noCover && image && (
          <Image className="page_image" image={image} alt={headline} />
        )}
        <MDXWrapper body={body} />
      </Flex>
    </Box>
  )
}

export default PageContent
