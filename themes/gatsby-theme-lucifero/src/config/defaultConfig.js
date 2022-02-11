const path = require('path')

const languages = ['en']
const defaultLanguage = 'en'
const siteUrl = 'http://localhost:8000'
const baseOgImage =
  'https://ik.imagekit.io/adamquadmon/lucifero/lucifero-logo_OdnZnen7n3G.png'
const translations = [
  {
    language: 'en',
    titleTemplate: '%s · Lucifero Web',
    title: 'Lucifero - bringing light since ever', // Homepage title
    shortTitle: 'Lucifero', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation
    alternateName: 'a theme as Ariman commands', // Website description used for RSS feeds/meta description tag
    alternateName: 'Rock The Hell',
    description: 'From the Hell to the Heaven, a theme as Ariman commands', // Website description used for RSS feeds/meta description tag
    url: siteUrl,
    mainKeyword: 'gatsbyjs theme lucifero',
  },
]

const website = {
  copyright: '© Copyright 2021',
  author: 'Luciano Amodio',
  bgColor: '#A8A29E',
  themeColor: '#44403C',
  ogImage: baseOgImage,
  dateCreated: '2021-11-11',
  icon: './src/images/lucifero-logo.png',
  translations,
}

const organization = {
  type: 'ProfessionalService',
  name: 'The Hell',
  description: 'A Theme for Gatsby full of Pain',
  url: 'https://github.com/adamquadmon/gatsby-theme-lucifer',
  logo: 'https://ik.imagekit.io/adamquadmon/lucifero/lucifero-logo_OdnZnen7n3G.png',
  telephone: '+1 666 142857',
  hasMap:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14269.67524521046!2d10.878507979290722!3d63.44444673008852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d17ad4b6f81c7%3A0xc32c3fc048fd812!2sHell%20-%20Gods%20Expedition!5e0!3m2!1sit!2sit!4v1635759088068!5m2!1sit!2sit',
  alternateName: [],
  socials: {
    facebook: 'luciferotheme',
    instagram: 'luciferotheme',
    whatsapp: '1666142857',
  },
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
}

module.exports = {
  ui: { home: ['hero', 'sections'], embedWidth: 992, imgix: false },
  languages,
  defaultLanguage,
  siteUrl,
  website,
  organization,
  pagesPath: path.resolve('pages'), // Directory for MDX posts
  dataPath: path.resolve('data'), // Directory for other data
  localesPath: path.resolve('locales'), // Directory for locales
  i18nPages: [
    {
      matchPath: '/',
      getLanguageFromPath: false,
    },
    {
      matchPath: '/:lang?/404',
      getLanguageFromPath: false,
    },
    {
      matchPath: '/:lang?/gallery',
      getLanguageFromPath: false,
    },
    {
      matchPath: '/:lang?/posts',
      getLanguageFromPath: false,
    },
    {
      matchPath: '/:lang?/:uid*',
      getLanguageFromPath: true,
    },
  ],
}
