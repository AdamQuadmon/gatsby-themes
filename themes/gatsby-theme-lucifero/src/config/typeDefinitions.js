module.exports = `#graphql
  type SiteSiteMetadata {
    ui: UiData
    defaultLanguage: String!
    languages: [String!]!
    website: WebsiteData!
    organization: OrganizationData
    pagesPath: String
    dataPath: String
    localesPath: String
    basePath: String
    i18nPages: [I18PagesData!]!
  }

  type UiData {
    imgix: String
    home: [String]
    embedWidth: String
  }

  type WebsiteData {
    author: String!
    copyright: String!
    dateCreated: String!
    icon: String
    ogImage: String
    bgColor: String!
    themeColor: String!
    translations: [TranslationData!]
  }

  type TranslationData {
    titleTemplate: String!
    title: String!
    shortTitle: String!
    alternateName: String!
    description: String!
    url: String!
    mainKeyword: String!
    keywords: [String!]
  }

  type OrganizationData {
    type: String!
    name: String!
    legalName: String
    slogan: String
    description: String!
    url: String!
    logo: String!
    image: String!
    vatID: String
    telephone: String
    mapUrl: String
    alternateName: [String]
    socials: SocialsData!
    address: AddressData
    geo: GeoData
    meta: [MetaData!]
  }
  type MetaData {
    name: String
    value: String
  }

  type GeoData {
    latitude: String
    longitude: String
  }
  type AddressData {
    streetAddress: String
    addressLocality: String
    addressRegion: String
    postalCode: String
    addressCountry: String
  }

  type SocialsData {
    facebook: String
    instagram: String
    whatsapp: String
  }

  type I18PagesData {
    matchPath: String!
    getLanguageFromPath: Boolean!
    excludeLanguages: [String!]!
    languages: [String!]!
  }

  type PlaceCsv implements Node {
    id: ID!
    published: Boolean @defaultFalse
    order: Int @defaultNumber(n: 999)
    area: String
    topic: String
    language: String
    # i18nPath: String
    # slug: String
    # meta
    name: String
    headline: String
    alternativeHeadline: String
    description: String
    tags: String
    abstract: String
    location: String
    award: String
    discussionUrl: String
    dateCreated: Date @dateformat
    dateModified: Date @dateformat
    datePublished: Date @dateformat
    author: String
    #
    # Other fields
    #
    image: String
    pax: Int
    region: String
    city: String
    cap: String
    address: String
    cell: String
    places: String
    web: String
    facebook: String
    instagram: String
  }
`
