export const toc = {
  Toc: {
    baseStyle: ({ colorMode }) => ({
      display: { md: 'flex', lg: 'block' },
      alignItems: 'center',
      bg: colorMode === 'dark' ? 'black' : 'white',
      zIndex: 14,
      pl: 1,
      'ul.toc_list': {
        paddingInlineStart: 0,
        p: 0,
        li: {
          fontSize: { base: 'md' },
          fontWeight: 600,
          mt: 0,
          li: {
            fontSize: { base: 'sm' },
            fontWeight: 600,
          },
          a: {
            display: { base: 'none', lg: 'inline' },
            color: colorMode === 'dark' ? 'gray.400' : 'gray.600',
            _hover: {
              textDecoration: 'none',
              fontWeight: 800,
            },
            svg: {
              verticalAlign: 'text-top',
            },
          },
          '&.active_toc > a': {
            display: 'inline',
            fontWeight: 800,
            color: colorMode === 'dark' ? 'gray.200' : 'gray.800',
          },
        },
      },
    }),
  },
}
