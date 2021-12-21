import React from 'react'

import { Flex, useStyleConfig } from '@chakra-ui/react'

const FlexContainer = ({ children, variant }) => {
  const styles = useStyleConfig('FlexContainer', { variant })

  return <Flex __css={styles}>{children}</Flex>
}

export default FlexContainer
