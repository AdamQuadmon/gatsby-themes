import { getInteractionsSchema } from '../Action'
import { getType } from '../Thing'
import { getReviewSchema, getAggregateRatingSchema } from './Review'

const types = {
  video: 'VideoObject',
}

const defaultType = 'video'

// https://developers.google.com/search/docs/advanced/structured-data/movie
export const getMovieSchema = (movie) => {
  const { url, name, image, dateCreated, director, review, aggregateRating } =
    movie
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    url,
    name,
    image,
    dateCreated,
    director: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: director,
    },
    review: getReviewSchema(review),
    aggregateRating: getAggregateRatingSchema(aggregateRating),
  }

  return schema
}

// https://developers.google.com/search/docs/advanced/structured-data/video
export const getVideoSchema = (video) => {
  export const {
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    expires,
    contentUrl,
    embedUrl,
    interactions,
    parts,
  } = video
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name,
      description,
      thumbnailUrl,
      uploadDate,
      expires,
      duration,
      contentUrl,
      embedUrl,
      interactionStatistic: getInteractionsSchema(interactions),
      hasPart: parts.map((part) => {
        const { name, startOffset, endOffset, url } = part
        return {
          '@context': 'https://schema.org',
          '@type': 'Clip',
          name,
          startOffset,
          endOffset,
          url,
        }
      }),
    },
  ]

  return schema
}

// https://developers.google.com/search/docs/advanced/structured-data/home-activities
export const getHomeActivitiesSchema = (activity, images) => {
  const {
    type,
    name,
    description,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    interactions,
  } = activity
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': getType(type, types, defaultType),
      name,
      description,
      uploadDate,
      duration,
      contentUrl,
      embedUrl,
      thumbnailUrl: images,
      interactionStatistic: getInteractionsSchema(interactions),
    },
  ]

  return schema
}
