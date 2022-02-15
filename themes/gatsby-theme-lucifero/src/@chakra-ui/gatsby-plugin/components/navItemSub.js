export const navItemSub = {
  NavItemSub: {
    baseStyle: ({ colorMode }) => ({
      my: 1,
      borderRadius: 'md',
      bg: colorMode === 'dark' ? 'gray.600' : 'gray.200',
      _hover: {
        bg: colorMode === 'dark' ? 'gray.500' : 'gray.100',
      },
      '.item_header': {
        textTransform: 'uppercase',
        // fontFamily: 'heading',
        fontWeight: 700,
        color: colorMode === 'dark' ? 'gray.200' : 'gray.700',
        p: 2,
      },
      '.item_content': {
        fontSize: 'sm',
        p: 2,
      },
      'a.chakra-linkbox__overlay::before': {
        zIndex: 2,
      },
      'a[href]:not(.chakra-linkbox__overlay), abbr[title]': {
        zIndex: 3,
      },
    }),
  },
}
