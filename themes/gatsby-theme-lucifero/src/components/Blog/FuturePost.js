import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { motion } from 'framer-motion'
import { Box, Heading, Text, useStyleConfig } from '@chakra-ui/react'

import Tags from './Tags'

const FuturePost = ({ post, variant }) => {
  const {
    frontmatter: { title, description, tags },
  } = post
  const styles = useStyleConfig('PostCard', { variant })
  const { t } = useTranslation()
  return (
    <Box __css={styles}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
        <Box>
          <Box>
            <Text>{t('futurePosts')}</Text>
            <Heading as="h2">{title}</Heading>
            <Text>{description}</Text>
          </Box>
          <Tags tags={tags} />
        </Box>
      </motion.div>
    </Box>
  )
}

export default FuturePost
