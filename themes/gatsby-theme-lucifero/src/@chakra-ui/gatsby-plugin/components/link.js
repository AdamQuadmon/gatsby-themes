export const link = {
  Link: {
    variants: {
      active_toc: {
        fontWeight: '800',
        color: 'red',
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
