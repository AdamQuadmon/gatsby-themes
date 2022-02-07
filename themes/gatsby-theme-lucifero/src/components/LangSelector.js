import React from 'react'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import ReactCountryFlag from 'react-country-flag'
import { Link } from './Link'

const LangSelector = ({ showLabel, alternatePages, ...props }) => {
  const { t } = useTranslation()

  return (
    <Stack className="lang_selector" direction={'row'} spacing={3} {...props}>
      {showLabel && alternatePages.length && (
        <Text as="span">{t('languages')}</Text>
      )}
      {alternatePages.map((page) => (
        <Box key={page.language}>
          <Button
            as={Link}
            to={page.slug}
            language={page.language}
            title={page.headline}
            size="sm"
          >
            <ReactCountryFlag
              key={page.language}
              countryCode={page.language === 'en' ? 'gb' : page.language}
              aria-label={t('translateIn', { lng: page.language })}
              svg
            />
          </Button>
        </Box>
      ))}
    </Stack>
  )
}

export default LangSelector
