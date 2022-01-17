import React from 'react'
import { Button, useStyleConfig } from '@chakra-ui/react'
import { LinkTranslated } from './Link'

import LogoImage from './LogoImage'

const Logo = ({ title, variant }) => {
  const styles = useStyleConfig('Logo', { variant })
  return (
    <Button
      __css={styles}
      as={LinkTranslated}
      alt={title}
      h={'100%'}
      variant="ghost"
      alignSelf="flex-end"
      to="/"
    >
      <LogoImage />
    </Button>
  )
}

export default Logo
