import { useSiteMetadata } from './use-siteMetadata'

export const useSeoDefault = () => {
  const site = useSiteMetadata()

  const {
    title,
    titleTemplate,
    description,
    author,
    keywords,
    siteUrl,
    ogImage,
    iconPath,
    organization,
    socials,
  } = site

  return {
    iconPath,
    title,
    titleTemplate,
    description,
    author,
    keywords,
    siteUrl,
    ogImage,
    organization,
    socials,
  }
}
