import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/LayoutContainer'
import { LinkTranslated } from '../components/Link'

// TODO add 404 meta
const NotFoundPage = (pageData) => {
  const { t } = useTranslation()
  return (
    <Layout pageData={pageData}>
      <Heading>
        <Trans>404notFound</Trans>
      </Heading>
      <Text>
        <Trans>sorry</Trans>{' '}
        <Text as="span" role="img" aria-label="Pensive emoji">
          😔
        </Text>{' '}
        <Trans>notFound</Trans>
      </Text>
      <LinkTranslated to="/">
        <Trans>goHome</Trans>
      </LinkTranslated>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LocaleEdges
    }
    page: page(i18nPath: { eq: "/404" }, language: { eq: $language }) {
      ...PageNode
    }
    alternatePages: allPage(
      filter: { i18nPath: { eq: "/404" }, language: { ne: $language } }
    ) {
      ...PageAlternateNodes
    }
  }
`
