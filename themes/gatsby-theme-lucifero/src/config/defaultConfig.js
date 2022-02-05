const path = require('path')

module.exports = {
  // Website configuration
  website: {
    titleTemplate: '%s · Lucifero Web',
    title: 'Lucifero - bringing light since ever', // Homepage title
    shortTitle: 'Lucifero', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation
    alternateName: 'a theme as Ariman commands', // Website description used for RSS feeds/meta description tag
    description: 'From the Hell to the Heaven, a theme as Ariman commands', // Website description used for RSS feeds/meta description tag
    copyright: '© Copyright 2021', // Copyright string for the footer of the website and RSS feed.
    bgColor: '#A8A29E', // Used for setting manifest background color.
    themeColor: '#44403C', // Used for setting manifest and progress theme colors.
    author: 'Luciano Amodio',
    ogImage: '/astarte.jpg',
    dateCreated: '2012-04-10',
    mainKeyword: 'webmarketing',
    url: 'http://localhost:8000',
  },
  // Organization information used for SEO
  organization: {
    type: 'ProfessionalService',
    name: 'The Hell',
    description: 'A Theme for Gatsby full of Pain',
    url: 'https://github.com/adamquadmon/gatsby-theme-lucifer',
    logo: 'https://ik.imagekit.io/adamquadmon/lucifero/lucifero-logo_OdnZnen7n3G.png',
    telephone: '+1 666 142857',
    hasMap:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14269.67524521046!2d10.878507979290722!3d63.44444673008852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d17ad4b6f81c7%3A0xc32c3fc048fd812!2sHell%20-%20Gods%20Expedition!5e0!3m2!1sit!2sit!4v1635759088068!5m2!1sit!2sit',
    alternateName: [],
    address: {
      streetAddress: '666, Sunset Bl.',
      addressLocality: 'Hell',
      addressRegion: '',
      postalCode: '7517',
      addressCountry: '',
    },
    geo: {
      latitude: '63.446709091321495',
      longitude: '10.899881621452812',
    },

    vatID: '0123456789',
    slogan: 'Better to reign in the Hell than serve in the Heaven',
    legalName: 'Hell Ya!',
    image:
      'https://ik.imagekit.io/adamquadmon/lucifero/lucifero-logo_OdnZnen7n3G.png',
    // other metas for schema.org Organization
    meta: {},
  },
  socials: {
    facebook: 'luciferotheme',
    instagram: 'luciferotheme',
    whatsapp: '1666142857',
  },
  maps: {
    address: 'Hell - Gods Expedition',
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
  disallowBlogHomeMdx: true,
  imagesReplaceText: 'Lucifero-',
}
