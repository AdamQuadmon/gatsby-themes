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
import ActionButtons from '../ActionButtons'
import ThemeSwitcher from './ThemeSwitcher'
import NavMobile from './NavMobile'
import NavBarTop from './NavBarTop'

const NavBar = ({
  variant,
  navItems,
  organization,
  alternatePages,
  ...rest
}) => {
  const styles = useStyleConfig('NavBar', { variant })
  const mobileNav = useDisclosure()
  const btnRef = React.useRef()
  const { name } = organization

  return (
    <>
      <NavBarTop
        organization={organization}
        mobileNav={mobileNav}
        alternatePages={alternatePages}
      />
      <chakra.header __css={styles} {...rest}>
        <Flex
          className="nav-container"
          justifyContent="space-between"
          mx="auto"
        >
          <Logo title={name} variant="navbar" />
          <HStack
            className="nav-items"
            display={{ base: 'none', md: 'inline-flex' }}
            spacing={1}
            alignSelf="flex-end"
          >
            {navItems.map((navItem) => (
              <NavItem key={navItem.href} {...navItem} />
            ))}
          </HStack>
          <Spacer />
          <Box display="flex" alignItems="center">
            <ThemeSwitcher d={{ base: 'none', md: 'flex' }} />
            <ActionButtons />
          </Box>
        </Flex>
        <NavMobile mobileNav={mobileNav} btnRef={btnRef} navItems={navItems} />
      </chakra.header>
    </>
  )
}

export default NavBar
