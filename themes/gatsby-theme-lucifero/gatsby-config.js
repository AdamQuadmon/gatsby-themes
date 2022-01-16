//github.com/gatsbyjs/gatsby/discussions/31599#discussioncomment-1239988
const urljoin = require('url-join')
const { withDefaults, getLanguages } = require('./src/config/index.js')
const remarkA11yEmoji = require('@fec/remark-a11y-emoji')
const rehypeSlug = require('rehype-slug')
// const rehypeSanitize = require('rehype-sanitize')

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env

const { GA_TRACKING_ID, TM_TRACKING_ID, FB_PIXEL_ID, TT_PIXEL_ID, HOTJAR_ID } =
  process.env
module.exports = (userConfig) => {
  // Merge user and default configurations
  const config = withDefaults(userConfig)

  // Make sure that pathPrefix is not empty
  const validatedPathPrefix = config.pathPrefix === '' ? '/' : config.pathPrefix

  const { languages, defaultLanguage } = getLanguages(config)

  const siteUrl = urljoin(config.website.url, config.pathPrefix)

  return {
    pathPrefix: validatedPathPrefix,
    siteMetadata: {
      config, // Make the merged configuration available via GraphQL
      titleTemplate: config.website.titleTemplate,
      title: config.website.title,
      shortTitle: config.website.shortTitle,
      description: config.website.description,
      copyright: config.website.copyright,
      bgColor: config.website.bgColor,
      themeColor: config.website.themeColor,
      author: config.website.author,
      ogImage: config.website.ogImage,
      iconPath: config.website.iconPath,
      siteUrl,
      keywords: config.keywords,
      organization: config.organization,
      socials: config.socials,
      maps: {
        src: config.maps.src,
        address: config.maps.address,
        lat: config.maps.lat,
        lng: config.maps.lng,
        zoom: config.maps.zoom,
      },
    },
    plugins: [
      'gatsby-plugin-lodash',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'pages',
          path: config.pagesPath,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'data',
          path: config.dataPath,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: config.localesPath,
          name: 'locale',
        },
      },
      {
        resolve: `@imgix/gatsby`,
        options: {
          // This is the domain of your imgix source, which can be created at
          // https://dashboard.imgix.com/.
          // Only "Web Proxy" imgix sources can be used for this configuration.
          domain: `${config.imgix.source}.imgix.net`,

          // This is the source's secure token. Can be found under the "Security"
          // heading in your source's configuration page, and revealed by tapping
          // "Show Token".
          // secureURLToken: config.imgix.token,

          // This configures the plugin to work in proxy mode.
          // sourceType: ImgixSourceType.WebProxy,

          // These are some default imgix parameters to set for each image. It is
          // recommended to have at least this minimal configuration.
          defaultImgixParams: { auto: ['compress', 'format'] },
          disableIxlibParam: true,

          // This configures which nodes to modify.
          fields: [
            // Add an object to this array for each node type you want to modify. Follow the instructions below for this.
          ],
        },
      },
      'gatsby-plugin-mdx-embed',
      // {
      //   resolve: 'gatsby-source-filesystem',
      //   options: {
      //     path: config.imagesPath,
      //     name: 'images',
      //   },
      // },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          commonmark: true,
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [
            'gatsby-remark-unwrap-images',
            {
              resolve: 'gatsby-remark-embed-video',
              options: {
                width: config.embeddedVideoWidth,
              },
            },
            // {
            //   resolve: `gatsby-remark-relative-images`,
            //   options: {
            //     // [Optional] The root of "media_folder" in your config.yml
            //     // Defaults to "static"
            //     staticFolderName: config.imagesPath,
            //     // staticFolderName: 'images',
            //     // [Optional] Include the following fields, use dot notation for nested fields
            //     // All fields are included by default
            //     include: ['cover'],
            //     // [Optional] Exclude the following fields, use dot notation for nested fields
            //     // No fields are excluded by default
            //     // exclude: ['cover.skip'],
            //   },
            // },
            // {
            //   resolve: 'gatsby-remark-normalize-paths',
            //   options: {
            //     pathFields: ['image', 'cover'],
            //   },
            // },
            {
              resolve: 'gatsby-remark-responsive-iframe',
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: config.embeddedImageWidth,
                showCaptions: ['title', 'alt'],
                linkImagesToOriginal: false,
              },
            },
            {
              resolve: 'remark-codesandbox/gatsby',
              options: {
                mode: 'button',
              },
            },
            {
              resolve: 'gatsby-remark-external-links',
              options: {
                target: '_self',
                rel: 'nofollow',
              },
            },
            { resolve: 'gatsby-remark-copy-linked-files' },

            {
              resolve: 'gatsby-remark-prismjs',
              options: {
                classPrefix: 'language-',
                inlineCodeMarker: null,
                aliases: {},
                showLineNumbers: false,
                noInlineHighlight: false,
                prompt: {
                  user: 'root',
                  host: 'localhost',
                  global: false,
                },
                escapeEntities: {},
              },
            },
          ],
          remarkPlugins: [remarkA11yEmoji],
          rehypePlugins: [
            rehypeSlug,
            // rehypeSanitize
          ],
        },
      },
      {
        resolve: 'gatsby-plugin-nprogress',
        options: {
          color: config.website.themeColor,
        },
      },
      {
        resolve: `gatsby-plugin-gdpr-cookies`,
        options: {
          googleAnalytics: {
            trackingId: GA_TRACKING_ID,
            cookieName: 'gatsby-gdpr-google-analytics',
            anonymize: true,
            allowAdFeatures: false,
          },
          googleTagManager: {
            trackingId: TM_TRACKING_ID,
            cookieName: 'gatsby-gdpr-google-tagmanager',
            dataLayerName: 'dataLayer',
          },
          facebookPixel: {
            pixelId: FB_PIXEL_ID,
            cookieName: 'gatsby-gdpr-facebook-pixel',
          },
          tikTokPixel: {
            pixelId: TT_PIXEL_ID,
            cookieName: 'gatsby-gdpr-tiktok-pixel',
          },
          hotjar: {
            hjid: HOTJAR_ID,
            hjsv: 'YOUR_HOTJAR_SNIPPET_VERSION',
            cookieName: 'gatsby-gdpr-hotjar',
          },
          // defines the environments where the tracking should be available  - default is ["production"]
          environments: ['production', 'development'],
        },
      },
      'gatsby-plugin-react-helmet',
      {
        resolve: '@chakra-ui/gatsby-plugin',
        options: {
          resetCSS: true,
          isUsingColorMode: true,
        },
      },
      {
        resolve: 'gatsby-plugin-sharp',
        options: {
          defaults: {
            formats: ['auto', 'webp', 'avif'],
            placeholder: 'blurred',
            quality: 90,
            backgroundColor: 'transparent',
          },
          failOnError: true,
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-image',
      {
        resolve: 'gatsby-plugin-svgr',
        options: {
          prettier: true, // use prettier to format JS code output (default)
          svgo: true, // use svgo to optimize SVGs (default)
          svgoConfig: {
            plugins: [
              { removeViewBox: true }, // remove viewBox when possible (default)
              { cleanupIDs: true }, // remove unused IDs and minify remaining IDs (default)
            ],
          },
        },
      },
      {
        resolve: 'gatsby-transformer-yaml-full',
        options: {
          plugins: [`mdx-yaml-full`],
        },
      },
      `gatsby-transformer-csv`,
      {
        resolve: 'gatsby-plugin-react-i18next',
        options: {
          localeJsonSourceName: 'locale',
          languages,
          defaultLanguage,
          siteUrl,
          // If true `/` or `/page-2`
          // will redirect to user language
          // e.g.: `/es` or `/es/page-2`.
          // Otherwise, the pages will render
          // defaultLangugage language.
          redirect: false,
          i18nextOptions: {
            //debug: true,
            // lowerCaseLng: true,
            interpolation: {
              escapeValue: false,
            },
            keySeparator: false,
            nsSeparator: false,
          },
          pages: config.i18nPages,
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          resolveEnv: () => NETLIFY_ENV,
          env: {
            production: {
              policy: [{ userAgent: '*' }],
            },
            'branch-deploy': {
              policy: [{ userAgent: '*', disallow: ['/'] }],
              sitemap: null,
              host: null,
            },
            'deploy-preview': {
              policy: [{ userAgent: '*', disallow: ['/'] }],
              sitemap: null,
              host: null,
            },
          },
        },
      },
      {
        resolve: `gatsby-plugin-breadcrumb`,
        options: {
          useAutoGen: true,
          autoGenHomeLabel: `start`,
          exclude: [
            `**/dev-404-page/**`,
            `**/404/**`,
            `**/404.html`,
            `**/offline-plugin-app-shell-fallback/**`,
          ],
          excludeOptions: {
            separator: '.',
          },
          trailingSlashes: true,
        },
      },
      {
        resolve: 'gatsby-plugin-sitemap',
        options: {
          excludes: [`/__generated/*`, '/**/404', '/**/404.html'],
          query: `{
            site {
              siteMetadata{
                siteUrl
              }
            }
            allSitePage( filter: { context: { i18n: { routed: { eq: false } } } } ) {
              nodes {
                path
                context {
                  i18n {
                    defaultLanguage
                    languages
                    originalPath
                  }
                }
              }
            }
          }`,
          resolvePages: ({ site, allSitePage: { nodes: allPages } }) => {
            const { siteUrl } = site.siteMetadata

            return allPages.map((page) => {
              const { languages, originalPath, defaultLanguage } =
                page.context.i18n
              const url = siteUrl + originalPath
              const links = [
                { lang: defaultLanguage, url },
                { lang: 'x-default', url },
              ]
              languages.forEach((lang) => {
                if (lang === defaultLanguage) return
                links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` })
              })
              return {
                ...page,
                priority: originalPath === '/' ? 1.0 : 0.7,
                links,
              }
            })
          },
          serialize: ({ path, priority, links }) => ({
            url: path,
            priority,
            links,
          }),
        },
      },
      'gatsby-image-sitemap',
    ],
  }
}
