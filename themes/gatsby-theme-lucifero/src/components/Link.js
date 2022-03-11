import React, { forwardRef } from 'react'
import {
  Link as ChakraLink,
  LinkOverlay as ChakraLinkOverlay,
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as TranslateLink } from 'gatsby-plugin-react-i18next'

const ChakraTranslatedLink = forwardRef(({ variant, ...rest }, ref) => {
  return <ChakraLink variant={variant} as={TranslateLink} {...rest} />
})

const Link = forwardRef(({ variant, ...rest }, ref) => {
  return (
    <ChakraLink innerRef={ref} as={GatsbyLink} variant={variant} {...rest} />
  )
})

// TODO: this works only for root page as we are using translated slug in pages
const LinkTranslated = forwardRef((props, ref) => {
  return <ChakraTranslatedLink innerRef={ref} {...props} />
})

const LinkOverlay = forwardRef(({ variant, ...rest }, ref) => {
  return (
    <ChakraLinkOverlay
      innerRef={ref}
      as={GatsbyLink}
      variant={variant}
      {...rest}
    />
  )
})

const LinkExternal = ({ variant, ...rest }) => {
  return <ChakraLink variant={variant} isExternal {...rest} />
}

export { Link, LinkOverlay, LinkTranslated, LinkExternal }
