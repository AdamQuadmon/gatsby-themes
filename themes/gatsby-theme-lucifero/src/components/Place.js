import React from 'react'
import { Button, Link } from '@chakra-ui/react'
import { SiGooglemaps } from 'react-icons/si'
import SocialButtons from './SocialButtons'

const Place = ({ place, addressFormat }) => {
  // TODO implement unused fields
  const {
    // type,
    // itineraries,
    address,
    city,
    // region, cap,
    places,
  } = place

  const buttonSize = 'xs'
  const addressLabel = city ? `${address} - ${city}` : address
  const maps = addressFormat === 'full' ? addressLabel : city
  return (
    <SocialButtons socials={place} size={buttonSize}>
      <Button
        as={Link}
        isExternal
        size={buttonSize}
        href={places}
        colorScheme="yellow"
        aria-label={'Google Maps'}
        leftIcon={<SiGooglemaps />}
      >
        {maps}
      </Button>
    </SocialButtons>
  )
}

export default Place

Place.defaultProps = {
  addressFormat: 'compact',
}
