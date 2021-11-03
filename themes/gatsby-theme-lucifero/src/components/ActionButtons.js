import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { Trans } from 'gatsby-plugin-react-i18next'

const ActionButtons = () => {
  return (
    <HStack spacing={1}>
      <Button
        as="a"
        href="https://github.com/AdamQuadmon/gatsby-themes"
        variant="outline"
        size="sm"
      >
        <Trans>goToGitHub</Trans>
      </Button>
      <Button
        as="a"
        href="https://github.com/AdamQuadmon/gatsby-themes/tree/master/themes/gatsby-theme-lucifero"
        variant="cta"
        size="sm"
      >
        <Trans>goToHell</Trans>
      </Button>
    </HStack>
  )
}

export default ActionButtons
