import React from 'react'
import { LinkOverlay } from '../Link'
import Image from '../Image'
import { motion } from 'framer-motion'
import {
  Box,
  Heading,
  HStack,
  Spacer,
  LinkBox,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'

const PostCard = ({ node, titleSide, titleSize, children, variant }) => {
  const { slug, headline, image, noCover, description } = node

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
              {headline}
            </Heading>
          </HStack>
        </Box>
      ) : (
        <LinkBox as="article">
          <Box>
            <Box className="image_container">
              {!noCover && image && (
                <motion.div
                  as={Box}
                  w={'100%'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                >
                  <Image className="image" image={image} alt={headline} />
                </motion.div>
              )}
            </Box>
            <Box className="info">
              <HStack className="title">
                <Heading size={titleSize} as="h4">
                  <LinkOverlay to={slug}>{headline}</LinkOverlay>
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
