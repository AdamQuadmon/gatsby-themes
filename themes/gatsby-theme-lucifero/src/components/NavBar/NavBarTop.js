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
import Hamburger from './Hamburger'
import ThemeSwitcher from './ThemeSwitcher'

const NavBarTop = ({ variant, mobileNav, data, ...rest }) => {
  const styles = useStyleConfig('NavBarTop', { variant })
  const { organization, socials } = data
  const { address1, address2short, cellNumber } = organization
  const { whatsapp } = socials
  return (
    <Center __css={styles} {...rest}>
      <ThemeSwitcher d={{ base: 'flex', md: 'none' }} />
      <Box className="address">
        <Text as="span">{address1}</Text>
        <br />
        <Text as="span">{address2short}</Text>
      </Box>
      <Spacer />
      <LinkExternal className="phoneNumber" href={`https://wa.me/${whatsapp}`}>
        <Text as="span">{cellNumber}</Text>
      </LinkExternal>
      <Spacer />
      <HStack>
        <LangSelector />
        <SocialButtons socials={socials} />
      </HStack>
      <Spacer d={{ base: 'flex', md: 'none' }} />
      <Hamburger mobileNav={mobileNav} />
    </Center>
  )
}

export default NavBarTop
