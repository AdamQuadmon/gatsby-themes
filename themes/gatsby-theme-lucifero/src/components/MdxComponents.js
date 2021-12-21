import React from 'react'

import {
  Heading,
  Link,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'

const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  if (isInternalLink) {
    return <Link as={GatsbyLink} to={href} variant="mdx" {...props} />
  }

  return (
    <Link variant="mdx" {...props}>
      {props.children}
    </Link>
  )
}
// For style images use MDXProvider `figure` and `figcaption` html elements
// as we use gatsby-remark-images plugin to render MDX images
// https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images
const h1 = (props) => <Heading as="h1" variant="mdx" {...props} />
const h2 = (props) => <Heading as="h2" variant="mdx" {...props} />
const h3 = (props) => <Heading as="h3" variant="mdx" {...props} />
const h4 = (props) => <Heading as="h4" variant="mdx" {...props} />
const h5 = (props) => <Heading as="h5" variant="mdx" {...props} />
const h6 = (props) => <Heading as="h6" variant="mdx" {...props} />
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
}
export const mdxComponents = { ...baseComponents }
