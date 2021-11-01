import React from 'react'
import { Box, Heading, VStack, Text, useStyleConfig } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'

const Hero = ({ variant }) => {
  const { t } = useTranslation()
  const styles = useStyleConfig('Hero', { variant })
  return (
    <VStack __css={styles}>
      <Heading as="h1">
        <Trans>heroTitle</Trans>
        <Text as={'span'}>
          <Trans>heroTitleHighlight</Trans>
        </Text>
      </Heading>
      <VStack className="message">
        <Heading as="h2">
          <Text as="span">
            <Trans>heroMessage1Span</Trans>
          </Text>
          <Trans>heroMessage1</Trans>
        </Heading>
        <Heading as="h3">
          <Text as="span">
            <Trans>heroMessage2Span</Trans>
          </Text>
          <Trans>heroMessage2</Trans>
        </Heading>
      </VStack>
      <Box w={'100%'}>
        <StaticImage
          src="../images/astarte.jpeg"
          alt={t('heroImageAlt')}
          placeholder="blurred"
          layout="fullWidth"
        />
      </Box>
    </VStack>
  )
}

export default Hero
