import React from 'react'
import { I18nextContext, useTranslation } from 'gatsby-plugin-react-i18next'
import { VStack } from '@chakra-ui/react'
import Cards from './Cards'
import { usePlaces } from '../hooks/use-places'

const Places = ({ section, variant, ...rest }) => {
  const { language } = React.useContext(I18nextContext)
  const places = usePlaces(language)
  const placesSections = section ? [section] : Object.keys(places)
  const showTitle = !section

  return (
    <VStack spacing={8}>
      {placesSections.map((section) => (
        <PlacesSection
          section={section}
          places={places}
          showTitle={showTitle}
          {...rest}
        />
      ))}
    </VStack>
  )
}

export default Places

const PlacesSection = ({ section, places, showTitle, ...rest }) => {
  const { t } = useTranslation()
  const to = getPlaceSlug(places[section])
  const title = showTitle ? t(section) : ''
  return (
    <Cards
      to={to}
      title={title}
      nodes={places[section]}
      variation="set"
      {...rest}
    />
  )
}

const getPlaceSlug = (edges) => {
  if (!edges.length) return null
  let slugParts = edges[0].node.slug.split('/')
  slugParts.pop()
  return `${slugParts.join('/')}`
}
