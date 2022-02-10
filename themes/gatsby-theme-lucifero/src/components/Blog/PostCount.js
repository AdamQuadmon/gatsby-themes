import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Text } from '@chakra-ui/react'

export const getCounted = (totals) => {
  let count = {}

  totals.group.forEach((element) => {
    count[element.fieldValue] = {
      count: element.totalCount,
      group: element.group
        ? element.group.reduce(
            acc,
            (g) => {
              acc[g.fieldValue] = g.totalCount
            },
            {}
          )
        : null,
    }
  })

  return {
    total: totals.totalCount,
    groups: count,
  }
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
