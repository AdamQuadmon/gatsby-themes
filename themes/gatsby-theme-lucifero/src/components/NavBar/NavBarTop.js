import React from 'react'
import {
  Box,
  Center,
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

const NavBarTop = ({ variant, mobileNav, site, alternatePages, ...rest }) => {
  const styles = useStyleConfig('NavBarTop', { variant })
  const { organization, socials } = site
  const { address, telephone } = organization
  const { streetAddress } = address
  const addressPlace = getPlaceAddressShort(address)
  const { whatsapp } = socials

  return (
    <Center __css={styles} {...rest}>
      <ThemeSwitcher d={{ base: 'flex', md: 'none' }} />
      <Box className="address">
        <Text as="span">{streetAddress}</Text>
        <br />
        <Text as="span">{addressPlace}</Text>
      </Box>
      <Spacer />
      <LinkExternal className="phoneNumber" href={`https://wa.me/${whatsapp}`}>
        <Text as="span">{telephone}</Text>
      </LinkExternal>
      <Spacer />
      <HStack>
        <LangSelector alternatePages={alternatePages} />
        <SocialButtons socials={socials} />
      </HStack>
      <Spacer d={{ base: 'flex', md: 'none' }} />
      <Hamburger mobileNav={mobileNav} />
    </Center>
  )
}

export default NavBarTop
