# Contributing

All contributions are welcome, including opening and commenting on issues and pull requests, adding or updating the docs, bug fixes, and suggestions for new features.

## Prerequisites

- [Node.js](http://nodejs.org/) >= v14 must be installed.
- [Yarn](https://yarnpkg.com/en/docs/install)

## Local Development

This repository uses [Yarn Workspaces][] and [changesets][] to develop multiple packages together as a monorepo. Be sure to install [Yarn][] before setting up the development environment.

Clone the repository:

```sh
git clone git@github.com:AdamQuadmon/gatsby-themes.git --depth=1
```

Install the dependencies:

```sh
yarn
```

After yarn has linked packages and installed the dependencies in the repo, you can inspect the locally available workspaces with:

```sh
yarn workspaces info
```

As all themes are set up with a respective example page (to view the theme/changes), you could for example run the "gatsby-theme-lucifero" workspace with the example "lucifero" like:

```sh
yarn workspace lucifero develop
```

## Tests

Tests are not jet implemented

### Jest

Unit tests can be run with [Jest][]

### Cypress

Most of the themes' functionality can be tested with [Cypress][]

## Pull Requests

When opening a pull request, please be sure to update any relevant documentation in the READMEs. Also include a high-level list of changes.

### Changesets

This repository uses [changesets](https://github.com/Noviny/changesets) to do versioning. What that means for contributors is that you need to add a changeset by running `yarn changeset` which contains what packages should be bumped, their associated semver bump types, and some markdown which will be inserted into changelogs.

[yarn]: https://yarnpkg.com
[yarn workspaces]: https://yarnpkg.com/en/docs/workspaces
[changesets]: https://github.com/atlassian/changesets
[jest]: https://jestjs.io/
[cypress]: https://cypress.io