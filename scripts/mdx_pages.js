const fm = require('front-matter')

const { getDirectories, getFile, writeCsv } = require('./mdx_utils')

const contentPath = 'projects/lepietre/pages'

let pagesData = {
  pages: [],
}

const parsePage = (fileData, pagesData) => {
  const content = fm(fileData.content)

  const {
    slug,
    metaTitle,
    title,
    description,
    published,
    order,
    navPage,
    noCover,
    folder,
    cover,
    ogImage,
    album,
    pax,
    region,
    city,
    cap,
    address,
    cell,
    places,
    facebook,
    instagram,
    web,
  } = content.attributes

  pagesData.pages.push({
    // seo
    file: fileData.slug,
    slug,
    metaTitle,
    title,
    description,
    // Navigation
    published,
    order,
    navPage,
    // Images
    noCover,
    folder,
    cover,
    ogImage,
    album,
    //Listings
    pax,
    //Locations
    region,
    city,
    cap,
    address,
    cell,
    places,
    facebook,
    instagram,
    web,
  })
}

const printInfo = (pagesData) => {
  console.log('Pages:', pagesData.pages.length)
}

const getMdx = (filesData) => {
  filesData.forEach((data) => parsePage(data, pagesData))
  printInfo(pagesData)

  writeCsv(pagesData.pages, 'pages')
}

getDirectories(contentPath, (err, files) => {
  console.log('Files:', files.length)
  if (!err) {
    Promise.all(files.map((file) => getFile(contentPath, file)))
      .then(getMdx)
      .catch((err) => {
        console.log(err)
      })
  }
})
