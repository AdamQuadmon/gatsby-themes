import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, useStyleConfig } from '@chakra-ui/react'

import MDXProvider from '../MdxProvider'
import FlexContainer from '../FlexContainer'
import PostCard from './PostCard'
import Title from './Title'
import PostCount, { getCounted } from './PostCount'
import PostsContainer from './PostsContainer'

const Sections = ({ data, field, variant }) => {
  const { section, sections, published, future, latest } = data

  if (!section) {
    return null
  }

  const { body, frontmatter } = section
  const { title, description } = frontmatter
  const counts = getCounted(published, future)
  const { t } = useTranslation()
  const styles = useStyleConfig('Sections', { variant })

  return (
    <Box __css={styles}>
      <Title title={title} subtitle={description}></Title>
      <FlexContainer>
        {sections.edges.map(({ node }) => {
          const { id, fields } = node
          const TitleSide = <PostCount count={counts[fields[field]]} />
          return (
            <PostCard
              key={id}
              node={node}
              titleSide={TitleSide}
              titleSize="xl"
              variant="sections"
            />
          )
        })}
      </FlexContainer>
      <MDXProvider frontmatter={frontmatter} body={body} />
      <PostsContainer
        variant="latest"
        posts={latest}
        title={t('latestPosts')}
      />
    </Box>
  )
}

export default Sections
