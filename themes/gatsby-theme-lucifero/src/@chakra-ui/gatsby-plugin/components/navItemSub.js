export const navItemSub = {
  NavItemSub: {
    baseStyle: ({ colorMode }) => ({
      width: { base: '100%', md: '32%' },
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
        px: 2,
        display: 'block',
        pt: 4,
        pb: 1,
      },
      '.item_content': {
        fontSize: 'sm',
        p: 2,
      },
      'a.chakra-linkbox__overlay::before': {
        zIndex: 15,
      },
      'a[href]:not(.chakra-linkbox__overlay), abbr[title]': {
        zIndex: 16,
      },
    }),
  },
}
