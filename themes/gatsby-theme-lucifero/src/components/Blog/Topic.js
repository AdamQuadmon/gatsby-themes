import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Box, Image, Text, Stack, useStyleConfig } from '@chakra-ui/react'

import Title from './Title'
import Wordcloud, { countTags } from './Wordcloud'
import PostsContainer from './PostsContainer'

const Topic = ({ data, variant }) => {
  const {
    section: {
      frontmatter: { title, description, cover, noCover },
    },
    published,
    future,
  } = data

  const tags = [...countTags(published), ...countTags(future)]
  console.log(tags)
  console.log(countTags(published))

  const hasPosts = published.edges.length || future.edges.length
  const image = getImage(cover)
  const styles = useStyleConfig('Topic', { variant })
  const { t } = useTranslation()

  return (
    <Box __css={styles}>
      <Title title={title} subtitle={description}></Title>
      <Stack spacing={8}>
        {!noCover && image && (
          <Image
            className="page_image"
            as={GatsbyImage}
            image={image}
            alt={title}
          />
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
