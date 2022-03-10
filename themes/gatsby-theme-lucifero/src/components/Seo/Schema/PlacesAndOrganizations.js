// import { getThingParams } from './Thing'
import { getImageSchema } from './CreativeWork'
import { addParam } from './Thing'

/*
LocalBusiness type share Place and Organization type
that's why we put both in the same file

For tourism see also
- https://schema.org/TouristTrip
- https://schema.org/TouristDestination
- https://schema.org/TouristAttraction

https://schema.org/docs/hotels.html

BedAndBreakfast and Hotel are subclass of LodgingBusiness
inheriting from LocalBusiness which is both Organization and Place

So this type has three core objects:
- LodgingBusiness: b&b, hotel, hostel, resort, camping site
- Acomodation: room, suite, apartment, camping pitch
- Offer: accomodation, occupancy, date, amount (businessFunction: 'LeaseOut')

To make an Offer the Accomodation needs to be also a Product type

https://schema.org/LodgingBusiness
https://schema.org/Accommodation
https://schema.org/OfferForLease
https://schema.org/Product
*/

export const getOrganizationId = (organization) => {
  return `${organization.url}/#identity`
}

export const getOrganizationMinSchema = (organization) => {
  const name = organization.name || organization
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
  }

  addParam(schema, 'sameAs', organization.url)
  addParam(schema, 'url', organization.url)

  return schema
}

export const getLocationSchema = (address) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    address: getAddressSchema(address),
  }

  addParam(schema, 'name', address.name)
  return schema
}

export const getBrandSchema = (brand) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand,
  }

  return schema
}

export const getOrganizationSchema = (organization) => {
  const orgId = getOrganizationId(organization)
  const {
    type,
    name,
    url,
    legalName,
    logo,
    telephone,
    slogan,
    vatID,
    image,
    alternateName,
    socials,
    address,
    meta,
  } = organization
  const photo = getImageSchema(image)

  // https://stackoverflow.com/a/38243869/198056
  if (!address.contactType) address.contactType = 'reservations' // sales, customer support

  const schema = {
    '@context': 'http://schema.org',
    '@type': type || 'Organization',
    '@id': orgId,
    additionalType: 'Organization',
    address: getAddressSchema(address),
    alternateName,
    legalName,
    logo: getImageSchema(logo),
    image: photo,
    name,
    photo,
    slogan,
    sameAs: getSameAsFromSocials(socials),
    telephone,
    url,
    vatID,
    // TODO implement
    // ...getThingParams(site, page),
    // ...getOrganizationParams(place),
    // ...getLocalBusinessParams(place),
    // ...getPlaceParams(place),
    // ...getFoodEstablishmentParams(place),
    // ...getLodgingBusinessParams(place),
  }

  meta.forEach((m) => {
    schema[m.name] = m.value
  })

  return schema
}

// https://schema.org/PostalAddress
export const getAddressSchema = (address) => {
  const {
    addressCountry,
    addressLocality,
    addressRegion,
    contactType,
    postalCode,
    streetAddress,
  } = address

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PostalAddress',
    addressCountry,
    addressLocality,
    addressRegion,
  }

  addParam(schema, 'contactType', contactType)
  addParam(schema, 'postalCode', postalCode)
  addParam(schema, 'streetAddress', streetAddress)

  return schema
}

export const getPlaceAddress = (address) => {
  const { addressLocality, addressRegion, postalCode, addressCountry } = address
  let addressLocation = [addressLocality, addressRegion, addressCountry]
    .filter(String)
    .join(', ')
  let addressPlace = [postalCode, addressLocation].filter(String).join(' - ')

  return addressPlace
}

export const getPlaceAddressShort = (address) => {
  const { addressLocality, addressRegion } = address
  return [addressLocality, addressRegion].filter(String).join(', ')
}

const getSameAsFromSocials = (socials) => {
  let sameAs = []
  Object.keys(socials).forEach((social) => {
    const account = socials[social]
    const socialUrl = socialsUrls[social]
    if (account && socialUrl) {
      sameAs.push(`${socialUrl}/${account}`)
    }
  })

  return sameAs
}

const socialsUrls = {
  facebook: 'https://www.facebook.com',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
}

const getOrganizationParams = (node) => {
  let data = ({
    address,
    aggregateRating,
    alumni,
    areaServed,
    award,
    brand,
    contactPoint,
    department,
    dissolutionDate,
    duns,
    email,
    employee,
    event,
    faxNumber,
    founder,
    foundingDate,
    foundingLocation,
    funder,
    globalLocationNumber,
    hasOfferCatalog,
    hasPOS,
    interactionStatistic,
    isicV4,
    legalName,
    leiCode,
    location,
    logo,
    makesOffer,
    member,
    memberOf,
    naics,
    numberOfEmployees,
    owns,
    parentOrganization,
    publishingPrinciples,
    review,
    seeks,
    slogan,
    sponsor,
    subOrganization,
    taxID,
    telephone,
    vatID,
  } = node)

  return { ...data }
}

export const getLocalBusinessParams = (node) => {
  return ({ currenciesAccepted, openingHours, paymentAccepted, priceRange } =
    node)
}
export const getPlaceParams = (node) => {
  return ({
    additionalProperty,
    address,
    aggregateRating,
    amenityFeature,
    branchCode,
    containedInPlace,
    containsPlace,
    event,
    faxNumber,
    geo,
    geoContains,
    geoCoveredBy,
    geoCovers,
    geoCrosses,
    geoDisjoint,
    geoEquals,
    geoIntersects,
    geoOverlaps,
    geoTouches,
    geoWithin,
    globalLocationNumber,
    hasMap,
    isAccessibleForFree,
    isicV4,
    latitude,
    logo,
    longitude,
    maximumAttendeeCapacity,
    openingHoursSpecification,
    photo,
    publicAccess,
    review,
    slogan,
    smokingAllowed,
    specialOpeningHoursSpecification,
    telephone,
  } = node)
}

export const getFoodEstablishmentParams = (node) => {
  return ({ acceptsReservations, hasMenu, servesCuisine, starRating } = node)
}

export const getLodgingBusinessParams = (node) => {
  return ({
    amenityFeature,
    audience,
    availableLanguage,
    checkinTime,
    checkoutTime,
    numberOfRooms,
    petsAllowed,
    starRating,
  } = node)
}
