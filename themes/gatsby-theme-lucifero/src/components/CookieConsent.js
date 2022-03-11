import React from 'react'
import { useLocation } from '@reach/router'
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import { BellIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { Link } from './Link'

function isBrowser() {
  return typeof window !== 'undefined'
}

function getValue(key, defaultValue) {
  return isBrowser() && window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : defaultValue
}

function setValue(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function useStickyState(defaultValue, key) {
  const [value, setter] = React.useState(() => {
    return getValue(key, defaultValue)
  })

  React.useEffect(() => {
    setValue(key, value)
  }, [key, value])

  return [value, setter]
}

const CookieConsent = ({ variant }) => {
  const styles = useStyleConfig('CookieConsent', { variant })
  const location = useLocation()
  const { t } = useTranslation()

  if (isBrowser()) {
    initializeAndTrack(location)
  }

  const [bannerHidden, setBannerHidden] = useStickyState(
    false,
    'consentCookieHidden'
  )

  const EnableAnalytics = () => {
    document.cookie = 'gatsby-gdpr-google-analytics=true'
    document.cookie = 'gatsby-gdpr-facebook-pixel=true'
    setBannerHidden(true)
  }

  const DisableAnalytics = () => {
    document.cookie = 'gatsby-gdpr-google-analytics=false'
    document.cookie = 'gatsby-gdpr-facebook-pixel=false'
    setBannerHidden(true)
  }

  return (
    !bannerHidden && (
      <Box as="section" __css={styles}>
        <Stack
          className="cookie_stack"
          position="fixed"
          bottom="0"
          direction={{ base: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
        >
          <HStack spacing="3">
            <Icon as={BellIcon} fontSize="2xl" h="10" />
            <Box>
              <Heading size="sm" variant="cookie">
                <Trans>cookieTitle</Trans>
              </Heading>
              <Text>
                <Trans>cookieText</Trans>{' '}
                <Link to={t('linkCookies')}>
                  <Trans>cookieLink</Trans>
                </Link>
                .
              </Text>
            </Box>
          </HStack>
          <HStack spacing={1}>
            <Button
              onClick={DisableAnalytics}
              colorScheme="white"
              variant="outline"
              size="sm"
            >
              <Trans>cookieDecline</Trans>
            </Button>
            <Button onClick={EnableAnalytics} variant="cookie" size="sm">
              <Trans>cookieAccept</Trans>
            </Button>
          </HStack>
        </Stack>
      </Box>
    )
  )
}

export default CookieConsent
