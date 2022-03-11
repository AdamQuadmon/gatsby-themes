//github.com/gatsbyjs/gatsby/discussions/31599#discussioncomment-1239988
const { withDefaults } = require('./src/config/index.js')
const remarkA11yEmoji = require('@fec/remark-a11y-emoji')
const rehypeSlug = require('rehype-slug')
// const rehypeSanitize = require('rehype-sanitize')

const { NODE_ENV, CONTEXT: NETLIFY_ENV = NODE_ENV } = process.env

const { GA_TRACKING_ID, TM_TRACKING_ID, FB_PIXEL_ID, TT_PIXEL_ID, HOTJAR_ID } =
  process.env
module.exports = (userConfig) => {
  const config = withDefaults(userConfig)
  const {
    ui: { imgix, embedWidth },
    languages,
    defaultLanguage,
    siteUrl,
    website: { themeColor },
    pagesPath,
    dataPath,
    localesPath,
    i18nPages,
  } = config

  const meta = config.organization.meta
  if (meta) {
    config.organization.meta = Object.keys(meta).map((name) => {
      return { name, value: `${meta[name]}` }
    })
  }

  return {
    trailingSlash: 'never',
    siteMetadata: {
      ...config,
    },
    plugins: [
      'gatsby-plugin-lodash',
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'pages',
          path: pagesPath,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'data',
          path: dataPath,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: localesPath,
          name: 'locale',
        },
      },
      {
        resolve: `@imgix/gatsby`,
        options: {
          // https://dashboard.imgix.com/.
          domain: `${imgix}.imgix.net`,
          defaultImgixParams: { auto: ['compress', 'format'] },
          disableIxlibParam: true,
        },
      },
      'gatsby-plugin-mdx-embed',
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
                width: embedWidth,
              },
            },
            {
              resolve: 'gatsby-remark-responsive-iframe',
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
          color: themeColor,
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
          svgo: false, // use svgo to optimize SVGs
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
          redirect: false,
          i18nextOptions: {
            interpolation: {
              escapeValue: false,
            },
            keySeparator: false,
            nsSeparator: false,
          },
          pages: i18nPages,
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
          excludes: [
            '/__generated/*',
            '/**/404',
            '/**/404.html',
            '/informativa-cookies',
          ],
          query: `
            {
              allPage(
                filter: { published: { eq: true } }
                sort: { fields: [i18nPath], order: ASC }
              ) {
                group(field: i18nPath) {
                  nodes {
                    language
                    slug
                    url
                    dateModified
                  }
                }
              }
            }
          `,
          // filterPages: () => true,
          // resolvePagePath: (page) => page.path,
          resolveSiteUrl: () => siteUrl,
          resolvePages: ({ allPage }) => {
            const pages = allPage.group.map(({ nodes }) => {
              let defaultNode,
                translations = []

              nodes.forEach((node) => {
                const { language, url } = node
                if (language === defaultLanguage) {
                  defaultNode = node
                } else {
                  translations.push({
                    lang: language,
                    url,
                  })
                }
              })
              const { slug, url, dateModified } = defaultNode

              return {
                url,
                path: slug,
                lastmod: dateModified,
                links: [
                  { lang: defaultLanguage, url },
                  { lang: 'x-default', url },
                  ...translations,
                ],
              }
            })
            return pages
          },
          serialize: (page) => page,
        },
      },
    ],
  }
}
