import { useSeoDefault } from '../hooks/use-seoDefault'

const getImage = (meta, seo) => {
  let image = meta.ogImage || meta.cover
  if (image) {
    image = meta.folder ? [meta.folder, image].join('/') : image
  } else {
    image = seo.ogImage
  }
  return `https://${seo.imgixSource}.imgix.net/${image}?w=1200&h=630&crop=edges&auto=compress,format`
}

// https://neilpatel.com/blog/open-graph-meta-tags/
export const useSeoValues = ({ isHome, page }) => {
  const seo = useSeoDefault()
  const meta = (page && page.meta) || {}

  const titleTemplate = isHome ? `%s` : seo.titleTemplate
  const title =
    meta.metaTitle || (page && page.title) || meta.title || seo.title

  const description = meta.description || seo.description
  const keywords = meta.keywords || seo.keywords

  const postPath = (page && page.slug) || null

  const siteUrl = seo.siteUrl
  const canonical = (postPath && `${siteUrl}/${postPath}`) || false

  // TODO: improve this using types
  // https://ogp.me/#types
  const type = postPath ? 'article' : 'website'
  const isBlogPost = type === 'article'

  const image = getImage(meta, seo)

  const date = meta.date ? meta.date : false
  const iconPath = seo.iconPath
  const author = seo.author
  const organization = seo.organization

  return {
    isHome,
    isBlogPost,
    titleTemplate,
    title,
    description,
    keywords,
    siteUrl,
    canonical,
    type,
    image,
    date,
    iconPath,
    author,
    organization,
  }
}
