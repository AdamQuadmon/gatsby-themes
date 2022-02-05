import { getOfferSchema } from './Offer'
import { getReviewSchema, getAggregateRatingSchema } from './Review'
import { getBrandSchema } from './PlacesAndOrganizations'
import { getType } from './Thing'

const types = {
  product: 'Product',
  // IndividualProduct
  // ProductCollection
  // ProductModel
  // Vehicle
  service: 'Service',
  // BroadcastService
  // CableOrSatelliteService
  // GovernmentService
  // TaxiService
  // WebAPI
  financial: 'FinancialProduct',
  food: 'FoodService',
}

const defaultType = 'food'

// https://developers.google.com/search/docs/advanced/structured-data/product
export const getProductSchema = (product) => {
  const {
    name,
    image,
    description,
    sku,
    mpn,
    gtin14,
    brand,
    review,
    aggregateRating,
    offer,
  } = product
  const schema = [
    {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      // '@type': getType(type, types, defaultType),
      name,
      image,
      description,
      sku,
      mpn,
      gtin14,
      brand: getBrandSchema(brand),
      review: getReviewSchema(review),
      aggregateRating: getAggregateRatingSchema(aggregateRating),
      offers: getOfferSchema(offer),
    },
  ]

  return schema
}
