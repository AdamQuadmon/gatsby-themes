import { getType } from './Thing'

const types = {
  like: 'LikeAction',
  share: 'ShareAction',
  watch: 'WatchAction',
  // Other possible actions
  // CommunicateAction
  // FollowAction
  // JoinAction
  // RegisterAction
  // SubscribeAction
  // WatchAction
  // ViewAction
  // BuyAction
  // OrderAction
  // RentAction
  // LeaseAction
}

const defaultType = 'like'

const services = {
  facebook: {
    id: 'https://facebook.com',
    name: 'Facebook',
    type: 'WebSite',
  },
  youtube: {
    id: 'https://youtube.com',
    name: 'YouTube',
    type: 'WebSite',
  },
  twitter: {
    id: 'https://twitter.com',
    name: 'Twitter',
    type: 'SoftwareApplication',
  },
}

export const getViewActionSchema = (target, name) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ViewAction',
    target,
    name,
  }

  return schema
}

export const getSearchActionSchema = (target, queryInput) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SearchAction',
    target: {
      '@context': 'https://schema.org',
      '@type': 'EntryPoint',
      // 'https://query.example.com/search?q={search_term_string}',
      urlTemplate: target,
    },
    // 'required name=search_term_string'
    'query-input': queryInput,
  }

  return schema
}

export const getInteractionsSchema = (interactions) => {
  const schema = interactions.map((interaction) => {
    const { service, type, count } = interaction

    const schemaPart = {
      '@context': 'https://schema.org',
      '@type': 'InteractionCounter',
      interactionType: getType(type, types, defaultType),
      userInteractionCount: count,
    }
    if (service) {
      const { name, id, type: interactionType } = services[service]
      schemaPart.interactionService = {
        '@context': 'https://schema.org',
        '@type': interactionType,
        '@id': id,
        name: name,
      }
    }
  })

  return schema
}
