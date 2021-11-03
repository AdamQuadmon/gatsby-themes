export const cards = {
  Cards: {
    baseStyle: ({ colorMode }) => ({
      '.cards_title': {
        textAlign: 'center',
        align: 'center',
        mx: 'auto',
        fontSize: '5xl',
        my: { base: 4, md: 10 },
      },
      '.cards_box': {
        w: '100%',
        dispaly: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      '.card_box': {
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
        '.card_places': {
          span: {
            ml: 2,
            fontSize: 'xs',
          },
        },
        '.card_title': {
          h: { base: '90px', md: '60px', lg: '80px' },
          fontSize: { base: '4xl', md: '2xl', lg: '3xl' },
          lineHeight: { base: 1.2, lg: 1.33 },
        },
        '.card_content': {
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
      },
    }),
    variants: {
      set: {},
      home: {
        pt: { base: 2, md: 4, lg: 8 },
      },
    },
  },
  Card: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.100',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      overflow: 'hidden',
      '.content': {
        px: 2,
        pb: 2,
      },
    }),
    variants: {
      rounded: {
        padding: 8,
        borderRadius: 'xl',
        boxShadow: 'xl',
      },
      smooth: {
        padding: 0,
        borderRadius: 'lg',
        boxShadow: 'md',
      },
    },
    defaultProps: {
      variant: 'smooth',
    },
  },
}
