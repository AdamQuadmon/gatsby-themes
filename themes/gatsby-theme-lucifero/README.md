<h1 align="center">
  @adamquadmon/gatsby-theme-lucifero
</h1>

<p align="center">
  <a href="https://github.com/adamquadmon/gatsby-themes/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@adamquadmon/gatsby-theme-lucifero is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.org/package/@adamquadmon/gatsby-theme-lucifero">
    <img src="https://img.shields.io/npm/v/@adamquadmon/gatsby-theme-lucifero.svg" alt="Current npm package version." />
  </a>
</p>

A Satanic Gatsby theme featuring Chakra UI Dark/Light theme with MDX and other suff

## Features

- Chakra UI-based theming
- Light/Dark mode
- MDX

## Installation

```sh
mkdir my-site
cd my-site
yarn init
# install gatsby-theme-lucifero and it's dependencies
yarn add gatsby react react-dom @adamquadmon/gatsby-theme-lucifero
```

## Usage

### Theme options

In the `src/config/` folder you will find `defaultConfig.js`

| Key        | Default Value | Description                                                                                             |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| `basePath` | `/`           | Root url for the theme                                                                                  |

#### Example usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `@adamquadmon/gatsby-theme-lucifero`,
      options: {
        // basePath defaults to `/`
        basePath: `/sideproject`,
      },
    },
  ],
};
```

### Shadowing

Please read the guide [Shadowing in Gatsby Themes](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) to understand how to customize the theme! Generally speaking you will want to place your files into `src/@adamquadmon/gatsby-theme-lucifero/` to shadow/override files. The Chakra UI config can be configured by shadowing its files in `src/gatsby-theme-lucifero/@chakra-ui/gatsby-plugin`.

## What's inside

This is a list of included plugins, the ones ending in***** are community plugins

### Design

- [@chakra-ui/gatsby-plugin](https://chakra-ui.com/guides/integrations/with-gatsby)* - integrate [Chakra UI](https://chakra-ui.com/)
- [gatsby-plugin-svgr](https://github.com/zabute/gatsby-plugin-svgr)* - [SVGR](https://github.com/gregberge/svgr) plugin to transform SVGs into React components
- [gatsby-plugin-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image) - responsive images
- [gatsby-plugin-sharp](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp) - image processing functions built on the [Sharp image processing library](https://github.com/lovell/sharp)
- [gatsby-transformer-sharp](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-sharp) - creates ImageSharp nodes

### Data

- [gatsby-source-filesystem](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem) - create `data`, `pages`, `locales` folders
- [gatsby-plugin-react-i18next](https://github.com/microapps/gatsby-plugin-react-i18next)* - translate your website using [react-i18next](https://react.i18next.com/)
- [gatsby-transformer-yaml-full](https://github.com/stldo/gatsby-transformer-yaml-full)* - YAML parser for data content
- [gatsby-plugin-mdx](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx) - use [MDX](https://mdxjs.com/) for page content
  - [gatsby-remark-images](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images) - processes images in markdown so they can be used in the production build
  - [gatsby-remark-responsive-iframe](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-responsive-iframe) - wraps iframes or objects within markdown files in a responsive elastic container with a fixed aspect ratio.
  - [gatsby-remark-prismjs](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs) - adds syntax highlighting to code blocks in markdown files using [PrismJS](https://prismjs.com/)
  - [gatsby-remark-copy-linked-files](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-copy-linked-files) - copies local files linked to/from Markdown files to the root directory
  - [gatsby-remark-unwrap-images](https://github.com/cedricdelpoux/gatsby-remark-unwrap-images) - unwrap remark images nodes from paragraph nodes
  - [gatsby-remark-embed-video](https://github.com/borgfriend/gatsby-remark-embed-video) - display videos in Markdown
  - [gatsby-remark-relative-images](https://github.com/danielmahon/gatsby-remark-relative-images) - convert markdown image src(s) to be relative for gatsby-remark-images
  - [gatsby-remark-normalize-paths](https://github.com/cedricdelpoux/gatsby-remark-normalize-paths) - normalize paths in frontmatter and body of markdown files to be gatsby compliant
  - [gatsby-remark-external-links](https://github.com/JLongley/gatsby-remark-external-links) - adds the target and rel attributes to external links in markdown
  - [remark-codesandbox](https://github.com/kevin940726/remark-codesandbox) - create CodeSandbox directly from code blocks

### SEO & Performances

- [gatsby-plugin-robots-txt](https://github.com/mdreizin/gatsby-plugin-robots-txt)* -  creates `robots.txt` for your site
- [gatsby-plugin-react-helmet](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-react-helmet) - implement [React Helmet](https://github.com/nfl/react-helmet) for SEO stuff
- [gatsby-plugin-manifest](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-manifest) - allows users to add your site to their home screen on mobile browsers
- [gatsby-plugin-sitemap](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sitemap) - create a sitemap for your website
- [gatsby-plugin-gdpr-cookies](https://github.com/andrezimpel/gatsby-plugin-gdpr-cookies)* - add Google Analytics (V4 is supported), Google Tag Manager, Facebook Pixel, TikTok Pixel and Hotjar in a GDPR form to your site
- [gatsby-plugin-nprogress](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-nprogress) - shows the [nprogress](https://ricostacruz.com/nprogress/) indicator when a page is delayed
- [gatsby-plugin-offline](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-offline) - support for making a Gatsby site work offline and more resistant to bad network connections
- [gatsby-plugin-lodash](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-lodash) - Lodash webpack & Babel plugins

## Design

### Theming

This theme uses [Chakra UI](https://chakra-ui.com/) for css-in-js styling.
You can override theming in the `src/gatsby-theme-lucifero/@chakra-ui/gatsby-plugin/` folder, the entrypoint is `theme.js`

#### Fonts

add a [GoolgeFonts](https://fonts.google.com/) from [fontsource](https://fontsource.org/) using **yarn**:

```shell
yarn add @fontsource/im-fell-english
```

include the font in `gatsby-browser.js`:

```js
import '@fontsource/im-fell-english';
```

use the font in theme files, for example in `typography.js`:

```js
export const typography = {
  fonts: {
    body: 'IM Fell English',
  },
};

```

#### Theme Modes

Chakra UI is configured for Dark and Light mode, you can find some example in the `components.js` file

```js
export const components = {
  components: {
    Heading: {
      baseStyle: ({ colorMode }) => ({
        color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
      }),
    }
  }
}
```

#### Colors

Chakra leverage on TailwindCSS base colors.
You can find here [all Tailwind colors](https://tailwindcss.com/docs/customizing-colors)

### Components

The theme provide the following components:

- **LayoutPage** - Layout for Pages
- **LayoutContainer** - Base Container including:
  - **NavBar** - full responsive navbar with **LangSelector**, **ThemeSwitcher**, **SocialButtons**, **Logo**, address and cell info
  - **Footer** - **Logo** with organization info, navigation items, **LangSelector**, **SocialButtons** and a **Map**
  - **SEO** - with ogImage and **SchemaOrg**
- **Cards** - Dispaly responsive Cards for content
- **CookieConsent** - The GDPR stuff
- **Hero** - Hero component for home pages

## Data

### YAML

adding a `data/collection.yaml` file
```yaml
character: a
number: 1

---

character: b
number: 2
```

you can query for data inside using GraphQL:

```graphql
{
  allCollectionYaml {
    edges {
      node {
        character
        number
      }
    }
  }
}
```

### MDX

In the `pages` folder you can add [MDX](https://mdxjs.com/) files to create pages and posts

### NavItems

To override the navigation links of the menu you can create the file `src/gatsby-theme-lucifero/hooks/use-navItems.js`

## Changelog

You can find the extensive [changelog of changes on GitHub](https://github.com/adamquadmon/gatsby-themes/blob/main/themes/gatsby-theme-lucifero/CHANGELOG.md). You'll be able to see each patch, minor, and major changes and what pull requests contributed to them.

## Questions?

If you have general questions or need help with Gatsby, please go to one of the [support platforms](https://www.gatsbyjs.com/contributing/community/#where-to-get-support) mentioned in Gatsby's documentation. If you have a specific question about this theme, you can head to the [GitHub Discussions](https://github.com/adamquadmon/gatsby-themes/discussions) of the repository.