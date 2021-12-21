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
  },
}
