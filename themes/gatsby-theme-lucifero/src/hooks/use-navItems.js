// import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useAreas } from './use-areas'
import { useNavPages } from './use-navPages'

export const useNavItems = (language) => {
  // const { t } = useTranslation()
  const areas = useAreas(language)
  const pages = useNavPages(language)
  const pagesItems = pages.map(({ node }) => ({
    label: node.meta.title,
    href: node.slug,
  }))
  const areasItems = areas.map(({ node }) => ({
    label: node.meta.title,
    href: node.slug,
  }))
  return [...pagesItems, ...areasItems]
}
