export const page = {
  Page: {
    baseStyle: {
      pb: 4,
      '.has_cover': {
        w: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        mt: 4,

        '.page_image': {
          // w: { base: '100%', md: '50%' },
          w: '100%',
          mb: 8,
        },
        '.mdx_content': {
          w: '100%',
          // w: { base: '100%', md: '50%' },
        },
      },
      '.no_cover': {
        '.mdx_content': {
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
          '.mdx_content': {
            w: '100%',
            ml: 0,
          },
        },
      },
    },
  },
}
