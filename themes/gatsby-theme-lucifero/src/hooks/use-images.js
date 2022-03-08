import { useStaticQuery, graphql } from 'gatsby'
import { edgesByLanguage } from '../utils/utils'

export const useImages = (language) => {
  const data = useStaticQuery(
    graphql`
      query ImagesQuery {
        allImageCsv {
          ...ImageCsvEdges
        }
      }
    `
  )

  const { allImageCsv } = data

  return edgesByLanguage(allImageCsv, language)
}
