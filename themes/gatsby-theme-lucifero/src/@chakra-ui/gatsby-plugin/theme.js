import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { components } from './components'
import { typography } from './typography'

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
}
export default extendTheme(theme)
