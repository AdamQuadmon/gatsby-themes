import React from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import {
  Link as GatsbyLink,
  I18nextContext,
  useI18next,
  useTranslation,
} from 'gatsby-plugin-react-i18next'
import ReactCountryFlag from 'react-country-flag'

const LangSelector = ({ showLabel, ...props }) => {
  const { t } = useTranslation()
  const { languages, originalPath } = useI18next()
  const { language } = React.useContext(I18nextContext)

  return (
    <Stack className="lang_selector" direction={'row'} spacing={3} {...props}>
      {showLabel && languages.length && <Text as="span">{t('languages')}</Text>}
      {languages.map(
        (lng) =>
          lng !== language && (
            <Box key={lng}>
              <Button
                as={GatsbyLink}
                to={originalPath}
                language={lng}
                size="sm"
              >
                <ReactCountryFlag
                  key={lng}
                  countryCode={lng === 'en' ? 'gb' : lng}
                  aria-label={t('translateIn', { lng })}
                  svg
                />
              </Button>
            </Box>
          )
      )}
    </Stack>
  )
}

export default LangSelector
