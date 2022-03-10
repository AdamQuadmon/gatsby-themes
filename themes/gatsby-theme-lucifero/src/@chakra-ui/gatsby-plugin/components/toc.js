export const toc = {
  Toc: {
    baseStyle: ({ colorMode }) => ({
      display: { base: 'flex', lg: 'block' },
      alignItems: 'center',
      bg: colorMode === 'dark' ? 'gray.800' : 'white',
      opacity: 0.95,
      zIndex: 14,
      pl: 1,
      cursor: { base: 'pointer', lg: 'auto' },
      '.tocOpen ul.toc_list a': {
        display: 'inline',
      },
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
            color: colorMode === 'dark' ? 'gray.600' : 'gray.400',
            _hover: {
              textDecoration: 'none',
              color: colorMode === 'dark' ? 'gray.300' : 'gray.700',
            },
            svg: {
              verticalAlign: 'text-top',
            },
          },
          '&.active_toc > a': {
            display: 'inline',
            color: colorMode === 'dark' ? 'gray.200' : 'gray.800',
          },
        },
      },
    }),
  },
}
