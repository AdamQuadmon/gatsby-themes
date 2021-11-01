import { useTranslation } from 'gatsby-plugin-react-i18next'

export const useNavItems = () => {
  const { t } = useTranslation()
  return [
    {
      label: t('pageOne'),
      href: t('linkPageOne'),
    },
    {
      label: t('pageTwo'),
      href: t('linkPageTwo'),
    },
    {
      label: t('pageThree'),
      href: t('linkPageThree'),
    },
  ]
}
