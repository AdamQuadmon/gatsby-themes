import { useStaticQuery, graphql } from 'gatsby'
// import { edgesByLanguage } from '../utils/utils'

export const useAlbums = (language) => {
  const data = useStaticQuery(
    graphql`
      query AlbumsQuery {
        allAlbumsCsv {
          ...AlbumsDataEdges
        }
      }
    `
  )

  const { allAlbumsCsv } = data

  // return edgesByLanguage(allAlbumsCsv, language)
  return allAlbumsCsv
}
