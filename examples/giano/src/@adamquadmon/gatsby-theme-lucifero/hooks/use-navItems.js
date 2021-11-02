import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useContent } from '../../../hooks/use-content'

export const useNavItems = (language) => {
  const { t } = useTranslation()
  const content = useContent(language)
  return [
    {
      label: t('navLink1Label'),
      href: t('navLink1Href'),
      children: content,
    },
  ]
}
