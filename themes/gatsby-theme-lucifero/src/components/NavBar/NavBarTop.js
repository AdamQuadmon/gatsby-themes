import React from 'react'
import {
  Box,
  Center,
  Spacer,
  HStack,
  Text,
  Link,
  useStyleConfig,
} from '@chakra-ui/react'
import { Trans } from 'gatsby-plugin-react-i18next'
import LangSelector from '../LangSelector'
import Hamburger from './Hamburger'
import ThemeSwitcher from './ThemeSwitcher'
import SocialButtons from '../SocialButtons'

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
      <Link
        className="phoneNumber"
        href={`https://wa.me/${whatsapp}`}
        isExternal
      >
        <Text as="span">{cellNumber}</Text>
      </Link>
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
