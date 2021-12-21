import React from 'react'

import { Box, Heading, useStyleConfig } from '@chakra-ui/react'

const Title = ({ title, subtitle, variant }) => {
  if (!title) {
    return null
  }
  const styles = useStyleConfig('Title', { variant })
  return (
    <Box className="title" __css={styles}>
      <Heading size="4xl" as="h1">
        {title}
      </Heading>
      <Heading size="lg" as="h2">
        {subtitle}
      </Heading>
    </Box>
  )
}

export default Title
