import React from 'react'
import {
  Box,
  chakra,
  Flex,
  HStack,
  Spacer,
  useDisclosure,
  useStyleConfig,
} from '@chakra-ui/react'

import Logo from '../Logo'
import NavItem from './NavItem'
import ThemeSwitcher from './ThemeSwitcher'
import NavMobile from './NavMobile'
import NavBarTop from './NavBarTop'

const NavBar = ({ variant, navItems, data, ...rest }) => {
  const styles = useStyleConfig('NavBar', { variant })
  const mobileNav = useDisclosure()
  const btnRef = React.useRef()
  const { name } = data.organization
  return (
    <>
      <NavBarTop data={data} mobileNav={mobileNav} />
      <chakra.header __css={styles} {...rest}>
        <Flex justifyContent="space-between" mx="auto">
          <Logo title={name} />
          <Box
            display={{ base: 'none', md: 'inline-flex' }}
            alignItems="center"
          >
            <HStack spacing={1}>
              {navItems.map((navItem) => (
                <NavItem key={navItem.label} {...navItem} />
              ))}
            </HStack>
          </Box>
          <Spacer />
          <Box display="flex" alignItems="center">
            <ThemeSwitcher d={{ base: 'none', md: 'flex' }} />
          </Box>
        </Flex>
        <NavMobile mobileNav={mobileNav} btnRef={btnRef} navItems={navItems} />
      </chakra.header>
    </>
  )
}

export default NavBar
