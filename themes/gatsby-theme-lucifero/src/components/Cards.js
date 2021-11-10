import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Button,
  useStyleConfig,
} from '@chakra-ui/react'
import { SiGooglemaps } from 'react-icons/si'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
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

const CardBox = ({
  title,
  cover,
  text,
  // TODO: enable Link
  slug,
  city,
  descriptions,
  address,
  places,
  titleAs,
  size,
}) => {
  const { language } = React.useContext(I18nextContext)
  const image = getImage(cover)
  const hasPlaces = !!places || !!address || !!city
  const content = (descriptions?.it && descriptions[language]) || text
  return (
    <Card className="card_box">
      {/* <GatsbyLink to={`/${slug}`}> */}
      <Box w={'100%'} className="image">
        <Image
          h={'200px'}
          w={'full'}
          as={GatsbyImage}
          image={image}
          alt={title}
        />
      </Box>
      <Box className="content">
        {hasPlaces && <Places places={places} address={address} city={city} />}
        <Heading as={titleAs} size={size} className="card_title">
          {title}
        </Heading>
        <Box className="card_content">{content}</Box>
      </Box>
      {/* </GatsbyLink> */}
    </Card>
  )
}

CardBox.defaultProps = {
  titleAs: 'h4',
}

const Cards = ({
  title,
  nodes,
  columns,
  size,
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
          <CardBox
            key={node.frontmatter.slug}
            text={node.excerpt}
            {...node.frontmatter}
          />
        ))}
      </Flex>
    </Box>
  )
}

Cards.defaultProps = {
  titleAs: 'h3',
}

export default Cards
