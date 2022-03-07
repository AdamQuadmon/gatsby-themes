import React from 'react'
import { Box, Button, Container, Flex, useStyleConfig } from '@chakra-ui/react'
import { IoIosArrowDown } from 'react-icons/io'

import { Link } from '../Link'
import NavItemSub from './NavItemSub'

const NavItem = ({ label, children, href, variant, ...rest }) => {
  const styles = useStyleConfig('NavItem', { variant })

  return (
    <Box __css={styles} role="group" {...rest}>
      <Button
        as={Link}
        to={href}
        className="label"
        activeClassName={'active'}
        partiallyActive
        rightIcon={children && <IoIosArrowDown />}
      >
        {label}
      </Button>
      {children && (
        <Box className="sub_box" _groupHover={{ display: 'block' }}>
          <Container maxW="container.lg" className="items_box" as={Flex}>
            {children.map(({ node }) => (
              <NavItemSub item={node} key={node.slug} />
            ))}
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default NavItem
