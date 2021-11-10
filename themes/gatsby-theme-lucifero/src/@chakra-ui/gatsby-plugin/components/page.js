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
        w: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

        '.page_image': {
          w: { base: '100%', md: '50%' },
        },
        '.page_content': {
          w: { base: '100%', md: '50%' },
        },
      },
      '.no_cover': {
        '.page_content': {
          w: '100%',
          ml: 0,
        },
      },
    },
    variants: {
      blog: {
        '.has_cover': {
          '.page_image': {
            w: '100%',
          },
          '.page_content': {
            w: '100%',
            ml: 0,
          },
        },
      },
    },
  },
}
