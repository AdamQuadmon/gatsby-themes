export const hero = {
  Hero: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.50',

      textAlign: 'center',
      align: 'center',
      // pt: { base: 4, md: 8 },
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
        // pt: { base: 2, md: 4, lg: 8 },
        borderBottomRadius: 'md',
      },
    }),
  },
}
