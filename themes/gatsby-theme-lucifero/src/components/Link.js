import React, { forwardRef } from 'react'
import {
  Link as ChakraLink,
  LinkOverlay as ChakraLinkOverlay,
  useStyleConfig,
} from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import { Link as TranslateLink } from 'gatsby-plugin-react-i18next'

const ChakraTranslatedLink = forwardRef(({ variant, ...rest }, ref) => {
  const styles = useStyleConfig('Link', { variant })

  return <ChakraLink __css={styles} as={TranslateLink} {...rest} />
})

const Link = forwardRef(({ variant, ...rest }, ref) => {
  const styles = useStyleConfig('Link', { variant })

  return <ChakraLink innerRef={ref} as={GatsbyLink} __css={styles} {...rest} />
})

const LinkTranslated = forwardRef((props, ref) => {
  return <ChakraTranslatedLink innerRef={ref} {...props} />
})

const LinkOverlay = forwardRef(({ variant, ...rest }, ref) => {
  const styles = useStyleConfig('Link', { variant })

  return (
    <ChakraLinkOverlay
      innerRef={ref}
      as={GatsbyLink}
      __css={styles}
      {...rest}
    />
  )
})

const LinkExternal = ({ variant, ...rest }) => {
  const styles = useStyleConfig('Link', { variant })

  return <ChakraLink __css={styles} isExternal {...rest} />
}

export { Link, LinkOverlay, LinkTranslated, LinkExternal }
