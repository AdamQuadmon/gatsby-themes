# The smallest possible Gatsby theme

## Quick Start

```shell
mkdir my-site
cd my-site
yarn init
# install gatsby-theme-lucifero and it's dependencies
yarn add gatsby react react-dom gatsby-theme-lucifero
```

Then add the theme to your `gatsby-config.js`.

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-lucifero",
      options: {},
    },
  ],
}
```

That's it, you can now run your gatsby site using

```shell
yarn gatsby develop
```

## Doing more with themes

You can use this as a place to start when developing themes. I
generally suggest using [yarn
workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) like the
[gatsby-theme-examples repo
does](https://github.com/adamquadmon/gatsby-starter-theme-lucifero),
but using `yarn link` or `npm link` is a viable alternative if you're
not familiar with workspaces.
