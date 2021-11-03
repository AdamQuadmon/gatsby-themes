export const navItem = {
  NavItem: {
    baseStyle: ({ colorMode }) => ({
      textTransform: 'uppercase',
      w: 'full',
      color: colorMode === 'dark' ? 'gray.200' : 'gray.500',
      fontSize: 'md',
      '.chakra-button': {
        bg: colorMode === 'dark' ? 'gray.900' : 'gray.200',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        _hover: {
          bg: colorMode === 'dark' ? 'gray.800' : 'gray.300',
          color: colorMode === 'dark' ? 'gray.50' : 'gray.900',
        },
      },
      '.active': {
        bg: colorMode === 'dark' ? 'gray.800' : 'gray.300',
        color: colorMode === 'dark' ? 'gray.50' : 'gray.700',
      },
      '.sub_box': {
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.200',
        color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
        borderTopColor: colorMode === 'dark' ? 'gray.800' : 'gray.300',
        borderBottomColor: colorMode === 'dark' ? 'gray.800' : 'gray.400',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    }),
  },
}
