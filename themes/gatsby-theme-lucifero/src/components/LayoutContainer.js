import React from 'react'
import { merge, capitalize } from 'lodash'
import { Box, Container, Flex } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'

import Seo from '../components/Seo/Seo'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'
import ErrorFallback from '../components/ErrorFallback'
import CookieConsent from '../components/CookieConsent'

import { useNavItems } from '../hooks/use-navItems'
import { useSiteMetadata } from '../hooks/use-siteMetadata'

const LayoutContainer = ({ pageData, children, ...rest }) => {
  let {
    data: { page },
  } = pageData
  const {
    data: { alternatePages },
    pageContext: { breadcrumb, language },
  } = pageData

  const site = useSiteMetadata()
  const { organization, languages } = site
  const { location } = breadcrumb
  const crumbs = getCrumbs(breadcrumb, languages)
  const navItems = useNavItems(language)

  const translation = getTranslation(site, page)
  merge(site.website, translation)

  const pageMeta = withDefaultMeta(site, page, crumbs, location)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Seo page={pageMeta} site={site} crumbs={crumbs} {...rest} />
      <Flex flexDirection="column" minHeight="100vh">
        <NavBar
          navItems={navItems}
          organization={organization}
          alternatePages={alternatePages.nodes}
        />
        <Box as="main" flex="1 1 auto">
          <Container maxW="container.lg">
            {!!crumbs.length && <Breadcrumbs crumbs={crumbs} />}
            {children}
          </Container>
        </Box>
        <Footer
          organization={organization}
          navItems={navItems}
          alternatePages={alternatePages.nodes}
        />
        <CookieConsent />
      </Flex>
    </ErrorBoundary>
  )
}

export default LayoutContainer

// TODO: move to helper

const getCrumbs = (breadcrumb, languages) => {
  let crumbs = breadcrumb ? breadcrumb.crumbs : null

  if (crumbs.length < 2) return []

  if (crumbs[1] && languages.includes(crumbs[1].crumbLabel)) {
    if (crumbs.length < 3) return []
    crumbs[0].pathname = crumbs[1].pathname
    crumbs.splice(1, 1)
  }

  return crumbs
}

const getTranslation = (site, page) => {
  const {
    defaultLanguage,
    website: { translations },
  } = site
  const language = (page && page.language) || defaultLanguage
  return translations.find((t) => t.language === language)
}

// name is the minimum needed page param
const withDefaultMeta = (site, page, crumbs, location) => {
  const {
    siteUrl,
    website: { author, ogImage, language, title, shortTitle, description },
  } = site

  const crumb = crumbs && crumbs[crumbs.length - 1]

  page = { ...page } || getDefaultPage(crumb, shortTitle, location)

  if (!page.language) page.language = language
  if (!page.author) page.author = author
  if (!page.image) page.image = ogImage
  if (!page.name) page.name = capitalize(page.slug.split('/').pop())
  if (!page.description) page.description = description
  if (!page.headline) page.headline = page.name || title
  if (!page.abstract) page.abstract = page.description
  if (!page.url)
    page.url = page.slug === '/' ? siteUrl : `${siteUrl}/${page.slug}`

  return page
}

const getDefaultPage = (crumb, defaultName, location) => {
  const name = (crumb && crumb.crumbLabel) || defaultName
  return {
    published: true,
    order: 666,
    type: 'website',
    area: null,
    topic: null,
    language: null,
    i18nPath: location.replace(/^\/(en|es)\//i, '/'),
    slug: location,
    name,
    headline: null,
    alternativeHeadline: null,
    description: '',
    tags: [],
    abstract: null,
    location: null,
    award: null,
    discussionUrl: null,
    dateCreated: null,
    dateModified: null,
    datePublished: null,
    author: null,
    image: null,
    navPage: false,
    noCover: true,
    url: null,
    mdx: null,
  }
}
