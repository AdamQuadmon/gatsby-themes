import { useStaticQuery, graphql } from 'gatsby'
// import { edgesByLanguage } from '../utils/utils'

export const useImages = (language) => {
  const data = useStaticQuery(
    graphql`
      query ImagesQuery {
        allImagesCsv {
          ...ImagesDataEdges
        }
      }
    `
  )

  const { allImagesCsv } = data

  // return edgesByLanguage(allImagesCsv, language)
  return allImagesCsv
}
