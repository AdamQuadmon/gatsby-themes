import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Heading } from '@chakra-ui/react'

import PublishedPost from './PublishedPost'

const LatestPosts = ({ posts }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Heading as="h6">
        <Text>{t('latestPosts')}</Text>
      </Heading>
      <Box>
        {posts.edges.map((item) => {
          return <PublishedPost key={item.node.id} post={item} />
        })}
      </Box>
    </Box>
  )
}

export default LatestPosts
