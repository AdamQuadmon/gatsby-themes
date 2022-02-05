# Pages

Pages are generated from Mdx, AlbumCsv and ImageCsv nodes.
Page can have a Meta that in case of Mdx come from MetaCsv

## Proxies

MetaCsv, AlbumCsv and ImageCsv generates Meta

## Web Pages

Pages are generated on gatsby-node.js.

This is the used query:

```graphql
allPage(filter: { published: { eq: true } }) {
    edges {
        node {
            id
            type
            slug
            area
            topic
            fileAbsolutePath
        }
    }
}
```

The `createPagesTypes` function in the `config/pages.js` file
will group pages by `type` and create pages and translations redirects.

The following types have dedicated templates:

- Post
- Area
- Topic
- Album
- Image

other types default to `Page` template.

## Page Creation Workflow

- create Mdx file
- generate MetaCsv entry with default
  - creation date = now
- create publisher and updater script
  - set now if published and no datePublished
  - check for page updates (md5 hash of row?)

## Page fields resolver

**MetaCsv**, **AlbumCsv** and **ImageCsv** generates Pages.
The csv values are parsed as string and then, in the Page resolver,
casted to specific type.

At Model level only connections and type casting transformations are needed.

Other kinds of transformations or field creation (like timestamp)
should be better handled in a script that
generateintermediate **cached csv files**
keeping originals easy to manage by humans.

### Base fields

- id ID!
- published to Boolean
- order to Int, default 666
- area
- topic
- language
- i18nPath
- slug

### Date fields

- dateCreated: to Date
- dateModified: to Date
- datePublished: to Date
- timestamp: Int

`timestamp` it is the `datePublished` timestamp of a `published` source.
It is a generated field.

### Meta fields with alternative source input

- name: or headline
- headline: or name
- description: or headline or name
- abstract: or description
- author: or site.author

With `name` or `headline` we can desume everything else.
`abstract` is the summary of the content,
used in `NavItemSub` component as shorter version of `description`.

### Other Meta fields

- contentLocation
- genre
- tags: to [Tag!]

### Generated Fields

- type
- url
- imagePath
- contentUrl
- image: to ImageCsv

`type` is added at proxy creation time for **AlbumCsv** and **ImageCsv**
default is `page`.

`imagePath` is the **path** part of the imgix image,
*not bound* to **ImageCsv**.
Can be a `String` representing a valid *url*
or a *path* for **imgix** base account.
If is an `Object` it can contain `folder` and `file` properties.

`contentUrl` is the **url** of the imgix image,
*not bound* to **ImageCsv**.
If is an **ImageCsv** the `account` of imgix can be override if needed.

`image` is an **ImageCsv** instance, default to `site.ogImage`
for **AlbumCsv** is the one matching `topic` and `order=1`

### MetaCsv fields

**MetaCsv** are the main pages of the website, usually bound to
an Mdx file containing the text and Reac Components content of the page.
Additional fields:

- navPage: to Boolean
- noCover: to Boolean
- mdx: Mdx

`mdx` match relative `Mdx` where `mdx.fileAbsolutePath === meta.i18nPath`

### AlbumCsv fields

**AlbumCsv** are pages with a collections of `ImageCsv` based on `topic`.

Additional fields not available as Page fields:

- pageUrl: String
- pageLabel: String
- imagesLength: Int

`imagesLength` is the `totalCount()` of ImageCsv matching `topic`

### ImageCsv fields

**ImageCsv** are image gallery pages.
Additional fields not available as Page fields:

- zone: String
- subject: String
- season: String
- month: String
- daytime: String
- folder: String
- file: String
- account: String
- domain: String
- width: String
- height: String
