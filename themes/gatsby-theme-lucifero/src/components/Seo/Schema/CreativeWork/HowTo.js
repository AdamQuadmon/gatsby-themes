import { getImageObjectSchema } from '../CreativeWork'
import { getAggregateRatingSchema } from './Review'
import { getVideoSchema } from './Video'

// https://developers.google.com/search/docs/advanced/structured-data/how-to

const directionTypes = {
  direction: 'HowToDirection',
  tip: 'HowToTip',
}

const defaultDirectionType = 'direction'

const getDirectionType = (type) => {
  return (type && directionTypes[type]) || directionTypes[defaultDirectionType]
}

// https://developers.google.com/search/docs/advanced/structured-data/faqpage
//
// for Questions from users see:
// https://developers.google.com/search/docs/advanced/structured-data/qapage
const getFaqSchema = (questions) => {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map((question) => {
        return {
          '@context': 'https://schema.org',
          '@type': 'Question',
          name: question.name,
          acceptedAnswer: {
            '@context': 'https://schema.org',
            '@type': 'Answer',
            text: question.answer,
          },
        }
      }),
    },
  ]

  return schema
}

export const getHowToStepSchema = (step) => {
  const { url, name, image, text, directions } = step
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowToStep',
    url,
    name,
    text,
    image: getImageObjectSchema(image),
  }

  if (directions && directions.length) {
    schema.itemListElement = directions.map((direction) => {
      const { type, text } = direction
      return {
        '@context': 'https://schema.org',
        '@type': getDirectionType(type),
        text,
      }
    })
  }

  return schema
}

// https://developers.google.com/search/docs/advanced/structured-data/home-activities
export const getHowToSchema = (howTo, image, cost, supplies, tools, steps) => {
  const { name, totalTime } = howTo
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name,
      totalTime,
      image: getImageObjectSchema(image),
      estimatedCost: {
        '@context': 'https://schema.org',
        '@type': 'MonetaryAmount',
        currency: cost.currency,
        value: cost.value,
      },
      supply: supplies.map((supply) => {
        return {
          '@context': 'https://schema.org',
          '@type': 'HowToSupply',
          name: supply.name,
        }
      }),
      tool: tools.map((tool) => {
        return {
          '@context': 'https://schema.org',
          '@type': 'HowToTool',
          name: tool.name,
        }
      }),
      step: steps.map(getHowToStepSchema),
      // interactionStatistic: {
      //   '@context': 'https://schema.org',
      //   '@type': 'InteractionCounter',
      //   interactionType: {
      //     '@context': 'https://schema.org',
      //     '@type': 'WatchAction'
      //   },
      //   userInteractionCount: 5647018,
      // },
      // regionsAllowed: 'US',
    },
  ]

  return schema
}

// https://developers.google.com/search/docs/advanced/structured-data/recipe
export const getRecipeSchema = (recipe) => {
  const {
    name,
    image,
    datePublished,
    description,
    prepTime,
    cookTime,
    totalTime,
    keywords,
    recipeYield,
    recipeCategory,
    recipeCuisine,
    recipeIngredient,
    calories,
    author,
    steps,
    aggregateRating,
    video,
  } = recipe
  const schema = [
    {
      '@context': 'https://schema.org/',
      '@type': 'Recipe',
      name,
      image,
      datePublished,
      description,
      prepTime,
      cookTime,
      totalTime,
      keywords,
      recipeYield,
      recipeCategory,
      recipeCuisine,
      recipeIngredient,
      author: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author,
      },
      nutrition: {
        '@context': 'https://schema.org',
        '@type': 'NutritionInformation',
        calories,
      },
      recipeInstructions: steps.map(getHowToStepSchema),
      aggregateRating: getAggregateRatingSchema(aggregateRating),
      video: getVideoSchema(video),
    },
  ]

  return schema
}
