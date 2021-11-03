export const navbarTop = {
  NavBarTop: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
      color: colorMode === 'dark' ? 'gray.400' : 'gray.800',
      borderColor: colorMode === 'dark' ? 'gray.800' : 'gray.300',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      // minH: '20px',
      fontSize: 'xs',
      p: {
        md: 1,
      },
      span: {
        marginRight: 1,
      },
      '.address': {
        lineHeight: '100%',
        display: { base: 'none', md: 'inline-block' },
      },
      '.phoneNumber': {
        fontSize: 'md',
        display: { base: 'none', md: 'flex' },
      },
    }),
  },
}
