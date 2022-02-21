export const link = {
  Link: {
    variants: {
      inactive: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.800' : 'gray.400',
        fontSize: 'xs',
        fontWeight: 'black',
        textTransform: 'uppercase',
        _hover: {
          textDecoration: 'none',
          cursor: 'default',
        },
      }),
      imageLink: {
        fontSize: 'xs',
        fontWeight: 'black',
        textTransform: 'uppercase',
      },
      mdx: ({ colorMode }) => ({
        fontWeight: '800',
        color: colorMode === 'dark' ? 'gray.300' : 'gray.700',
        textDecoration: 'underline',
        _hover: {
          color: colorMode === 'dark' ? 'gray.300' : 'gray.500',
        },
      }),
    },
  },
}
