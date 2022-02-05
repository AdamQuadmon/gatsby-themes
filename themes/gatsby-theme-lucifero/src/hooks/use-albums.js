import { useStaticQuery, graphql } from 'gatsby'
// import { edgesByLanguage } from '../utils/utils'

export const useAlbums = (language) => {
  const data = useStaticQuery(
    graphql`
      query AlbumsQuery {
        allAlbumCsv {
          ...AlbumCsvEdges
        }
      }
    `
  )

  const { allAlbumCsv } = data

  // return edgesByLanguage(allAlbumCsv, language)
  return allAlbumCsv
}
