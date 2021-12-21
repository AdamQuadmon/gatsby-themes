import React from 'react'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'
import {
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Spacer,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'

const PostCard = ({ node, titleSide, titleSize, children, variant }) => {
  const {
    fields: { slug },
    frontmatter: { title, cover, noCover, description },
  } = node
  const image = getImage(cover)
  const styles = useStyleConfig('PostCard', { variant })
  const isFuture = variant === 'future'

  return (
    <Box __css={styles}>
      {isFuture ? (
        <Box
          className="info"
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <HStack className="title">
            <Heading size={titleSize} as="h4">
              {title}
            </Heading>
          </HStack>
        </Box>
      ) : (
        <Link as={GatsbyLink} to={`/${slug}`}>
          <Box>
            <Box className="image_container">
              {!noCover && image && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                >
                  <Image
                    className="image"
                    as={GatsbyImage}
                    image={image}
                    alt={title}
                  />
                </motion.div>
              )}
            </Box>
            <Box className="info">
              <HStack className="title">
                <Heading size={titleSize} as="h4">
                  {title}
                </Heading>
                <Spacer />
                {titleSide}
              </HStack>
              {children}
              <Text className="description">{description}</Text>
            </Box>
          </Box>
        </Link>
      )}
    </Box>
  )
}

PostCard.defaultProps = {
  titleSize: 'md',
}

export default PostCard
