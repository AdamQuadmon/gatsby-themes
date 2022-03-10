// check also https://github.com/makotot/GhostUI
// https://github.com/emgoto/emgoto.com/blob/master/src/components/table-of-contents/
// TODO: fix component needs to restart develop for changes
import React, { useState } from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  Box,
  List,
  ListIcon,
  ListItem,
  Heading,
  Link,
  useDisclosure,
  useStyleConfig,
} from '@chakra-ui/react'

import { BsCaretRightFill } from 'react-icons/bs'
import { BsDot } from 'react-icons/bs'

import {
  topMargin,
  useIntersectionObserver,
  useHeadingsData,
} from '../../hooks/use-intersectionObserver'

// TODO: move `miniOffset` and `topMargin` and `miniWindowWidth` to config
const miniOffset = -170
const miniWindowWidth = 1024

const isMini = () => {
  return window.innerWidth < miniWindowWidth
}

const TableOfContents = ({ tableOfContents, variant }) => {
  const styles = useStyleConfig('Toc', { variant })
  const { t } = useTranslation()
  const { items } = tableOfContents
  const [activeIndex, setActiveIndex] = useState(-1)
  const { getIndexFromId, nestedHeadings } = useHeadingsData()
  const { isOpen, onToggle } = useDisclosure()
  useIntersectionObserver(getIndexFromId, setActiveIndex)

  const onTocClick = (e) => {
    if (!isMini()) return
    if (!isOpen) e.preventDefault()
    onToggle(e)
  }

  return (
    <Box id="toc-wrapper" __css={styles} onClick={onTocClick}>
      <Heading as="h6" size="md" mt="2">
        {t('toc')}
      </Heading>
      <Box className={isOpen ? 'tocOpen' : 'tocClosed'}>
        <HeadingsList
          activeIndex={activeIndex}
          headings={nestedHeadings.length > 0 ? nestedHeadings : items}
        />
      </Box>
    </Box>
  )
}

export default TableOfContents

const HeadingsList = ({ activeIndex, headings }) => (
  <List className="toc_list" spacing={3}>
    {headings.map((heading) => (
      <HeadingLink
        key={heading.url}
        heading={heading}
        activeIndex={activeIndex}
      >
        {heading.items && heading.items.length > 0 && (
          <List spacing={2}>
            {heading.items.map((subHeading) => (
              <HeadingLink
                key={subHeading.url}
                heading={subHeading}
                activeIndex={activeIndex}
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

  const onHeadingClick = (e) => {
    e.preventDefault()
    const offset = window.pageYOffset + topMargin + (isMini() ? miniOffset : 0)
    const element = document.querySelector(heading.url)
    const y = element.getBoundingClientRect().top + offset

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <ListItem className={className}>
      <Link size="sm" href={heading.url} onClick={onHeadingClick}>
        <ListIcon as={Icon} size="sm" />
        {heading.title}
      </Link>
      {children}
    </ListItem>
  )
}
