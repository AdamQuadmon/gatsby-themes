import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'

const NavMobileItem = ({ label, children, href }) => {
  return (
    <Flex
      py={2}
      as={GatsbyLink}
      to={`/${href}`}
      justify={'space-between'}
      align={'center'}
      w="full"
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Button className="item_button" w="100%">
        {label}
      </Button>
    </Flex>
  )
}

export default NavMobileItem
