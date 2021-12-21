import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { HStack, Text } from '@chakra-ui/react'

const Tags = ({ tags }) => {
  if (!tags || !tags.length) {
    return null
  }
  const { t } = useTranslation()
  return (
    <HStack className="tags">
      <Text className="label">{t('tags')}</Text>
      <Text>{tags.join(', ')}</Text>
    </HStack>
  )
}

export default Tags
