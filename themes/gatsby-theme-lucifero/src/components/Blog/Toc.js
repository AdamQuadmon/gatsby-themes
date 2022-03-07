// check also https://github.com/makotot/GhostUI
// https://github.com/emgoto/emgoto.com/blob/master/src/components/table-of-contents/
import React, { useState } from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  Box,
  List,
  ListIcon,
  ListItem,
  Heading,
  Link,
  useStyleConfig,
} from '@chakra-ui/react'

import { BsCaretRightFill } from 'react-icons/bs'
import { BsDot } from 'react-icons/bs'

import {
  topMargin,
  useIntersectionObserver,
  useHeadingsData,
} from '../../hooks/use-intersectionObserver'

const TableOfContents = ({ tableOfContents, variant }) => {
  const styles = useStyleConfig('Toc', { variant })
  const { t } = useTranslation()
  const { items } = tableOfContents
  const [activeIndex, setActiveIndex] = useState(-1)
  const { getIndexFromId, nestedHeadings } = useHeadingsData()
  useIntersectionObserver(getIndexFromId, setActiveIndex)

  return (
    <Box id="toc-wrapper" __css={styles}>
      <Heading as="h6" size="md" mt="2">
        {t('toc')}
      </Heading>
      <HeadingsList
        activeIndex={activeIndex}
        headings={nestedHeadings.length > 0 ? nestedHeadings : items}
      />
    </Box>
  )
}

export default TableOfContents

const HeadingsList = ({ headings, activeIndex }) => (
  <List className="toc_list" spacing={3}>
    {headings.map((heading) => (
      <HeadingLink
        heading={heading}
        activeIndex={activeIndex}
        key={heading.url}
      >
        {heading.items && heading.items.length > 0 && (
          <List spacing={2}>
            {heading.items.map((child) => (
              <HeadingLink
                heading={child}
                activeIndex={activeIndex}
                key={child.url}
              />
            ))}
          </List>
        )}
      </HeadingLink>
    ))}
  </List>
)

const HeadingLink = ({ heading, activeIndex, children }) => {
  const isActive = activeIndex === heading.index
  const Icon = isActive ? BsCaretRightFill : BsDot
  const className = isActive ? 'active_toc' : null

  return (
    <ListItem className={className}>
      <Link
        href={heading.url}
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          const element = document.querySelector(heading.url)
          const offset = window.pageYOffset + topMargin
          const y = element.getBoundingClientRect().top + offset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }}
      >
        <ListIcon as={Icon} size="sm" />
        {heading.title}
      </Link>
      {children}
    </ListItem>
  )
}
