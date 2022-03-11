import React from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useStyleConfig,
} from '@chakra-ui/react'

import Logo from '../Logo'
import NavMobileItem from './NavMobileItem'
import ActionButtons from '../ActionButtons'

const NavMobile = ({ variant, mobileNav, navItems, organization, btnRef }) => {
  const styles = useStyleConfig('NavMobile', { variant })
  const { isOpen, onClose } = mobileNav
  const { name } = organization

  return (
    <Drawer
      __css={styles}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Logo title={name} variant="navbar" />
        </DrawerHeader>

        <DrawerBody>
          {navItems.map((navItem) => (
            <NavMobileItem key={navItem.label} {...navItem} />
          ))}
        </DrawerBody>

        <DrawerFooter>
          <ActionButtons />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default NavMobile
