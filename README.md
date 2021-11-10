<h1 align="center">
  Free & Open Source Gatsby Themes by AdamQuadmon
</h1>

<p align="center">
  <a href="https://github.com/AdamQuadmon/gatsby-themes/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@adamquadmon/gatsby-themes is released under the MIT license." />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
</p>

Gatsby themes to quickly bootstrap your website!

It is ispired by:

- [@LekoArts/gatsby-themes](https://github.com/LekoArts/gatsby-themes)
- [gatsby-theme-catalyst](https://github.com/ehowey/gatsby-theme-catalyst)
- [gatsby-theme-nicky-blog](https://github.com/NickyMeuleman/gatsby-theme-nicky-blog)

## Contents

This repository uses [Yarn Workspaces][] and [changesets][] to develop multiple packages together as a monorepo and [renovate][] to keep deps updated. Be sure to install [Yarn][] before setting up the development environment.

- `examples`: Contains the corresponding example sites for the `themes`.
- `themes`: Contains the themes themselves.
- `scripts`: Contains utils to handle stuff.

## Scripts

in the `scripts` folder:

- `mdx` - create in `csv/` folder `posts.csv`, `areas.csv`, `cagegories.csv` and `tags.csv` with mdx content from `basePath` following **area** and **topic** sections renaming topics to categories

## Tools

- [fast-csv](https://github.com/C2FO/fast-csv) - CSV parser and formatter
- [front-matter](https://github.com/jxson/front-matter) - extract YAML front matter from strings

## How to Contribute

Make sure that you have `yarn` installed on your machine (as it's mandatory for `yarn workspaces`). Fork this repository, clone it and run `yarn` in the root directory.

To launch the development server of an example site, use:

```sh
yarn workspace [examples/name] develop
```

Or for a build:

```sh
yarn workspace [examples/name] build
```

In the case of `examples/lucifero` this command would be `yarn workspace lucifero develop`. Now you can make changes to the respective theme and see them via Hot-Reloading.

Commit your changes to a feature branch of your fork and open up a PR against this repository. The PR will have checks in place which you can also run on your machine in preparation for the PR.

Have a look at the [contributing guide](CONTRIBUTING.md) to learn more.

## 🎓 Learning Gatsby Themes

### Articles from lekoarts.de

- [How I used Theme UI to build my Gatsby Themes library](https://www.lekoarts.de/javascript/how-i-used-theme-ui-to-seamlessly-convert-design-to-code?utm_source=gatsby-themes&utm_medium=README)
- [Setting up a Gatsby Themes workspace with TypeScript, ESLint & Cypress](https://www.lekoarts.de/javascript/setting-up-a-yarn-workspace-with-typescript-eslint-and-cypress?utm_source=gatsby-themes&utm_medium=README)
- [Specimens for Gatsby powered Design Systems](https://www.lekoarts.de/garden/specimens-for-gatsby-powered-design-systems?utm_source=gatsby-themes&utm_medium=README)
- [Creating your own Status Dashboard with Gatsby](https://www.lekoarts.de/garden/creating-your-own-status-dashboard-with-gatsby?utm_source=gatsby-themes&utm_medium=README)

### Official resources

- [Gatsbyjs.com - Gatsby Themes](https://www.gatsbyjs.com/docs/themes/)
- [Building a Theme](https://www.gatsbyjs.com/tutorial/building-a-theme/)
- [Free egghead.io "Gatsby Theme Authoring" course](https://egghead.io/courses/gatsby-theme-authoring)

[LekoArts/gatsby-themes]: https://github.com/LekoArts/gatsby-themes
[Ehowey/gatsby-theme-catalyst]: https://github.com/ehowey/gatsby-theme-catalyst
[yarn]: https://yarnpkg.com
[yarn workspaces]: https://yarnpkg.com/en/docs/workspaces
[changesets]: https://github.com/atlassian/changesets
[renovate]: https://github.com/renovatebot/renovate

## TODO

- [] fix MDX Blog
  - [] fix favicon and ogImage
  - [] use MdxBlog model
- [] use Strapi
- [] add theme translations
- [] add sub pages to navPage items
- [] document components (maybe using [storybook](https://storybook.js.org/))
- [] upgrade rehype-slug and rehype-sanitize once gatsby move to esm