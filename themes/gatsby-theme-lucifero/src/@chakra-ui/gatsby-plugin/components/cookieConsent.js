export const cookieConsent = {
  CookieConsent: {
    baseStyle: ({ colorMode }) => ({
      fontSize: 'xs',
      marginEnd: 2,
      '.cookie_stack': {
        color: colorMode === 'dark' ? 'gray.800' : 'white',
        zIndex: 'modal',
        borderTopRightRadius: 'md',
        py: 3,
        px: { base: 3, md: 6, lg: 8 },
        bg: colorMode === 'dark' ? 'gray.200' : 'gray.800',
      },
    }),
  },
}
