import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { Link } from '../Link'

const NavMobileItem = ({ label, children, href }) => {
  return (
    <Flex
      py={2}
      as={Link}
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
