export const blog = {
  Sections: {
    baseStyle: {
      h2: {
        mt: 4,
        fontSize: { base: '4xl', sm: '5xl', lg: '6xl' },
      },
      h3: {
        mt: 2,
        mb: 8,
        fontSize: { base: '2xl' },
      },
      '.cards_box': {
        w: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
    },
  },
  BlogCard: {
    baseStyle: {
      w: { base: '100%', md: '48%' },
      mb: { base: 8 },
    },
  },
  Topic: {
    baseStyle: {},
  },
  Posts: {
    baseStyle: {
      '.container': {
        w: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
    },
  },
  PostCard: {
    baseStyle: {
      w: { base: '100%', md: '48%' },
      mb: { base: 8 },
    },
  },

  PostPage: {
    variants: {
      toc: {
        w: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

        '.post': {
          flexDirection: 'column-reverse',
          w: { base: '100%', md: '74%' },
        },
        '.toc': {
          position: 'sticky',
          top: '2rem',
          alignSelf: 'start',
          ml: 4,
          w: { base: '100%', md: '24%' },
        },
      },
    },
  },
}
