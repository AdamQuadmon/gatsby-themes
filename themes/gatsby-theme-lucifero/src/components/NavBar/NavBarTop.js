import React from 'react'
import {
  Box,
  Center,
  Container,
  Spacer,
  HStack,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'
import { LinkExternal } from '../Link'
import LangSelector from '../LangSelector'
import SocialButtons from '../SocialButtons'
import { getPlaceAddressShort } from '../Seo/Schema/PlacesAndOrganizations'
import Hamburger from './Hamburger'
import ThemeSwitcher from './ThemeSwitcher'

const NavBarTop = ({
  variant,
  mobileNav,
  organization,
  alternatePages,
  ...rest
}) => {
  const styles = useStyleConfig('NavBarTop', { variant })
  const { address, telephone, socials } = organization
  const { streetAddress } = address
  const addressPlace = getPlaceAddressShort(address)
  const { whatsapp } = socials

  return (
    <Box __css={styles} {...rest}>
      <Container as={Center} maxW="container.xl">
        <ThemeSwitcher d={{ base: 'flex', md: 'none' }} />
        <Box className="address">
          <Text as="span">{streetAddress}</Text>
          <br />
          <Text as="span">{addressPlace}</Text>
        </Box>
        <Spacer />
        <LinkExternal
          className="phoneNumber"
          href={`https://wa.me/${whatsapp}`}
        >
          <Text as="span">{telephone}</Text>
        </LinkExternal>
        <Spacer />
        <HStack>
          <LangSelector alternatePages={alternatePages} />
          <SocialButtons socials={socials} />
        </HStack>
        <Spacer d={{ base: 'flex', md: 'none' }} />
        <Hamburger mobileNav={mobileNav} />
      </Container>
    </Box>
  )
}

export default NavBarTop
