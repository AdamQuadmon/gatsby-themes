export const components = {
  components: {
    Button: {
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        cta: ({ colorMode }) => ({
          fontSize: 'sm',
          fontWeight: 600,
          color: 'white',
          bg: colorMode === 'dark' ? 'red.600' : 'red.600',
          _hover: {
            bg: colorMode === 'dark' ? 'red.500' : 'red.500',
          },
        }),
        switcher: ({ colorMode }) => ({
          fontSize: 'lg',
          mr: 4,
          _hover: {
            bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
          },
        }),
        cookie: ({ colorMode }) => ({
          color: 'white',
          bg: colorMode === 'dark' ? 'green.600' : 'green.600',
          _hover: {
            bg: colorMode === 'dark' ? 'green.500' : 'green.500',
          },
        }),
      },
    },
    Heading: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
        fontVariant: 'small-caps',
      }),
      variants: {
        cookie: ({ colorMode }) => ({
          color: colorMode === 'dark' ? 'gray.800' : 'white',
        }),
      },
    },
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
    CookieConsent: {
      baseStyle: ({ colorMode }) => ({
        fontSize: 'xs',
        marginEnd: 2,
        '.cookie_stack': {
          color: colorMode === 'dark' ? 'gray.800' : 'white',
          zIndex: 'modal',
          borderTopRightRadius: 'md',
          py: 3,
          px: { base: 3, md: 6, lg: 8 },
          bg: colorMode === 'dark' ? 'gray.200' : 'gray.800',
        },
      }),
    },
    Hero: {
      baseStyle: ({ colorMode }) => ({
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.50',

        textAlign: 'center',
        align: 'center',
        pt: { base: 4, md: 8 },
        h1: {
          pt: { base: 2 },
          pb: { base: 2, md: 4, lg: 8 },
          fontWeight: 600,
          fontSize: { base: '4xl', sm: '5xl', lg: '6xl' },
          lineHeight: '110%',
          span: {
            display: { base: 'block', md: 'inline-block' },
            color: colorMode === 'dark' ? 'yellow.400' : 'yellow.500',
            pl: { base: 2, md: 3, lg: 4 },
          },
        },
        h2: {
          fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
          textTransform: 'lowercase',
          fontVariant: 'normal',
          fontWeight: 400,
        },
        h3: {
          fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
          pt: { sm: 2, md: 3, lg: 4 },
          fontVariant: 'normal',
          fontWeight: 400,
        },
        h4: {
          fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
          pt: { sm: 2, md: 3, lg: 4 },
          fontVariant: 'normal',
          fontWeight: 400,
        },
        span: {
          pr: { base: 2, md: 3, lg: 4 },
          color: colorMode === 'dark' ? 'red.500' : 'red.600',
          fontWeight: 600,
        },
        p: {
          color: 'gray.400',
          fontSize: { base: 'xl', sm: '2xl', md: '3xl' },
          maxW: '3xl',
        },
        img: {
          pt: { base: 2, md: 4, lg: 8 },
          borderBottomRadius: 'md',
        },
      }),
    },
    Icon: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.200' : 'gray.700',
      }),
    },
    Services: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.200' : 'gray.700',
        mb: 4,
        h2: {
          fontSize: '5xl',
          mt: { base: 4, md: 10 },
        },
        '.section': {
          w: { base: '100%', md: '19%' },
          mt: { base: 16, md: 0 },
        },
        h3: {
          fontSize: { base: '2xl', sm: '3xl' },
          w: { base: '35%', md: 'full' },
        },
        '.services': {
          w: { base: '65%', md: 'full' },
        },
        svg: {
          color: colorMode === 'dark' ? 'white' : 'gray.700',
        },
        p: {
          fontSize: { base: 'xl', sm: '2xl', md: 'xs' },
          pl: { base: 8, md: 2 },
        },
      }),
    },
    NavBarTop: {
      baseStyle: ({ colorMode }) => ({
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
        color: colorMode === 'dark' ? 'gray.400' : 'gray.800',
        borderColor: colorMode === 'dark' ? 'gray.800' : 'gray.300',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        // minH: '20px',
        fontSize: 'xs',
        p: {
          md: 1,
        },
        span: {
          marginRight: 1,
        },
        '.address': {
          lineHeight: '100%',
          display: { base: 'none', md: 'inline-block' },
        },
        '.phoneNumber': {
          fontSize: 'md',
          display: { base: 'none', md: 'flex' },
        },
      }),
    },
    NavBar: {
      baseStyle: ({ colorMode }) => ({
        bg: colorMode === 'dark' ? 'black' : 'gray.100',
        color: colorMode === 'dark' ? 'withe' : 'gray.600',
        // borderColor: colorMode === 'dark' ? 'gray.700' : 'gray.300',
        // borderBottomWidth: '1px',
        // borderBottomStyle: 'solid',
        px: {
          base: 2,
          sm: 4,
        },
        '.logo': {
          mr: 1,
          h: 'auto',
          _hover: {
            bg: 'transparent',
          },
          svg: {
            w: { base: 8 },
            h: { base: 8 },
          },
        },
        '.hamburger': {
          fontSize: 'lg',
          // ml: 4,
          color: colorMode === 'dark' ? 'gray.300' : 'inerith',
        },
      }),
    },
    NavItem: {
      baseStyle: ({ colorMode }) => ({
        textTransform: 'uppercase',
        w: 'full',
        h: '100%',
        pt: 1,
        color: colorMode === 'dark' ? 'gray.200' : 'gray.500',
        fontSize: 'md',
        '.chakra-button': {
          bg: colorMode === 'dark' ? 'gray.900' : 'gray.200',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          _hover: {
            bg: colorMode === 'dark' ? 'gray.800' : 'gray.300',
            color: colorMode === 'dark' ? 'gray.50' : 'gray.900',
          },
        },
        '.active': {
          bg: colorMode === 'dark' ? 'gray.800' : 'gray.300',
          color: colorMode === 'dark' ? 'gray.50' : 'gray.700',
        },
        '.sub_box': {
          bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
          color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
          borderTopColor: colorMode === 'dark' ? 'gray.800' : 'gray.300',
          borderBottomColor: colorMode === 'dark' ? 'gray.800' : 'gray.400',
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      }),
    },
    NavItemSub: {
      baseStyle: ({ colorMode }) => ({
        w: '100%',
        p: 2,
        _hover: {
          bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
        },
        '.item_header': {
          color: colorMode === 'dark' ? 'gray.200' : 'gray.700',
          py: 2,
        },
        '.item_content': {
          fontSize: 'sm',
          py: 2,
        },
      }),
    },
    Footer: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.50' : 'gray.700',
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
        pt: 2,
        '.logo': {
          h: 'auto',
          _hover: {
            bg: 'transparent',
          },
          svg: {
            w: { base: 12 },
            h: { base: 12 },
          },
        },
        '.first_row': {
          span: {
            display: { base: 'none', md: 'flex' },
            pr: 4,
            fontSize: { base: 'xl' },
          },
          '.lang_selector': {
            mr: 4,
          },
        },
        '.first_column': {
          ml: 6,
          w: { base: '220px', sm: '300px' },
          '.subtitle': {
            fontSize: 'sm',
            mb: 4,
          },
          '.address2': {
            fontSize: 'xs',
            mb: 4,
          },
          '.iva_label': {
            fontSize: 'xs',
          },
          '.iva_value': {},
          '.copyright': {
            fontSize: 'xs',
          },
        },
      }),
    },
    Page: {
      baseStyle: ({ colorMode }) => ({
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
      }),
    },
  },
}
