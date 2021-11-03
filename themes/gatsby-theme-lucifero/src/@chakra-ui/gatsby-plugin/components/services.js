export const services = {
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
}
