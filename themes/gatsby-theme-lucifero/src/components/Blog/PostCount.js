import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Text } from '@chakra-ui/react'

const HasCount = ({ count }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Text>
        <Text as="span">{t('articles')}</Text>: {count.published + count.future}
        (<Text as="span">{count.published}</Text>/
        <Text as="span">{count.future}</Text>)
      </Text>
    </Box>
  )
}

const NoCount = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Text>{t('articles')}</Text>: <Text>0</Text>
    </Box>
  )
}

const PostCount = ({ count }) => {
  return count ? <HasCount count={count} /> : <NoCount />
}

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

export default PostCount
