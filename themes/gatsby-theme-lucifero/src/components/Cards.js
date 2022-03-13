import React from 'react'
import { Box, Flex, Heading, LinkBox, useStyleConfig } from '@chakra-ui/react'
import { SchemaContainer } from './Seo/SchemaOrg'
import { getCarouselSchema } from './Seo/Schema/Carousel'
import { Link, LinkOverlay } from './Link'
import Card from './Card'
import Image from './Image'
import Place from './Place'

const Cards = ({
  title,
  to,
  nodes,
  columns,
  spacing,
  titleAs,
  hideCarousel,
  variant,
  ...rest
}) => {
  const styles = useStyleConfig('Cards', { variant })
  const carouselSchema = hideCarousel ? null : getCarouselSchema(nodes, title)
  const subTitleAs = titleAs === 'h2' ? 'h3' : 'h4'
  return (
    <Box className="cards" __css={styles} {...rest}>
      {title && (
        <Heading as={titleAs} className="cards_title">
          {to ? <Link to={to}>{title}</Link> : title}
        </Heading>
      )}
      <Flex className="cards_box">
        {carouselSchema && <SchemaContainer schema={carouselSchema} />}
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

const CardBox = ({ node, titleAs, size }) => {
  const { slug, name, headline, image, abstract, location } = node
  return (
    <Card as={LinkBox} className="card_box">
      <Image className="image" image={image} alt={headline} height="200px" />

      <Box className="content">
        {location && <Place place={location} />}
        <Heading as={titleAs} size={size} className="card_title">
          <LinkOverlay to={slug}>{name}</LinkOverlay>
        </Heading>
        <Box className="card_content">{abstract}</Box>
      </Box>
    </Card>
  )
}

CardBox.defaultProps = {
  titleAs: 'h4',
  size: 'xs',
}
