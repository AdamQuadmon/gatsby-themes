export const footer = {
  Footer: {
    baseStyle: ({ colorMode }) => ({
      color: colorMode === 'dark' ? 'gray.50' : 'gray.700',
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
      pt: 2,
      '.first_row': {
        span: {
          display: { base: 'none', md: 'flex' },
          pr: { base: 0, lg: 4 },
          fontSize: { base: 'xl' },
        },
        '.lang_selector': {
          mr: 4,
        },
      },
      '.first_column': {
        w: { base: '64%', sm: '80%', lg: '60%' },
        ml: { base: 1, lg: 6 },
        pr: { base: 2, lg: 0 },
        '.subtitle': {
          fontSize: { base: 'sm', md: 'md', lg: 'xl' },
          mb: 4,
        },
        '.address': {
          fontSize: { base: 'xs', md: 'sm', lg: 'lg' },
        },
        '.address2': {
          mb: 4,
        },
        '.vat': {
          fontSize: { base: 'xs', md: 'sm', lg: 'lg' },
        },
        '.vat_value': {},
        '.copyright': {
          fontSize: 'xs',
        },
      },
      '.second_column': {
        pr: { base: 0, lg: 8 },
        w: { base: '35%', sm: '19%', lg: '40%' },
        fontSize: { base: 'sm', lg: 'lg' },
        // pl: { base: 4, lg: 0 },
        textAlign: 'right',
        // ml: { base: 2, lg: 0 },
        borderLeft: { base: '1px solid', md: 'none' },
        borderLeftColor: colorMode === 'dark' ? 'gray.100' : 'gray.400',
        // a: {
        //   ml: 'auto',
        // },
      },
    }),
  },
}
