export const navItemSub = {
  NavItemSub: {
    baseStyle: ({ colorMode }) => ({
      w: '100%',
      p: 2,
      _hover: {
        bg: colorMode === 'dark' ? 'gray.600' : 'gray.300',
      },
      '.item_header': {
        color: colorMode === 'dark' ? 'gray.200' : 'gray.700',
        py: 2,
      },
      '.item_content': {
        fontSize: 'sm',
        py: 2,
      },
    }),
  },
}
