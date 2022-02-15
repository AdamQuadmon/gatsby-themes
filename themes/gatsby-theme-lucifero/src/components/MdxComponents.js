import React from 'react'

import {
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { customComponents } from './MdxCustomComponents'
import Image from './Image'
import Swipe from './Images/Swipe'
import { Link, LinkTranslated, LinkExternal } from './Link'

const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  if (isInternalLink) {
    return <LinkTranslated to={href} variant="mdx" {...props} />
  }

  return (
    <LinkExternal variant="mdx" {...props}>
      {props.children}
    </LinkExternal>
  )
}
// For style images use MDXProvider `figure` and `figcaption` html elements
// as we use gatsby-remark-images plugin to render MDX images
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images
const h1 = (props) => (
  <Heading as="h1" variant="mdx" size="4xl" {...props} lineHeight="1.2" />
)
const h2 = (props) => <Heading as="h2" size="2xl" variant="mdx" {...props} />
const h3 = (props) => <Heading as="h3" size="xl" variant="mdx" {...props} />
const h4 = (props) => <Heading as="h4" size="lg" variant="mdx" {...props} />
const h5 = (props) => <Heading as="h5" size="md" variant="mdx" {...props} />
const h6 = (props) => <Heading as="h6" size="sm" variant="mdx" {...props} />
const p = (props) => <Text variant="mdx" {...props} />
const ul = (props) => <UnorderedList variant="mdx" {...props} />
const ol = (props) => <OrderedList variant="mdx" {...props} />
const li = (props) => <ListItem variant="mdx" {...props} />

export const baseComponents = {
  a: CustomLink,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li,
  Image,
  Swipe,
  Link,
}
export const mdxComponents = { ...baseComponents, ...customComponents }
