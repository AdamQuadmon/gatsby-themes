// import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useAreas } from './use-areas'
import { useNavPages } from './use-navPages'

export const useNavItems = (language) => {
  // const { t } = useTranslation()
  const areas = useAreas(language)
  const pages = useNavPages()

  const pagesItems = pages.map(({ node }) => ({
    label: node.name || node.slug,
    href: node.slug,
  }))
  const areasItems = areas.map(({ node }) => ({
    label: node.name || node.slug,
    href: node.slug,
  }))
  const otherItems = [
    {
      label: 'gallery',
      href: '/gallery',
    },
  ]
  return [...pagesItems, ...areasItems, ...otherItems]
}
