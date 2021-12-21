import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Text } from '@chakra-ui/react'

const initCount = (count, posts) => {
  posts.group.map((v) => (count[v.fieldValue] = { published: 0, future: 0 }))
}

const addCount = (counts, posts, field) => {
  posts.group.map((v) => (counts[v.fieldValue][field] = v.totalCount))
}

export const getCounted = (published, future) => {
  let count = {}

  initCount(count, published)
  initCount(count, future)
  addCount(count, published, 'published')
  addCount(count, future, 'future')

  return count
}

const Count = ({ count }) => {
  const { t } = useTranslation()
  const published = count.published || 0
  const future = count.future || 0
  const total = published + future
  return (
    <Box>
      <Text>
        <Text as="span">{t('posts')}</Text>: {total}(
        <Text as="span">{published}</Text>/<Text as="span">{future}</Text>)
      </Text>
    </Box>
  )
}

const NoCount = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Text>
        <Text as="span">{t('posts')}</Text>: <Text as="span">0</Text>
      </Text>
    </Box>
  )
}

const PostCount = ({ count }) => {
  return count ? <Count count={count} /> : <NoCount />
}

export default PostCount
