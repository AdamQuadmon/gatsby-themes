import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import Image from '../Image'
import { Box, Text, Stack, useStyleConfig } from '@chakra-ui/react'

import Title from './Title'
import Wordcloud, { countTags } from './Wordcloud'
import PostsContainer from './PostsContainer'

const Topic = ({ data, variant }) => {
  const {
    section: { headline, description, image, noCover },
    published,
    future,
  } = data

  const tags = [...countTags(published), ...countTags(future)]

  const hasPosts = published.edges.length || future.edges.length
  const styles = useStyleConfig('Topic', { variant })
  const { t } = useTranslation()

  return (
    <Box __css={styles}>
      <Title title={headline} subtitle={description}></Title>
      <Stack spacing={8}>
        {!noCover && image && (
          <Image className="page_image" image={image} alt={headline} />
        )}
        {hasPosts ? (
          <>
            <Wordcloud tags={tags} />
            <PostsContainer
              variant="latest"
              posts={published}
              title={t('publishedPosts')}
              emptyTitle={t('noPublishedPosts')}
            />
            <PostsContainer
              variant="future"
              posts={future}
              title={t('futurePosts')}
            />
          </>
        ) : (
          <Text>{t('noPosts')}</Text>
        )}
      </Stack>
    </Box>
  )
}

export default Topic
