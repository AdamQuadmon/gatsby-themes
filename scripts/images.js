const _ = require('lodash')
const { getImages, getImage, writeCsv } = require('./mdx_utils')

const contentPath = 'example/giano/images'

let dataset = {
  nodes: [],
}

const parseFiles = (filesData) => {
  filesData.forEach((data) => addNode(data, dataset))
  printInfo(dataset)

  writeCsv(dataset.nodes, 'images')
}

async function addNode(data, dataset) {
  const { file, metadata } = data
  const fileParts = file.split('/')
  fileParts.shift()
  // https://sharp.pixelplumbing.com/api-input#metadata
  const {
    format,
    size,
    width,
    height,
    space,
    channels,
    depth,
    density,
    chromaSubsampling,
    compression,
    isProgressive,
    hasProfile,
    hasAlpha,
    orientation,
    // exif,
    // icc,
    // iptc,
    // xmp,
    // tifftagPhotoshop,
  } = metadata
  dataset.nodes.push({
    folder: fileParts.shift(),
    file: fileParts.join('/'),
    format,
    size,
    width,
    height,
    vratio: _.round(width && height && width / height, 2),
    hratio: _.round(width && height && height / width, 2),
    space,
    channels,
    depth,
    density,
    chromaSubsampling,
    compression,
    isProgressive,
    hasProfile,
    hasAlpha,
    orientation,
  })
}

const printInfo = (dataset) => {
  console.log('Images:', dataset.nodes.length)
}

getImages(contentPath, (err, files) => {
  console.log('Files:', files.length)
  if (!err) {
    Promise.all(files.map((file) => getImage(contentPath, file)))
      .then(parseFiles)
      .catch((err) => {
        console.log(err)
      })
  }
})
