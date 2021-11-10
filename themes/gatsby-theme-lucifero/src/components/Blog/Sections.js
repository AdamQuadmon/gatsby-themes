import React from 'react'

import { Box, Flex, Heading, Text, useStyleConfig } from '@chakra-ui/react'

import Card from './Card'
import { getCounted } from './PostCount'

const Sections = ({ data, field, variant }) => {
  const { section, sections, published, future } = data

  if (!section) {
    return null
  }

  const {
    frontmatter: { title, description },
  } = section
  const counts = getCounted(published, future)
  const styles = useStyleConfig('Sections', { variant })

  return (
    <Box __css={styles}>
      <Heading as="h2">{title}</Heading>
      <Text as="h3">{description}</Text>
      <Flex className="cards_box">
        {sections.edges.map(({ node }) => (
          <Card key={node.id} node={node} count={counts[node.fields[field]]} />
        ))}
      </Flex>
    </Box>
  )
}

export default Sections
