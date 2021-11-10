const website = {
  titleTemplate: '%s · Lucifero Web',
  title: 'Lucifero - bringing Light since ever', // Homepage title
  shortTitle: 'Lucifero', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation
  description: 'Rock The Hell Outta You!', // Website description used for RSS feeds/meta description tag
  bgColor: '#A8A29E', // Used for setting manifest background color.
  themeColor: '#44403C', // Used for setting manifest and progress theme colors.
  ogImage: '/lucifero.jpg',
}
const icon = './src/images/lucifero-logo.png'

module.exports = {
  plugins: [
    {
      resolve: `@adamquadmon/gatsby-theme-lucifero`,
      options: {
        website,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: website.title,
        short_name: website.shortTitle,
        description: website.description,
        start_url: '/',
        background_color: website.bgColor,
        theme_color: website.themeColor,
        display: 'minimal-ui',
        cache_busting_mode: 'none',
        icon,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/assets*'],
        },
      },
    },
  ],
}
