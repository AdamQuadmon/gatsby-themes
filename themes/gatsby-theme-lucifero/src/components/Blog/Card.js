import React from 'react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'
import {
  Box,
  HStack,
  Heading,
  Image,
  Spacer,
  Link,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'

import PostCount from './PostCount'

const Card = ({ node, count, variant }) => {
  const {
    fields: { slug },
    frontmatter: { title, cover, noCover, description },
  } = node
  const image = getImage(cover)
  const styles = useStyleConfig('BlogCard', { variant })

  return (
    <Box __css={styles}>
      <Link as={GatsbyLink} to={`/${slug}`}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }}>
          <Box>
            {!noCover && image && (
              <Image as={GatsbyImage} image={image} alt={title} />
            )}
            <Box>
              <HStack>
                <Heading as="h2">{title}</Heading>
                <Spacer />
                <PostCount count={count} />
              </HStack>
              <Text>{description}</Text>
            </Box>
          </Box>
        </motion.div>
      </Link>
    </Box>
  )
}

export default Card
