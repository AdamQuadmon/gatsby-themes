// https://developers.google.com/search/docs/advanced/structured-data/carousel
export const getCarouselSchema = (edgesNodes) => {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: edgesNodes.map(({ node }, index) => {
        return {
          '@context': 'https://schema.org',
          '@type': 'ListItem',
          position: index,
          url: node.url,
          name: node.headline,
        }
      }),
    },
  ]

  return schema
}
