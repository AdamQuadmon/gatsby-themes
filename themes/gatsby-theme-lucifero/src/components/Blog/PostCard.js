import React from 'react'
import { LinkOverlay } from '../Link'
import Image from '../Image'
import { motion } from 'framer-motion'
import {
  Box,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'

const PostCard = ({ node, titleSide, titleSize, children, variant }) => {
  const {
    slug,
    title,
    meta: { folder, cover, noCover, description },
  } = node
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
        <LinkBox as="article">
          <Box>
            <Box className="image_container">
              {!noCover && image && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                >
                  <Image
                    className="image"
                    folder={folder}
                    file={cover}
                    alt={title}
                  />
                </motion.div>
              )}
            </Box>
            <Box className="info">
              <HStack className="title">
                <Heading size={titleSize} as="h4">
                  <LinkOverlay to={`/${slug}`}>{title}</LinkOverlay>
                </Heading>
                <Spacer />
                {titleSide}
              </HStack>
              {children}
              <Text className="description">{description}</Text>
            </Box>
          </Box>
        </LinkBox>
      )}
    </Box>
  )
}

PostCard.defaultProps = {
  titleSize: 'md',
}

export default PostCard
