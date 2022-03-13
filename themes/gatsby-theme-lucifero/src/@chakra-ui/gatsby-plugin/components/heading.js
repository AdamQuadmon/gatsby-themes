export const heading = {
  Heading: {
    baseStyle: ({ colorMode }) => ({
      color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
    }),
    variants: {
      cookie: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.800' : 'white',
      }),
    },
    sizes: {
      '4xl': { my: 18, mb: 10 },
      '3xl': { my: 14, mb: 6 },
      '2xl': { my: 12, mb: 5 },
      xl: { my: 10, mb: 4 },
      lg: { my: 8, mb: 3 },
      md: { my: 7, mb: 2 },
      sm: { my: 6, mb: 1 },
      xs: { my: 5, mb: 0 },
    },
  },
}
