// https://developers.google.com/search/docs/advanced/structured-data/carousel

export const getCarouselSchema = (items) => {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => {
        item.url
        return {
          '@context': 'https://schema.org',
          '@type': 'ListItem',
          position: index,
          ...getUrl(item),
        }
      }),
    },
  ]

  return schema
}

const getUrl = (item) => {
  if (item.url) {
    return {
      url: item.url,
    }
  }

  return {
    item: item,
  }
}
