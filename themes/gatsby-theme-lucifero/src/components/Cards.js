import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Button,
  LinkBox,
  useStyleConfig,
} from '@chakra-ui/react'
import { SiGooglemaps } from 'react-icons/si'
import { Link, LinkOverlay, LinkExternal } from './Link'
import { SchemaContainer } from './Seo/SchemaOrg'
import { getCarouselSchema } from './Seo/Schema/Carousel'
import Image from './Image'

import Card from '../components/Card'

const Cards = ({
  title,
  to,
  nodes,
  columns,
  spacing,
  titleAs,
  variant,
  ...rest
}) => {
  const styles = useStyleConfig('Cards', { variant })
  const schema = getCarouselSchema(nodes)
  const subTitleAs = titleAs === 'h2' ? 'h3' : 'h4'
  return (
    <Box className="cards" __css={styles} {...rest}>
      {title && (
        <Heading as={titleAs} className="cards_title">
          {to ? <Link to={to}>{title}</Link> : title}
        </Heading>
      )}
      <Flex className="cards_box">
        <SchemaContainer schema={schema} />
        {nodes.map(({ node }) => (
          <CardBox key={node.slug} node={node} titleAs={subTitleAs} />
        ))}
      </Flex>
    </Box>
  )
}

Cards.defaultProps = {
  titleAs: 'h3',
}

export default Cards

const Places = ({ places, address, city }) => {
  return (
    <LinkExternal
      href={places}
      isExternal
      className="card_places"
      maxWidth="200px"
    >
      <Button size="xs" aria-label={'Google Maps'} leftIcon={<SiGooglemaps />}>
        {address}
        {city && ` - ${city}`}
      </Button>
    </LinkExternal>
  )
}

const CardBox = ({ node, titleAs, size }) => {
  const { slug, headline, image, abstract, mdx } = node
  const excerpt = mdx ? mdx.excerpt : abstract
  // const hasPlaces = !!places || !!address || !!city
  return (
    <LinkBox as={Card} className="card_box">
      <Image className="image" image={image} alt={headline} height="200px" />

      <Box className="content">
        {/* {hasPlaces && <Places places={places} address={address} city={city} />} */}
        <Heading as={titleAs} size={size} className="card_title">
          <LinkOverlay to={slug}>{headline}</LinkOverlay>
        </Heading>
        <Box className="card_content">{excerpt}</Box>
      </Box>
    </LinkBox>
  )
}

CardBox.defaultProps = {
  titleAs: 'h4',
  size: 'xs',
}
