import React from 'react'

import { useTranslation } from 'gatsby-plugin-react-i18next'
import ReactWordcloud from 'react-wordcloud'
import { Box, Heading } from '@chakra-ui/react'

import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export const countTags = (posts) => {
  let tags = []
  posts.edges.map(({ node }) => {
    tags = tags.concat(node.tags)
  })

  return tags
}
const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [60, 120],
  fontStyle: 'normal',
  fontWeight: 400,
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
}

const Wordcloud = ({ tags }) => {
  // const callbacks = {
  //   getWordColor: word => word.value > 50 ? "blue" : "red",
  //   onWordClick: console.log,
  //   onWordMouseOver: console.log,
  //   getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  // }
  const { t } = useTranslation()

  let words = []

  // console.log(tags)

  if (!tags.length) {
    return null
  }

  const tagsMap = tags.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  )

  // console.log(tagsMap)

  for (const [text, value] of tagsMap.entries()) {
    words.push({ text, value })
  }
  // console.log(words)

  return (
    <Box>
      <Heading as="h4">{t('wordcloud')}</Heading>
      <ReactWordcloud
        // callbacks={callbacks}
        options={options}
        // size={size}
        words={words}
      />
    </Box>
  )
}

export default Wordcloud
