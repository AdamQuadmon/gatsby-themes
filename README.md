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

## Contents

This repository is a collection of my Gatsby themes, managed as a [monorepo](https://trunkbaseddevelopment.com/monorepos/) with [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

- `examples`: Contains the corresponding example sites for the `themes`.
- `themes`: Contains the themes themselves.

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

Commit your changes to a feature branch of your fork and open up a PR against this repository.

### Official resources

- [Gatsbyjs.com - Gatsby Themes](https://www.gatsbyjs.com/docs/themes/)
- [Building a Theme](https://www.gatsbyjs.com/tutorial/building-a-theme/)
- [Free egghead.io "Gatsby Theme Authoring" course](https://egghead.io/courses/gatsby-theme-authoring)