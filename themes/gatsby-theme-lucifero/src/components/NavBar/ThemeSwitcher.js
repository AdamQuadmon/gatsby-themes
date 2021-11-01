import React from 'react'
import {
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeSwitcher = (props) => {
  const { t } = useTranslation()
  const { toggleColorMode: toggleMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const theme = useColorModeValue('dark', 'light')
  const label = t('themeSwitch', { theme })

  return (
    <Box {...props}>
      <IconButton
        size="sm"
        variant="switcher"
        aria-label={label}
        onClick={toggleMode}
        icon={<SwitchIcon />}
      />
    </Box>
  )
}

export default ThemeSwitcher
