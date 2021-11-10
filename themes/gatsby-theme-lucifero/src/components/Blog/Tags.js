import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, Text } from '@chakra-ui/react'

const Tags = ({ tags }) => {
  if (!tags || !tags.length) {
    return null
  }
  const { t } = useTranslation()
  return (
    <Box>
      <Text>{t('tags')}</Text>
      {tags.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </Box>
  )
}

export default Tags
