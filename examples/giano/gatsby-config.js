module.exports = {
  plugins: [
    {
      resolve: `@adamquadmon/gatsby-theme-lucifero`,
      options: {
        languages: ['it', 'en'],
        defaultLanguage: 'it',
        i18nPages: [
          {
            matchPath: '/:lang?/:uid',
            getLanguageFromPath: true,
          },
        ],
      },
    },
  ],
}
