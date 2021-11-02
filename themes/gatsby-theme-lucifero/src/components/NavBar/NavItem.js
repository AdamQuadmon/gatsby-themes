import React from 'react'
import { Box, Button, Container, useStyleConfig } from '@chakra-ui/react'

import { Link as GatsbyLink } from 'gatsby'
import { IoIosArrowDown } from 'react-icons/io'

import NavItemSub from './NavItemSub'

const NavItem = ({ label, children, href, variant, ...rest }) => {
  const styles = useStyleConfig('NavItem', { variant })

  return (
    <Box __css={styles} role="group" {...rest}>
      <Button
        as={GatsbyLink}
        to={href}
        activeClassName={'active'}
        partiallyActive
        rightIcon={children && <IoIosArrowDown />}
      >
        {label}
      </Button>
      {children && (
        <Box
          className="sub_box"
          pos="absolute"
          left={0}
          w="full"
          display="none"
          zIndex="2"
          _groupHover={{ display: 'block' }}
        >
          <Container maxW="container.lg" display="flex">
            {children.map(({ node }) => (
              <NavItemSub item={node} key={node.frontmatter.slug} />
            ))}
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default NavItem
