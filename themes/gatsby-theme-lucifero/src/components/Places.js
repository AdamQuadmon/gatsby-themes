import React from 'react'
import { I18nextContext, useTranslation } from 'gatsby-plugin-react-i18next'
import { VStack } from '@chakra-ui/react'
import Cards from './Cards'
import { useNearby } from '../hooks/use-nearby'

const Places = ({ section, variant, ...rest }) => {
  const { language } = React.useContext(I18nextContext)
  const nearby = useNearby(language)
  const sections = section ? [section] : Object.keys(nearby)
  const showTitle = !section

  return (
    <VStack spacing={8}>
      {sections.map((section) => (
        <PlacesSection
          key={section}
          section={section}
          nearby={nearby}
          showTitle={showTitle}
          {...rest}
        />
      ))}
    </VStack>
  )
}

export default Places

const PlacesSection = ({ section, nearby, showTitle, ...rest }) => {
  const { t } = useTranslation()
  const to = getNearbySlug(nearby[section])
  const title = showTitle ? t(section) : ''
  return (
    <Cards
      to={to}
      title={title}
      nodes={nearby[section]}
      variation="set"
      {...rest}
    />
  )
}

const getNearbySlug = (edges) => {
  if (!edges.length) return null
  let slugParts = edges[0].node.slug.split('/')
  slugParts.pop()
  return `${slugParts.join('/')}`
}
