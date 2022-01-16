import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
  useStyleConfig,
} from '@chakra-ui/react'
import { SiGooglemaps } from 'react-icons/si'
import Image from './Image'
import { Link as GatsbyLink, I18nextContext } from 'gatsby-plugin-react-i18next'
import Card from '../components/Card'

const Places = ({ places, address, city }) => {
  return (
    <Link href={places} isExternal className="card_places" maxWidth="200px">
      <Button size="xs" aria-label={'Google Maps'} leftIcon={<SiGooglemaps />}>
        {address}
        {city && ` - ${city}`}
      </Button>
    </Link>
  )
}

const CardBox = ({ node, titleAs, size }) => {
  const { slug, meta, excerpt } = node
  const { title, folder, cover, places, address, city } = meta
  const hasPlaces = !!places || !!address || !!city
  return (
    <Card className="card_box">
      <GatsbyLink to={`/${slug}`}>
        <Box w={'100%'} className="image">
          <Image height={'200px'} file={cover} folder={folder} alt={title} />
        </Box>
        <Box className="content">
          {hasPlaces && (
            <Places places={places} address={address} city={city} />
          )}
          <Heading as={titleAs} size={size} className="card_title">
            {title}
          </Heading>
          <Box className="card_content">{excerpt}</Box>
        </Box>
      </GatsbyLink>
    </Card>
  )
}

CardBox.defaultProps = {
  titleAs: 'h4',
  size: 'xs',
}

const Cards = ({
  title,
  nodes,
  columns,
  spacing,
  titleAs,
  variant,
  ...rest
}) => {
  const styles = useStyleConfig('Cards', { variant })
  return (
    <Box className="cards" __css={styles} {...rest}>
      {title && (
        <Heading as={titleAs} className="cards_title">
          {title}
        </Heading>
      )}
      <Flex className="cards_box">
        {nodes.map(({ node }) => (
          <CardBox key={node.slug} node={node} />
        ))}
      </Flex>
    </Box>
  )
}

Cards.defaultProps = {
  titleAs: 'h3',
}

export default Cards
