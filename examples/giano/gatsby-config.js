const { getManifestOptions } = require('@adamquadmon/gatsby-theme-lucifero')
const languages = ['en', 'it']
const defaultLanguage = 'en'
const siteUrl = 'http://localhost:8000'
const baseOgImage =
  'https://ik.imagekit.io/adamquadmon/lucifero/lucifero-logo_OdnZnen7n3G.png'

const translations = [
  {
    language: 'en',
    titleTemplate: '%s · Giano Web',
    title: 'Giano - a go(o)d beginning',
    shortTitle: 'Giano',
    alternateName: 'Two Languages Website',
    description: 'two languages website',
    url: siteUrl,
    mainKeyword: 'gatsbyjs theme',
  },
  {
    language: 'it',
    titleTemplate: '%s · Giano Web',
    title: 'Giano - a go(o)d beginning',
    shortTitle: 'Giano',
    alternateName: 'Two Languages Website',
    description: 'two languages website',
    url: `${siteUrl}/it`,
    mainKeyword: 'gatsbyjs theme',
  },
]

const website = {
  copyright: '© Copyright 2021',
  author: 'Luciano Amodio',
  bgColor: '#A8A29E',
  themeColor: '#44403C',
  ogImage: baseOgImage,
  dateCreated: '2019-04-10',
  translations,
}

const organization = {
  name: 'The Hell',
  url: 'https://github.com/adamquadmon/gatsby-theme-lucifer',
  logo: 'https://ik.imagekit.io/adamquadmon/lucifero/lucifero-logo_OdnZnen7n3G.png',
  slogan: 'feels like home',
  mapUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14269.67524521046!2d10.878507979290722!3d63.44444673008852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d17ad4b6f81c7%3A0xc32c3fc048fd812!2sHell%20-%20Gods%20Expedition!5e0!3m2!1sit!2sit!4v1635759088068!5m2!1sit!2sit',
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
  vatID: '0123456789',
  telephone: '+1 666 142857',
}

module.exports = {
  plugins: [
    {
      resolve: `@adamquadmon/gatsby-theme-lucifero`,
      options: {
        languages,
        defaultLanguage,
        siteUrl,
        website,
        organization,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: translations[0].title,
        short_name: translations[0].shortTitle,
        description: translations[0].description,
        start_url: '/',
        background_color: website.bgColor,
        theme_color: website.themeColor,
        display: 'minimal-ui',
        cache_busting_mode: 'none',
        icon,
        lang: defaultLanguage,
      },
    },
  ],
}
