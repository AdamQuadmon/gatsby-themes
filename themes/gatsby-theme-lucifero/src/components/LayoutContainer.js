import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Box, Container, Flex } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextContext } from 'gatsby-plugin-react-i18next'

import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer'
import CookieConsent from '../components/CookieConsent'

import { useNavItems } from '../hooks/use-navItems'

// TODO make this nicer and move somwere else
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const LayoutComponent = (props) => {
  const { language } = React.useContext(I18nextContext)
  const navItems = useNavItems(language)
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            organization {
              name
              subTitle
              address1
              address2
              address2short
              iva
              copyright
              cellNumber
            }
            socials {
              facebook
              instagram
              whatsapp
            }
          }
        }
      }
    `
  )

  const data = site.siteMetadata

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Flex flexDirection="column" minHeight="100vh">
        <NavBar navItems={navItems} data={data} />
        <Box as="main" flex="1 1 auto">
          <Container maxW="container.lg">{props.children}</Container>
        </Box>
        <Footer data={data} navItems={navItems} />
        <CookieConsent />
      </Flex>
    </ErrorBoundary>
  )
}

export default LayoutComponent
