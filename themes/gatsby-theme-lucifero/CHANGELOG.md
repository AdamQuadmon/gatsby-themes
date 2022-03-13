# Change Log

## 2.0.8

### Patch Changes

- Fix text, list, heading and blockquote font size

## 2.0.7

### Patch Changes

- Mobile small fixes + update deps

## 2.0.6

### Patch Changes

- Fix ogImage and mobile styles

## 2.0.5

### Patch Changes

- Fix NavMobile link and add Logo

## 2.0.4

### Patch Changes

- fix typo in Posts template

## 2.0.3

### Patch Changes

- remove webpack-bundle-analyzer

## 2.0.2

### Patch Changes

- Disable svgo

## 2.0.1

### Patch Changes

- Fix deps

## 2.0.0

### Major Changes

- Gatsby V4 Restyle

Lots of redesign and new features, the following recap is outdated and incomplete

### Higlights

- add /areas/topic blog posts support and components
- huge redesign of gatsby-node.js also inspired by [gatsby-theme-nicky-blog](https://github.com/NickyMeuleman/gatsby-theme-nicky-blog)

### Breaking Change

- remove manifest and offline plugins from theme as these only works on root projects

### Features

- add dep: gatsby-plugin-breadcrumb, mdx-yaml-full, react-wordcloud, rehype-slug and rehype-sanitize
- add components: Breadcrumbs, Blog/\*
  - Card, FuturePost, Latest, PostCount, PublishedPost,
    Tags, Toc, Topic, Wordcloud
- add seo prop to Layout/Seo components
- add useSeoValues and useSeoDefault hooks
- add use-navPages, use-areas and use-homeAreas
- add use-intersectionObserver for ToC
- add defaultTrue fieldExtension
- add MdxBlogPost model
- explicitly export some hooks and components

### Changes

- add Sections in Home component
- generate navItems from useAreas and useNavPages

### Bug Fixes

- fix primsjs theme import
- fix manifest not working in theme
- fix mdx render in yaml
- fix Map error for missing maps info
- fix favicon in manifest and seo component
- fix absolute Links
- fix NavBar links bottom align

## 1.1.1

### Patch Changes

- Fix Logo vertical align

## 1.1.0

### Features

- Add hook: use-siteMetadata
- Add components: ActionButtons, ErrorFalback, Home, LogoImage, MdxProvider, PageContent
- Update component LayoutContainer implementing Seo props (also for 404 and index pages)
- Update component Logo to have own themed style and use shadowable LogoImage
- Update components NavBar and NavMobile to use ActionButtons

### Patch

- Add prepareMulilangualNodes in `gatsby-node` to speed up build
- Move PageLayout to Page in `templates/` folder
- Split code from LayoutContainer in other files
- Split code from @chakra-ui components in each component

### Bug Fixes

- Fix i18n redirects
- Fix missing commonmark option in mdx config
- Fix NavBar height

## 1.0.3

### Features

- Pass language to useNavItems
- Add `config/fragments.js`

### Bug Fixes

- Fix onCreateNode defaultLanguage langKey
- Fix warning in NavItemSub with no cover image
- Fix Schema category field

## 1.0.2

### Features

- Add LangSelector showLabel option

### Bug Fixes

- Fix LangSelector show label only if there are other languages
- Fix NavItems using i18next Link instead of Gatsby one
- Fix `getLanguages` helper not exporting defaultLanguage

## 1.0.1

### Bug Fixes

- Fix peer dependencies

## 1.0.0

### Features

First release providing YAML, MDX and Chakra UI
