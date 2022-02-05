import { getOrganizationMinSchema } from '../PlacesAndOrganizations'

// https://developers.google.com/search/docs/advanced/structured-data/review-snippet
export const getReviewSchema = (item) => {
  const {
    name,
    schema: itemReviewed,
    review: reviewBody,
    rating: ratingValue,
    bestRating,
    author,
    publisher,
  } = item
  const schema = [
    {
      '@context': 'https://schema.org/',
      '@type': 'Review',
      name,
      itemReviewed,
      reviewRating: {
        '@context': 'https://schema.org',
        '@type': 'Rating',
        ratingValue,
        bestRating,
      },
      author: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author,
      },
      reviewBody,
      publisher: getOrganizationMinSchema(publisher),
    },
  ]

  return schema
}

export const getAggregateRatingSchema = (item) => {
  const {
    name,
    schema: itemReviewed,
    ratingValue,
    bestRating,
    ratingCount,
  } = item
  const schema = [
    {
      '@context': 'https://schema.org/',
      '@type': 'AggregateRating',
      name,
      itemReviewed,
      ratingValue,
      bestRating,
      ratingCount,
    },
  ]

  return schema
}
