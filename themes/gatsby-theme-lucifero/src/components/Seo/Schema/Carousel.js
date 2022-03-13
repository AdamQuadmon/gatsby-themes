// https://developers.google.com/search/docs/advanced/structured-data/carousel
export const getCarouselSchema = (edgesNodes, name) => {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: name,
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
