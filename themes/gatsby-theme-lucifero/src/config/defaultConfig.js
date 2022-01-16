const path = require('path')

module.exports = {
  // Website configuration
  website: {
    titleTemplate: '%s · Lucifero Web',
    title: 'Lucifero - bringing light since ever', // Homepage title
    shortTitle: 'Lucifero', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation
    description: 'a theme as Ariman commands', // Website description used for RSS feeds/meta description tag
    copyright: '© Copyright 2021', // Copyright string for the footer of the website and RSS feed.
    bgColor: '#A8A29E', // Used for setting manifest background color.
    themeColor: '#44403C', // Used for setting manifest and progress theme colors.
    author: 'Luciano Amodio',
    ogImage: '/astarte.jpg',
    url: 'http://localhost:8000',
  },
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
  ui: {
    home: ['hero', 'sections'],
  },
  keywords: ['i18n', 'mdx', 'pages'],
  languages: ['en'],
  defaultLanguage: 'en',
  localizeData: [],

  // Gatsby Configuration
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-starter-lucifero/.

  // imagesPath: path.resolve('images'), // Directory for MDX posts
  pagesPath: path.resolve('pages'), // Directory for MDX posts
  dataPath: path.resolve('data'), // Directory for other data
  localesPath: path.resolve('locales'), // Directory for locales

  embeddedImageWidth: 992, // MDX embedded image width. Used by gatsby-plugin-image for optimization
  embeddedVideoWidth: 992, // MDX embedded video width in pixels

  // basePath: undefined, // Base path for mounting pages. Allows for multiple themes to be used in a single website
  i18nPages: [],
  imgix: false,
}
