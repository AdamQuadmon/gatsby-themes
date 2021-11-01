import * as React from 'react'
import { graphql } from 'gatsby'
import { Heading, Link, Text } from '@chakra-ui/react'
import {
  Link as GatsbyLink,
  Trans,
  useTranslation,
} from 'gatsby-plugin-react-i18next'
import Layout from '../components/LayoutContainer'
import Seo from '../components/Seo'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title={t('404notFound')} pathname="404" />
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
      <Link as={GatsbyLink} to="/">
        <Trans>goHome</Trans>
      </Link>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
