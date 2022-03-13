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
        ml: { base: 1, lg: 6 },
        pr: { base: 2, lg: 0 },
        w: { base: '64%', sm: '80%' },
        '.subtitle': {
          fontSize: 'sm',
          mb: 4,
        },
        '.address2': {
          fontSize: 'xs',
          mb: 4,
        },
        '.vat_label': {
          fontSize: 'xs',
        },
        '.vat_value': {},
        '.copyright': {
          fontSize: 'xs',
        },
      },
      '.second_column': {
        w: { base: '35%', lg: '19%' },
        // pl: { base: 4, lg: 0 },
        textAlign: { base: 'right', lg: 'left' },
        // ml: { base: 2, lg: 0 },
        borderLeft: '1px solid',
        borderLeftColor: colorMode === 'dark' ? 'gray.100' : 'gray.400',
        // a: {
        //   ml: 'auto',
        // },
      },
    }),
  },
}
