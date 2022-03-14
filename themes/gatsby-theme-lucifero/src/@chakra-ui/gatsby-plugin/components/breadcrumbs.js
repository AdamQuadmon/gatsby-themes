export const breadcrumbs = {
  Breadcrumbs: {
    baseStyle: ({ colorMode }) => ({
      textTransform: 'uppercase',
      bg: colorMode === 'dark' ? 'gray.800' : 'white',
      opacity: 0.95,
      py: 1,
      //Applied to the breadcrumb title (<span>)
      '.breadcrumb__title': {},
      // Applied to the breadcrumb container (<nav>)
      'nav.breadcrumb': {
        fontSize: 'xs',
      },
      // Applied to the breadcrumb ordered list (<ol>)
      '.breadcrumb__list': {
        alignItems: 'center',
      },
      // Applied to each breadcrumb 'crumbs' (<li>)
      'a.breadcrumb__link': {
        fontSize: 'xs',
        fontWeight: 800,
        _hover: {
          color: colorMode === 'dark' ? 'gray.600' : 'gray.400',
        },
      },
      // Applied to the link of the breadcrumb (<a>)
      '.breadcrumb__title': {},
      // Added to the current link (<a>)
      '.breadcrumb__link__active': {},
      // Applied to the breadcrumb separators (<span>)
      '.breadcrumb__separator': {
        fontSize: 'xs',
        fontWeight: 600,
      },
    }),
  },
}
