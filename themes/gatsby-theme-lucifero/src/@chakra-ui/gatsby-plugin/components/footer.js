export const footer = {
  Footer: {
    baseStyle: ({ colorMode }) => ({
      color: colorMode === 'dark' ? 'gray.50' : 'gray.700',
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
      pt: 2,
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
}
