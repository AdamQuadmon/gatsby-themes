export const navItem = {
  NavItem: {
    baseStyle: ({ colorMode }) => ({
      w: 'full',
      color: colorMode === 'dark' ? 'gray.200' : 'gray.500',
      '.label': {
        textTransform: 'uppercase',
      },
      '.chakra-button': {
        fontSize: { base: 'sm', lg: 'md' },
        height: { base: '28px', lg: '32px' },
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
        display: 'none',
        pos: 'absolute',
        left: 0,
        w: 'full',
        zIndex: '14',
        bg: colorMode === 'dark' ? 'gray.700' : 'gray.300',
        color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
        borderTopColor: colorMode === 'dark' ? 'gray.800' : 'gray.300',
        borderBottomColor: colorMode === 'dark' ? 'gray.800' : 'gray.300',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: 'lg',
      },
      '.items_box': {
        justifyContent: 'space-around',
      },
    }),
  },
}
