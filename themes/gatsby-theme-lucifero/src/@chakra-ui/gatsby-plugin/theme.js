import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { components } from './components'
import { typography } from './typography'

// CSS Print tips to implement
// https://www.jotform.com/blog/css-perfect-print-stylesheet-98272/
const theme = {
  ...typography,
  colors: {
    gray: colors.stone,
    green: colors.lime,
    yellow: colors.amber,
  },
  shadows: {
    outline: '0 0 0 3px rgba(252, 211, 77, 0.6)',
  },
  ...components,
  styles: {
    global: ({ colorMode }) => ({
      '@media print': {
        h1: {
          breakBefore: 'always',
        },
        p: {
          breakInside: 'avoid',
          pageBreakInside: 'avoid',
        },
      },
      blockquote: {
        background: colorMode === 'dark' ? 'gray.700' : 'gray.100',
        borderRight: '10px solid',
        borderRightColor: colorMode === 'dark' ? 'gray.500' : 'gray.300',
        ml: 0,
        mt: 10,
        mb: 5,
        pr: 2,
        quotes: `"“" "”"`,
        '&::before': {
          fontFamily: 'heading',
          color: colorMode === 'dark' ? 'gray.500' : 'gray.300',
          content: 'open-quote',
          fontSize: { base: '7em', lg: '15em' },
          lineHeight: '0.7em',
          position: 'absolute',
        },
        'p.chakra-text': {
          ml: { base: 14, lg: 28 },
          fontSize: { base: '1em', lg: 'inerith' },
          textIndent: 0,
        },
        cite: {
          display: 'block',
          fontSize: 'lg',
          pb: 2,
        },
      },
    }),
  },
}
export default extendTheme(theme)
