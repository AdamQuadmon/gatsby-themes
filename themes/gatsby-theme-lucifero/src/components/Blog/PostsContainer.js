import React from 'react'

import { Box, Heading, useStyleConfig } from '@chakra-ui/react'

import FlexContainer from '../FlexContainer'
import PostCard from './PostCard'

const PostsContainer = ({ posts, title, emptyTitle, variant }) => {
  const styles = useStyleConfig('PostsContainer', { variant })
  if (posts.edges.length < 1) {
    if (!emptyTitle) {
      return null
    }

    title = emptyTitle
  }
  return (
    <Box __css={styles}>
      <Heading as="h4">{title}</Heading>
      <FlexContainer>
        {posts.edges.map(({ node }) => (
          <PostCard key={node.id} node={node} variant={variant} />
        ))}
      </FlexContainer>
    </Box>
  )
}

export default PostsContainer
