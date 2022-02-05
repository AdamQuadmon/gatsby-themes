// https://developers.google.com/search/docs/advanced/structured-data/breadcrumb
export const getBreadcrumbSchema = (site, crumbs) => {
  const baseDomain = site.organization.url
  if (!crumbs || !crumbs.length) {
    return []
  }
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      // name,
      // description,
      itemListElement: crumbs.map((crumb, index) => {
        const url = `${baseDomain}/${crumb.pathname}`
        const name = crumb.crumbLabel
        return {
          '@context': 'https://schema.org',
          '@type': 'ListItem',
          position: index,
          // name,
          // item: url,
          item: {
            '@id': url,
            name,
            // image,
          },
        }
      }),
    },
  ]

  return schema
}
