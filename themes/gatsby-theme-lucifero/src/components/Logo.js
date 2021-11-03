import React from 'react'
import { Button, useStyleConfig } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'

import LogoImage from './LogoImage'

const Logo = ({ title, variant }) => {
  const styles = useStyleConfig('Logo', { variant })
  return (
    <Button
      __css={styles}
      as={GatsbyLink}
      alt={title}
      h={'100%'}
      variant="ghost"
      to="/"
    >
      <LogoImage />
    </Button>
  )
}

export default Logo
