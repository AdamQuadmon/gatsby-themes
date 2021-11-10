import { useSeoDefault } from '../hooks/use-seoDefault'

export const useSeoValues = ({
  isHome,
  pathname,
  node,
  seo: seoMeta,
  title: metaTitle,
  description: metaDescription,
  keywords: metaKeywords,
  image: metaImage,
  meta,
  isBlogPost,
}) => {
  const seo = useSeoDefault()
  const postMeta = seoMeta || (node && node.frontmatter) || {}

  const { siteUrl, author, organization } = seo

  const title = metaTitle || postMeta.title || postMeta.metaTitle || seo.title
  const description =
    metaDescription ||
    postMeta.description ||
    postMeta.metaDescription ||
    seo.description

  const titleTemplate = isHome ? `%s` : seo.titleTemplate

  const keywords = metaKeywords || postMeta.keywords || seo.keywords

  const postPath = pathname || postMeta.slug

  const canonical = postPath && `${siteUrl}${postPath}`

  // TODO: check if cover works as ogImage
  const image =
    metaImage ||
    postMeta.cover ||
    postMeta.shareImage?.localFile.publicURL ||
    seo.ogImage
  if (!image) {
    console.log(`missing image for ${canonical}`)
  }

  const iconPath = seo.iconPath

  const imagePath = `${siteUrl}/og-image/${image}`

  const type = canonical !== siteUrl ? 'article' : 'website'
  const datePublished = postMeta.datePublished ? postMeta.datePublished : false

  const otherMeta = meta || []

  return {
    title,
    titleTemplate,
    description,
    keywords,
    canonical,
    image,
    imagePath,
    type,
    datePublished,
    otherMeta,
    isBlogPost,
    iconPath,
    siteUrl,
    author,
    organization,
    isHome,
  }
}
