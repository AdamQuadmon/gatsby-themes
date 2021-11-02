import { useTranslation } from 'gatsby-plugin-react-i18next'

export const useNavItems = () => {
  const { t } = useTranslation()
  return [
    {
      label: t('navLink1Label'),
      href: t('navLink1Href'),
    },
  ]
}
