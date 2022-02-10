import { getImageSchema, getWebPageSchema } from './CreativeWork'

// Notes on urls and references
// about, mainEntity: article.about = [topic, event, store], article.mainEntity = topic
// subjectOf, mainEntityOfPage: product.subjectOf[article, review, comment], mainE
// sameAs: wiki, manufacturer
export const getThingParams = (siteUrl, page) => {
  let { description, name, url, slug } = page

  if (!url) {
    url = `${siteUrl}${slug}`
  }

  const schema = {
    description,
    name: name || slug, // this is also the title for Page types
    url,
  }
  if (page) schema.image = getThingImage(page)
  addMainEntityOfPage(schema, page)
  return schema
}

// Type checker Helper for sub types with default
export const getType = (type, types, defaultValue) => {
  return types[type] ? types[type] : types[defaultValue]
}

// Add schema param if value is defined
export const addParam = (schema, param, value) => {
  if (value) {
    schema[param] = value
  }
}

const getThingImage = (page) => {
  let { type, image, url } = page
  type = type || 'article'
  const imageUrl = type === 'image' ? url || image : image
  return imageUrl && getImageSchema(imageUrl)
}

// TODO is not totally clear hot this works
//  1. pages referring this entity [page/comments, page/details]
//  2. for an Article it is the canonical url
const addMainEntityOfPage = (schema, page) => {
  return
  // if (!page) return
  // page = page['@type'] ? page : getWebPageSchema(page)
  // schema.mainEntityOfPage = page
}
