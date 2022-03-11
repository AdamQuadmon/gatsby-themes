const sizes = { base: 1, md: 2 }
const sizesOffset = { base: -1, sm: -2, md: -3 }
export const image = {
  Swipe: {
    baseStyle: ({ colorMode }) => ({
      zIndex: 1,
      '--swiper-navigation-color':
        colorMode === 'dark' ? 'colors.gray.600' : 'colors.gray.300',
      '--swiper-pagination-color':
        colorMode === 'dark' ? 'colors.gray.600' : 'colors.gray.300',
      '.swiper-wrapper': {
        alignItems: 'center',
      },
      '.swiper-slide-thumb-active': {
        border: '5px solid',
        borderColor: colorMode === 'dark' ? 'gray.300' : 'gray.600',
      },
      '.thumb_container': {
        w: '100%',
        mt: '3',
        height: '80px',
      },
    }),
  },
  Image: {
    baseStyle: {},
  },
  ImageContent: {
    baseStyle: {
      touchAction: 'pan-y',
      '.image_container': {
        justifyContent: 'space-between',
        mx: 'auto',
        display: { base: 'block', md: 'flex' },
      },
      '.box_image': {
        w: { base: '100%', md: '64%', lg: '74%' },
        my: 2,
      },
      '.box_info': {
        w: { base: '100%', md: '34%', lg: '25%' },
      },
      h1: {
        mt: 2,
      },
    },
  },
  AlbumContent: {
    baseStyle: {
      '.header': {
        justifyContent: 'space-between',
        alignItems: 'baseline',
        mx: 'auto',
      },
      '.description': {
        mb: 2,
      },
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
      '.album_title': {},
    },
  },
  Gallery: {
    baseStyle: {
      // TODO: unify with Cards
      '.albums': {
        dispaly: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        mb: { base: 8 },
      },
      '.album': {
        width: { base: '100%', md: '32%' },
        mb: { base: 8, md: 0 },
      },
    },
  },
  Album: {
    baseStyle: ({ colorMode }) => ({
      _hover: {
        '.album_title': {
          color: colorMode === 'dark' ? 'gray.100' : 'gray.900',
          textDecoration: 'underline',
        },
      },
      button: {
        w: 'full',
        justifyContent: 'left',
        my: 1,
      },
      '.content': {
        w: 'full',
        px: 2,
      },
      '.album_title': {
        h: { base: '90px', md: '60px', lg: '80px' },
        mt: 0,
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
          lg: 'md',
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
