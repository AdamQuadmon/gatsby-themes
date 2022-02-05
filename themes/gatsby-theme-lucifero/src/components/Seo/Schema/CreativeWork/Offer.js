import { getOrganizationMinSchema } from '../PlacesAndOrganizations'
import { getGoodType } from './Product'

const types = {
  offer: 'Offer',
  aggregate: 'AggregateOffer',
  lease: 'OfferForLease',
  purchase: 'OfferForPurchase',
}
const businesFunctions = {
  make: 'ConstructionInstallation',
  dispose: 'Dispose',
  lease: 'LeaseOut',
  maintain: 'Maintain',
  provide: 'ProvideService',
  sell: 'Sell',
  buy: 'Buy',
}

const conditions = {
  used: 'UsedCondition',
  damaged: 'DamagedCondition',
  new: 'NewCondition',
  refurbished: 'RefurbishedCondition',
}

const availabilities = {
  backOrder: 'BackOrder',
  discontinued: 'Discontinued',
  inStock: 'InStock',
  inStoreOnly: 'InStoreOnly',
  limitedAvailability: 'LimitedAvailability',
  onlineOnly: 'OnlineOnly',
  outOfStock: 'OutOfStock',
  preOrder: 'PreOrder',
  preSale: 'PreSale',
  soldOut: 'SoldOut',
}

const defaultType = 'offer'
const defaultBusinessFunction = 'buy'
const defaultAvailability = 'inStock'
const defaultCondition = 'new'

const getOffer = (type) => {
  return (type && types[type]) || types[defaultType]
}
const getBusinessFunction = (type) => {
  return (
    (type && businesFunctions[type]) ||
    businesFunctions[defaultBusinessFunction]
  )
}

const getAvailability = (type) => {
  return (type && availabilities[type]) || availabilities[defaultAvailability]
}

const getCondition = (type) => {
  return (type && conditions[type]) || conditions[defaultCondition]
}

export const getShippingDetails = (shipping) => {
  const { rate, destination, handling, transit, cutOffTime } = shipping
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@context': 'https://schema.org',
      '@type': 'MonetaryAmount',
      value: rate.value,
      currency: rate.currency,
    },
    shippingDestination: {
      '@context': 'https://schema.org',
      '@type': 'DefinedRegion',
      addressCountry: destination.addressCountry,
      postalCodeRange: {
        postalCodeBegin: destination.postalCodeBegin,
        postalCodeEnd: destination.postalCodeEnd,
      },
    },
    deliveryTime: {
      '@context': 'https://schema.org',
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@context': 'https://schema.org',
        '@type': 'QuantitativeValue',
        minValue: handling.min,
        maxValue: handling.max,
      },
      transitTime: {
        '@context': 'https://schema.org',
        '@type': 'QuantitativeValue',
        minValue: transit.min,
        maxValue: transit.max,
      },
      cutOffTime,
      businessDays: {
        '@context': 'https://schema.org',
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
          // 'https://schema.org/Saturday',
          // 'https://schema.org/Sunday',
          // 'https://schema.org/PublicHolidays',
        ],
      },
    },
  }

  return schema
}

export const getOfferSchema = (offer, includes) => {
  const {
    type,
    url,
    price,
    priceCurrency,
    priceValidUntil,
    priceSpecification,
    validFrom,
    itemCondition,
    availability,
    businessFunction,
    shipping,
    seller,
  } = offer
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': getOffer(type),
      url,
      price,
      priceCurrency,
      priceValidUntil,
      validFrom,
      itemCondition: getCondition(itemCondition),
      availability: getAvailability(availability),
      businessFunction: getBusinessFunction(businessFunction),
      shippingDetails: getShippingDetails(shipping),
      seller: getOrganizationMinSchema(seller),
      includesObject: includes.map((item) => {
        return {
          typeOfGood: getGoodType(item.type),
          name: item.name,
        }
      }),
      priceSpecification: priceSpecification.map((priceData) => {
        const {
          name,
          minPrice,
          maxPrice,
          price,
          priceCurrency,
          unitCode,
          validFrom,
          validThrough,
        } = priceData
        return {
          '@context': 'https://schema.org',
          '@type': 'UnitPriceSpecification',
          name,
          minPrice,
          maxPrice,
          price,
          priceCurrency,
          unitCode,
          validFrom,
          validThrough,
        }
      }),
    },
  ]

  return schema
}
