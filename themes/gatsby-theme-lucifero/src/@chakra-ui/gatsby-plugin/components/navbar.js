export const navbar = {
  NavBar: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'black' : 'gray.100',
      color: colorMode === 'dark' ? 'withe' : 'gray.600',
      px: {
        base: 2,
        sm: 4,
      },
      '.nav-container': {
        minHeight: 10,
      },
      '.nav-items': {
        mt: 1,
      },
      '.hamburger': {
        fontSize: 'lg',
        color: colorMode === 'dark' ? 'gray.300' : 'inerith',
      },
    }),
  },
}