module.exports = `#graphql
  type SiteSiteMetadata {
    config: SiteConfig!
    ogImage: String
    icon: String
    maps: MapsData
    socials: SocialsData
    organization: OrganizationData
  }

  type SiteConfig {
    website: WebsiteData!
    socials: SocialsData!
    maps: MapsData

    keywords: [String!]!
    languages: [String!]!
    defaultLanguage: String!

    pathPrefix: String!

    pagesPath: String
    dataPath: String
    localesPath: String

    embeddedImageWidth: Int!
    embeddedVideoWidth: Int!

    basePath: String
    i18nPages: [I18PagesData!]!
    imgix: ImgixConfig
    imagesReplaceText: String
    allowBlogTypePage: Boolean!
  }

  type WebsiteData {
    author: String!
    alternateName: String!
    bgColor: String!
    copyright: String!
    dateCreated: String!
    description: String!
    mainKeyword: String!
    ogImage: String
    shortTitle: String!
    themeColor: String!
    titleTemplate: String!
    title: String!
    url: String!
  }

  type OrganizationData {
    type: String!
    name: String!
    description: String!
    url: String!
    logo: String!
    telephone: String
    hasMap: String
    alternateName: [String]
    address: AddressData
    geo: GeoData
    vatID: String
    slogan: String
    legalName: String
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
    facebook: String!
    instagram: String!
    whatsapp: String!
  }

  type MapsData {
    src: String
    address: String
    lat: Float
    lng: Float
    zoom: String
  }

  type I18PagesData {
    matchPath: String!
    getLanguageFromPath: Boolean!
    excludeLanguages: [String!]!
    languages: [String!]!
  }

  type ImgixConfig {
    source: String
    token: String
  }

  type SitePage implements Node {
    context: SitePageContext
  }

  type SitePageContext {
    i18n: I18n
  }

  type I18n {
    defaultLanguage: String
    languages: [String]
    originalPath: String
    routed: Boolean
  }

  """
  Extend childOf types with every type of source as they are added
  """
  type Tag implements Node @dontInfer @childOf(types: ["Page"]) {
    id: ID!
    name: String!
    slug: String!
    postPublished: Boolean
  }

  type PlaceCsv implements Node {
    id: ID!
    published: Boolean @defaultFalse
    area: String
    topic: String
    # i18nPath: String
    # slug: String
    #
    # Thing Schema
    #
    description: String
    image: String
    name: String
    #
    # CreativeWork Schema
    tags: String
    abstract: String
    author: String
    contentLocation: String
    dateCreated: Date @dateformat
    dateModified: Date @dateformat
    datePublished: Date @dateformat
    genre: String
    headline: String
    language: String
    order: Int @defaultNumber(n: 999)
    #
    # Other fields
    #
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
