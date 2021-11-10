const website = {
  titleTemplate: '%s · Giano Web',
  title: 'Giano - a go(o)d beginning', // Homepage title
  shortTitle: 'Giano', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation
  description: 'two languages website', // Website description used for RSS feeds/meta description tag
  copyright: '© Copyright 2021', // Copyright string for the footer of the website and RSS feed.
  bgColor: '#A8A29E', // Used for setting manifest background color.
  themeColor: '#44403C', // Used for setting manifest and progress theme colors.
  author: 'Luciano Amodio',
  ogImage: '/lucifero.jpg',
  url: 'http://localhost:8000',
}
const icon = 'src/images/lucifero-logo.png'
const languages = ['en', 'it']
const defaultLanguage = 'en'
const localizeData = [
  {
    start_url: 'it',
    lang: 'it',
    name: 'Giano',
    shortName: 'Giano',
    description: 'sito web in due lingue',
  },
]

module.exports = {
  plugins: [
    {
      resolve: `@adamquadmon/gatsby-theme-lucifero`,
      options: {
        website,
        // Organization information used for SEO
        organization: {
          name: 'The Hell',
          url: 'https://github.com/adamquadmon/gatsby-theme-lucifer',
          logo: '/og-image/lucifero.jpg',
          subTitle: 'feels like home',
          address1: '666, Sunset Bl.',
          address2: '	7517 - Hell',
          address2short: 'Hell',
          iva: '0123456789',
          copyright: 'Luciano Amodio',
          cellNumber: '+1 666 142857',
        },
        socials: {
          facebook: 'luciferotheme',
          instagram: 'luciferotheme',
          whatsapp: '1666142857',
        },
        maps: {
          src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14269.67524521046!2d10.878507979290722!3d63.44444673008852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d17ad4b6f81c7%3A0xc32c3fc048fd812!2sHell%20-%20Gods%20Expedition!5e0!3m2!1sit!2sit!4v1635759088068!5m2!1sit!2sit',
          address: 'Hell - Gods Expedition',
          lat: 63.446709091321495,
          lng: 10.899881621452812,
          zoom: 12,
        },
        keywords: ['i18n', 'mdx', 'pages'],

        languages,
        defaultLanguage,
        localizeData,
        i18nPages: [
          {
            matchPath: '/services/:uid',
            // getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/servizi/:uid',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/:lang?/:uid',
            getLanguageFromPath: true,
          },
        ],
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
        // icons: [],
        lang: defaultLanguage,
        localize: localizeData,
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
