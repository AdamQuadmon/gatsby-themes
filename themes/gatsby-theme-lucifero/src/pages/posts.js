import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import { Box, Flex, Heading } from '@chakra-ui/layout'

const PostsPage = ({ data }) => {
  const { edges } = data.posts
  let nodes = {}

  edges.forEach(({ node }) => {
    const { area, topic, slug } = node
    if (area && topic) {
      if (!nodes[area]) nodes[area] = {}
      if (!nodes[area][topic]) nodes[area][topic] = []
      nodes[area][topic].push(node)
    }
  })

  const areas = Object.keys(nodes)

  return (
    <Layout page={{ meta: { title: 'posts' } }}>
      <Flex>
        {areas.map((areaKey) => {
          const area = nodes[areaKey]
          const topics = Object.keys(area)

          return (
            <Box w={1 / 4}>
              <Heading>{areaKey}</Heading>
              <ul>
                {topics.map((topicKey) => {
                  const posts = nodes[areaKey][topicKey]
                  return (
                    <li>
                      <Heading>{topicKey}</Heading>
                      <ul>
                        {posts.map((node) => {
                          const { title } = node.meta
                          return <li>{title}</li>
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </Box>
          )
        })}
      </Flex>
    </Layout>
  )
}

export default PostsPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    posts: allBlogPost(
      filter: { type: { eq: "post" } }
      sort: { fields: fileAbsolutePath, order: ASC }
    ) {
      ...PostsEdges
    }
  }
`
