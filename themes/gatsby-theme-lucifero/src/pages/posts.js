import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/LayoutContainer'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import Breadcrumbs from '../components/Breadcrumbs'

const PostsPage = ({ data, pageContext }) => {
  const { edges } = data.posts
  const { breadcrumb } = pageContext
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
  // TODO add collections meta
  return (
    <Layout page={{ name: 'posts' }} crumbs={breadcrumb.crumbs}>
      <Breadcrumbs breadcrumb={breadcrumb} />
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
                          const { headline } = node
                          return <li>{headline}</li>
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
    page: page(i18nPath: { eq: "/posts" }, language: { eq: $language }) {
      ...PageNode
    }
    alternatePages: allPage(
      filter: { i18nPath: { eq: "/posts" }, language: { ne: $language } }
    ) {
      ...PageAlternateNodes
    }
    posts: allPage(
      filter: { type: { eq: "post" }, language: { eq: $language } }
      sort: { fields: [slug], order: ASC }
    ) {
      ...PageEdges
    }
  }
`
