// check also https://github.com/makotot/GhostUI
// https://github.com/emgoto/emgoto.com/blob/master/src/components/table-of-contents/
import React, { useState } from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Box, List, ListIcon, ListItem, Heading, Link } from '@chakra-ui/react'

import { GiSelect } from 'react-icons/gi'
import { GrRadialSelected } from 'react-icons/gr'

import {
  useIntersectionObserver,
  useHeadingsData,
} from '../../hooks/use-intersectionObserver'

const HeadingLink = ({ heading, activeIndex, children }) => {
  const isActive = activeIndex === heading.index
  const Icon = isActive ? GrRadialSelected : GiSelect
  const color = isActive ? 'green.500' : 'gray.500'
  return (
    <ListItem>
      <Link
        variant={isActive ? 'active_toc' : null}
        href={heading.url}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector(heading.url).scrollIntoView({
            behavior: 'smooth',
          })
        }}
      >
        <ListIcon as={Icon} color={color} />
        {heading.title}
      </Link>
      {children}
    </ListItem>
  )
}

const HeadingsList = ({ headings, activeIndex }) => (
  <List spacing={3}>
    {headings.map((heading) => (
      <HeadingLink
        heading={heading}
        activeIndex={activeIndex}
        key={heading.url}
      >
        {heading.items && heading.items.length > 0 && (
          <List spacing={2} pl={4}>
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

const TableOfContents = ({ tableOfContents }) => {
  const { t } = useTranslation()
  const { items } = tableOfContents
  const [activeIndex, setActiveIndex] = useState(-1)
  const { getIndexFromId, nestedHeadings } = useHeadingsData()
  useIntersectionObserver(getIndexFromId, setActiveIndex)

  return (
    <Box id="toc-wrapper">
      <Heading as="h4">{t('toc')}</Heading>
      <HeadingsList
        activeIndex={activeIndex}
        headings={nestedHeadings.length > 0 ? nestedHeadings : items}
      />
    </Box>
  )
}

export default TableOfContents
