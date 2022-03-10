import React from 'react'
import {
  Box,
  Container,
  Spacer,
  Flex,
  Stack,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'
import { Trans } from 'gatsby-plugin-react-i18next'
import { Link } from './Link'
import Logo from './Logo'
import GMap from './GMap'
import SocialButtons from './SocialButtons'
import LangSelector from './LangSelector'
import { getPlaceAddress } from './Seo/Schema/PlacesAndOrganizations'

// https://chakra-templates.dev/page-sections/footer
const Footer = ({
  organization,
  website,
  navItems,
  alternatePages,
  variant,
}) => {
  const styles = useStyleConfig('Footer', { variant })
  const { legalName, address, vatID, mapUrl, socials } = organization
  const { copyright } = website
  const { streetAddress } = address
  const addressPlace = getPlaceAddress(address)
  return (
    <Box __css={styles}>
      <Container as={Stack} maxW={'6xl'}>
        <Flex className="first_row">
          <Logo title={legalName} w="full" />
          <Spacer />
          <Stack direction={['column', 'row']} alignItems="end">
            <LangSelector showLabel alternatePages={alternatePages} />
            <Text as="span">
              <Trans>socials</Trans>
            </Text>
            <SocialButtons socials={socials} />
          </Stack>
        </Flex>
        <Flex>
          <Box className="first_column">
            <Text className="subtitle">{legalName}</Text>
            <Text>{streetAddress}</Text>
            <Text className="address2">{addressPlace}</Text>
            <Text>
              <Text as="span" className="vat_label">
                <Trans>vat</Trans>{' '}
              </Text>
              <Text as="span" className="vat_value">
                {vatID}
              </Text>
            </Text>
          </Box>
          <Stack className="second_column">
            {navItems.map((navItem) => (
              <Link key={navItem.href} to={navItem.href}>
                {navItem.label}
              </Link>
            ))}
          </Stack>
        </Flex>
        <GMap map={mapUrl} />
        <Text className="copyright">
          {copyright}-{new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
