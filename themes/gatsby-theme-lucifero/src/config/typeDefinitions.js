module.exports = `#graphql
  type SiteSiteMetadata {
    config: SiteConfig!
    ogImage: String
    maps: MapsData
    socials: SocialsData
  }

  type  SiteConfig {
    website: WebsiteData!
    organization: OrganizationData
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
  }

  type WebsiteData {
    titleTemplate: String!
    title: String!
    shortTitle: String!
    description: String!
    copyright: String!
    bgColor: String!
    themeColor: String!
    author: String!
    ogImage: String
    url: String!
  }

  type OrganizationData {
    name: String!
    description: String!
    logoUrl: String!
    url: String!
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

  """Extend childOf types with every type of source as they are added"""
  type Tag implements Node @dontInfer @childOf(types: ["MdxBlogPost"]) {
    id: ID!
    name: String!
    slug: String!
    postPublished: Boolean
  }

  interface Page implements Node {
    id: ID!
    fileAbsolutePath: String!
    slug: String!
    lang: String
    order: Int
    type: String
    published: Boolean
    body: String
    excerpt: String
    date: Date! @dateformat
    updatedAt: Date @dateformat
    timeToRead: Int
    tableOfContents(maxDepth: Int = 6): JSON
    meta: PagesCsv
  }
  interface BlogPost implements Node & Page {
    id: ID!
    fileAbsolutePath: String!
    slug: String!
    lang: String
    order: Int
    type: String
    published: Boolean
    body: String!
    excerpt: String!
    date: Date! @dateformat
    updatedAt: Date @dateformat
    timeToRead: Int
    tableOfContents(maxDepth: Int = 6): JSON
    meta: PagesCsv
    area: String
    topic: String
    tags: [Tag!] @link(by: "name")
  }
  type PagesCsv implements Node {
    id: ID!
    file: String!
    slug: String!
    title: String
    description: String
    published: Boolean @defaultTrue
    order: String
    navPage: Boolean @defaultFalse
    noCover: Boolean @defaultFalse
    folder: String
    cover: String
    gallery: String
    pax: String
    region: String
    city: String
    cap: String
    address: String
    cell: String
    places: String
    facebook: String
    instagram: String
    web: String
    tags: [Tag!] @link(by: "name")
    # authors: [Author!] @link(by: "shortName")
  }
`
