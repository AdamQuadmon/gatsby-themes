import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'
import { ReactComponent as LogoImage } from '../images/lucifero-logo.svg'

const Logo = ({ title }) => {
  return (
    <Button
      as={GatsbyLink}
      alt={title}
      h={'100%'}
      variant="ghost"
      className="logo"
      to="/"
    >
      <LogoImage />
    </Button>
  )
}

export default Logo
