// https://developers.google.com/search/docs/advanced/structured-data/breadcrumb
export const getBreadcrumbSchema = (siteUrl, crumbs) => {
  if (!crumbs || !crumbs.length) {
    return null
  }

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      // name,
      // description,
      itemListElement: crumbs.map((crumb, index) => {
        let { pathname, crumbLabel } = crumb
        if (pathname.length > 2 && pathname[pathname.length - 1] === '/') {
          pathname = pathname.slice(0, -1)
        }

        const url = `${siteUrl}${pathname}`
        const name = crumbLabel

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
