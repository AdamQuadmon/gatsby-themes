export const page = {
  Page: {
    baseStyle: {
      pb: 4,
      h1: {
        my: 4,
        fontSize: { base: '4xl', sm: '5xl', lg: '6xl' },
      },
      '.page_content': {
        pl: { base: 0, md: 4 },
        p: {
          my: 2,
          textIndent: 16,
          fontSize: 'lg',
        },
      },
      '.has_cover': {
        '.page_content': {
          w: { base: 'full', md: '50%' },
        },
        '.page_image': {
          w: { base: '100%', md: '50%' },
        },
      },
      '.no_cover': {
        '.page_content': {
          w: 'full',
          ml: 0,
        },
      },
    },
  },
}
