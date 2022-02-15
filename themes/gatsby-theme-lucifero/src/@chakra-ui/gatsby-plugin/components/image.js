const sizes = { base: 1, md: 2 }
const sizesOffset = { base: -1, sm: -2, md: -3 }
export const image = {
  Swipe: {
    baseStyle: ({ colorMode }) => ({
      '--swiper-navigation-color':
        colorMode === 'dark' ? 'colors.gray.600' : 'colors.gray.300',
      '--swiper-pagination-color':
        colorMode === 'dark' ? 'colors.gray.600' : 'colors.gray.300',
      '.swiper-wrapper': {
        alignItems: 'center',
      },
    }),
  },
  Image: {
    baseStyle: ({ colorMode }) => ({}),
  },
  ImageContent: {
    baseStyle: {
      touchAction: 'pan-y',
    },
  },
  AlbumContent: {
    baseStyle: {
      '.my-masonry-grid': {
        display: 'flex',
        ml: sizesOffset /* gutter size offset */,
        w: 'auto',
      },
      '.my-masonry-grid_column': {
        pl: sizes /* gutter size */,
        backgroundClip: 'padding-box',
      },
      /* Style your items */
      '.my-masonry-grid_column > a': {
        /* change div to reference your elements you put in <Masonry> */
        display: 'block',
        mb: sizes,
      },
    },
  },
  Album: {
    baseStyle: ({ colorMode }) => ({
      display: 'flex',
      flexGrow: 0,
      flexShrink: 1,
      width: { base: '100%', md: '32%' },
      mb: { base: 8, md: 0 },
      _hover: {
        bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
      },
      button: {
        w: 'full',
        justifyContent: 'left',
        my: 1,
      },
      '.content': {
        w: 'full',
      },
      '.album_title': {
        h: { base: '90px', md: '60px', lg: '80px' },
        fontSize: { base: '4xl', md: '2xl', lg: '3xl' },
        lineHeight: { base: 1.2, lg: 1.33 },
      },
      '.album_content': {
        h: {
          base: '150px',
          md: '120px',
        },
        fontSize: {
          base: 'xl',
          sm: '2xl',
          md: 'sm',
          lg: 'lg',
        },
      },
    }),
    variants: {
      set: {},
      home: {
        pt: { base: 2, md: 4, lg: 8 },
      },
    },
  },
}
