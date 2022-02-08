import React from 'react'

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
  const { data, pageContext } = pageData
  const { page, alternatePages } = data
  const { breadcrumb, language } = pageContext
  const crumbs = breadcrumb ? breadcrumb.crumbs : []
  const navItems = useNavItems(language)
  const site = useSiteMetadata()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Seo page={page} crumbs={crumbs} {...rest} />
      <Flex flexDirection="column" minHeight="100vh">
        <NavBar
          navItems={navItems}
          site={site}
          alternatePages={alternatePages.nodes}
        />
        <Box as="main" flex="1 1 auto">
          <Container maxW="container.lg">
            {breadcrumb && <Breadcrumbs breadcrumb={breadcrumb} />}
            {children}
          </Container>
        </Box>
        <Footer
          site={site}
          navItems={navItems}
          alternatePages={alternatePages.nodes}
        />
        <CookieConsent />
      </Flex>
    </ErrorBoundary>
  )
}

export default LayoutContainer
