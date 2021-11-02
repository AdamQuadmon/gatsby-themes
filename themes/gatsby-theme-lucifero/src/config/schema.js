module.exports = `#graphql
  type WebsiteData {
    titleTemplate: String!
    title: String!
    shortTitle: String!
    description: String!
    copyright: String!
    bgColor: String!
    themeColor: String!
    author: String!
    ogImage: String!
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
    src: String!
    address: String!
    lat: Float!
    lng: Float!
    zoom: String!
  }

  type LocalizeData {
    lang: String!
    name: String!
    shortName: String!
    description: String!
  }

  type IconManifest {
    src: String!
    sizes: String!
    type: String!
    purpose: String
  }

  type I18PagesData {
    matchPath: String!
    getLanguageFromPath: Boolean!
    excludeLanguages: [String!]!
    languages: [String!]!
  }

  type  SiteConfig {
    website: WebsiteData!
    organization: OrganizationData
    socials: SocialsData!
    maps: MapsData!

    keywords: [String!]!
    languages: [String!]!
    defaultLanguage: String!
    localizeData: [LocalizeData!]!

    pathPrefix: String!

    pagesPath: String
    dataPath: String
    localesPath: String

    embeddedImageWidth: Int!
    embeddedVideoWidth: Int!

    iconPath: String
    iconList: [IconManifest]!
    iconCachePaths: [String]

    basePath: String
    i18nPages: [I18PagesData!]!
  }

  type SiteSiteMetadata {
    config: SiteConfig!
  }

  # type Image {
  #   childImageSharp {
  #     gatsbyImageData(
  #       layout: CONSTRAINED
  #       width: 1080
  #       placeholder: BLURRED
  #       formats: [AUTO, WEBP, AVIF]
  #     )
  #   }
  # }

  type Mdx implements Node {
    frontmatter: MdxFrontmatter
  }

  type MdxFrontmatter {
    slug: String
    title: String
    description: String
    order: Int
    category: String
    tags: [String]
    noCover: Boolean
    coverAlt: String
    cover: File @fileByRelativePath
  }
`
