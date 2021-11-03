export const button = {
  Button: {
    variants: {
      'with-shadow': {
        bg: 'red.400',
        boxShadow: '0 0 2px 2px #efdfde',
      },
      cta: ({ colorMode }) => ({
        fontSize: 'sm',
        fontWeight: 600,
        color: 'white',
        bg: colorMode === 'dark' ? 'red.600' : 'red.600',
        _hover: {
          bg: colorMode === 'dark' ? 'red.500' : 'red.500',
        },
      }),
      switcher: ({ colorMode }) => ({
        fontSize: 'lg',
        mr: 4,
        _hover: {
          bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
        },
      }),
      cookie: ({ colorMode }) => ({
        color: 'white',
        bg: colorMode === 'dark' ? 'green.600' : 'green.600',
        _hover: {
          bg: colorMode === 'dark' ? 'green.500' : 'green.500',
        },
      }),
    },
  },
}
