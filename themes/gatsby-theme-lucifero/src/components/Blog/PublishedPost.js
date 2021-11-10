import React from 'react'

import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'

import Tags from './Tags'

const PublishedPost = ({ post, variant }) => {
  const {
    id,
    fields: { slug },
    frontmatter: { title, cover, description, date, tags },
  } = post
  const styles = useStyleConfig('PostCard', { variant })
  const image = getImage(cover)
  return (
    <Box key={id} __css={styles}>
      <Link as={GatsbyLink} to={`/${slug}`}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
          <Box>
            {image && <Image as={GatsbyImage} image={image} alt={title} />}
            <Box>
              <Text>{date}</Text>
              <Heading as="h2">{title}</Heading>
              <Text>{description}</Text>
            </Box>
            <Tags tags={tags} />
          </Box>
        </motion.div>
      </Link>
    </Box>
  )
}

export default PublishedPost
