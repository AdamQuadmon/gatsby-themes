// import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useAreas } from './use-areas'
import { useNavPages } from './use-navPages'

export const useNavItems = (language) => {
  // const { t } = useTranslation()
  const areas = useAreas(language)
  const pages = useNavPages(language)
  const pagesItems = pages.map(({ node }) => ({
    label: node.frontmatter.title,
    href: node.frontmatter.slug,
  }))
  const areasItems = areas.map(({ node }) => ({
    label: node.frontmatter.title,
    href: node.fields.slug,
  }))
  return [...pagesItems, ...areasItems]
}
