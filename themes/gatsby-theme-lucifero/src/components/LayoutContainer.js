import React from 'react'

import { Box, Container, Flex } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextContext } from 'gatsby-plugin-react-i18next'

import Seo from '../components/Seo'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer'
import ErrorFallback from '../components/ErrorFallback'
import CookieConsent from '../components/CookieConsent'

import { useNavItems } from '../hooks/use-navItems'
import { useSiteMetadata } from '../hooks/use-siteMetadata'

const LayoutComponent = ({ children, ...rest }) => {
  const { language } = React.useContext(I18nextContext)
  const navItems = useNavItems(language)
  const data = useSiteMetadata()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Seo {...rest} />
      <Flex flexDirection="column" minHeight="100vh">
        <NavBar navItems={navItems} data={data} />
        <Box as="main" flex="1 1 auto">
          <Container maxW="container.lg">{children}</Container>
        </Box>
        <Footer data={data} navItems={navItems} />
        <CookieConsent />
      </Flex>
    </ErrorBoundary>
  )
}

export default LayoutComponent
