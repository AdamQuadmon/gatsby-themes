import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Box, Heading, Image, useStyleConfig } from '@chakra-ui/react'

import Wordcloud, { countTags } from './Wordcloud'
import PublishedPost from './PublishedPost'
import FuturePost from './FuturePost'

const PostsContainer = ({ component, posts, title, emptyTitle, variant }) => {
  const styles = useStyleConfig('Posts', { variant })
  const PostComponent = component
  if (posts.edges.length < 1) {
    if (!emptyTitle) {
      return null
    }

    title = emptyTitle
  }
  return (
    <Box __css={styles}>
      <Heading as="h4">{title}</Heading>
      <Box className="container">
        {posts.edges.map(({ node }) => (
          <PostComponent key={node.id} post={node} />
        ))}
      </Box>
    </Box>
  )
}

const Topic = ({ data, variant }) => {
  const {
    section: {
      frontmatter: { title, description, cover, noCover },
    },
    published,
    future,
  } = data

  const tags = [...countTags(published), ...countTags(future)]
  const hasPosts = published.edges.length || future.edges.length
  const image = getImage(cover)
  const styles = useStyleConfig('Topic', { variant })
  const { t } = useTranslation()

  return (
    <Box __css={styles}>
      <Heading as="h2">{title}</Heading>
      <Heading as="h3">{description}</Heading>
      {!noCover && image && (
        <Image
          className="page_image"
          as={GatsbyImage}
          image={image}
          alt={title}
        />
      )}
      {hasPosts ? (
        <Box>
          <Wordcloud tags={tags} />
          <PostsContainer
            component={PublishedPost}
            posts={published}
            title={t('publishedPosts')}
            emptyTitle={t('noPublishedPosts')}
          />
          <PostsContainer
            component={FuturePost}
            posts={future}
            title={t('futurePosts')}
          />
        </Box>
      ) : (
        <Box>
          <Text>{t('noPosts')}</Text>
        </Box>
      )}
    </Box>
  )
}

export default Topic
