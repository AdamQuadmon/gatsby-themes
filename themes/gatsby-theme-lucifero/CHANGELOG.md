# Change Log

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
