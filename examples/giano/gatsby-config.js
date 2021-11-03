module.exports = {
  plugins: [
    {
      resolve: `@adamquadmon/gatsby-theme-lucifero`,
      options: {
        languages: ['it', 'en'],
        defaultLanguage: 'it',
        i18nPages: [
          {
            matchPath: '/contenuti/:uid',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/contents/:uid',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/:uid',
            getLanguageFromPath: true,
          },
        ],
      },
    },
  ],
}
