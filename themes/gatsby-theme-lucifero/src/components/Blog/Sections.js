import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, useStyleConfig } from '@chakra-ui/react'

import MDXWrapper from '../MDXWrapper'
import FlexContainer from '../FlexContainer'
import PostCard from './PostCard'
import Title from './Title'
import PostCount, { getCounted } from './PostCount'
import PostsContainer from './PostsContainer'

const Sections = ({ pageData, variant }) => {
  const {
    data: { page, sections, future, latest, totals },
  } = pageData

  if (!page) {
    return null
  }

  const { headline, description, mdx } = page
  const body = mdx ? mdx.body : description

  const counts = getCounted(totals)
  console.log(counts)
  const { t } = useTranslation()
  const styles = useStyleConfig('Sections', { variant })
  const posts = sections.edges ? sections.edges : sections

  return (
    <Box __css={styles}>
      <Title title={headline} subtitle={description}></Title>
      <FlexContainer>
        {posts.map(({ node }) => {
          const { id, fields } = node
          // const TitleSide = <PostCount count={counts[fields[field]]} />
          return (
            <PostCard
              key={id}
              node={node}
              // titleSide={TitleSide}
              titleSize="xl"
              variant="sections"
            />
          )
        })}
      </FlexContainer>
      <MDXWrapper body={body} />
      <PostsContainer
        variant="latest"
        posts={latest}
        title={t('latestPosts')}
      />
    </Box>
  )
}

export default Sections
