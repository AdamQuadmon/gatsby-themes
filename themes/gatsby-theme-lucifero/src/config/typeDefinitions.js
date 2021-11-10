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
  }

  type SiteSiteMetadata {
    config: SiteConfig!
    ogImage: String
    maps: MapsData
    socials: SocialsData
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

   type Fields {
    area: String
    topic: String
    langKey: String
    slug: String
  }

  type Mdx implements Node {
    frontmatter: MdxFrontmatter
    fields: Fields
  }

  type MdxFrontmatter {
    slug: String
    navPage: Boolean
    title: String
    description: String
    order: Int
    category: String
    date: Date @dateformat
    tags: [String]
    published: Boolean
    noCover: Boolean
    coverAlt: String
    cover: File @fileByRelativePath
  }

  # coming from https://github.com/NickyMeuleman/gatsby-theme-nicky-blog/blob/master/theme/gatsby-node.js
  # TODO: check and fix
  interface Author implements Node {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
    image: File @fileByRelativePath
  }
  type AuthorsJson implements Node & Author {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
    image: File @fileByRelativePath
  }
  type AuthorsYaml implements Node & Author {
    id: ID!
    shortName: String!
    name: String!
    twitter: String
    image: File @fileByRelativePath
  }
  """Extend childOf types with every type of source as they are added"""
  type Tag implements Node @dontInfer @childOf(types: ["MdxBlogPost"]) {
    id: ID!
    name: String!
    slug: String!
    postPublished: Boolean
  }
  interface BlogPost implements Node {
    id: ID!
    date: Date! @dateformat
    updatedAt: Date @dateformat
    slug: String!
    tags: [Tag!] @link(by: "name")
    authors: [Author!] @link(by: "shortName")
    title: String!
    body: String!
    published: Boolean @defaultTrue
    cover: File @fileByRelativePath
    excerpt: String!
    canonicalUrl: String
    keywords: [String]
    tableOfContents(maxDepth: Int = 6): JSON
    series: Series
  }
  type Series {
    name: String!
    posts: [BlogPost!]!
  }
`
