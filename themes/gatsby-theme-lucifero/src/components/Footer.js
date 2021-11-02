import React from 'react'
import {
  Box,
  Container,
  Spacer,
  Link,
  Flex,
  Stack,
  Text,
  useStyleConfig,
} from '@chakra-ui/react'
import { Trans } from 'gatsby-plugin-react-i18next'
import { Link as GatsbyLink } from 'gatsby'
import Logo from './Logo'
import Map from './Map'
import SocialButtons from './SocialButtons'
import LangSelector from './LangSelector'

// https://chakra-templates.dev/page-sections/footer
const Footer = ({ data, navItems, variant }) => {
  const styles = useStyleConfig('Footer', { variant })
  const { organization, socials } = data
  const { name, subTitle, address1, address2, iva, copyright } = organization
  return (
    <Box __css={styles}>
      <Container as={Stack} maxW={'6xl'}>
        <Flex className="first_row">
          <Logo title={name} w="full" />
          <Spacer />
          <Stack direction={['column', 'row']} alignItems="end">
            <LangSelector showLabel />
            <Text as="span">
              <Trans>socials</Trans>
            </Text>
            <SocialButtons socials={socials} />
          </Stack>
        </Flex>
        <Flex>
          <Box className="first_column">
            <Text className="subtitle">{subTitle}</Text>
            <Text>{address1}</Text>
            <Text className="address2">{address2}</Text>
            <Text>
              <Text as="span" className="iva_label">
                <Trans>vat</Trans>{' '}
              </Text>
              <Text as="span" className="iva_value">
                {iva}
              </Text>
            </Text>
          </Box>
          <Stack className="second_column">
            {navItems.map((item) => (
              <Link key={item.href} as={GatsbyLink} to={item.href}>
                {item.label}
              </Link>
            ))}
          </Stack>
        </Flex>
        <Map />
        <Text className="copyright">
          © {new Date().getFullYear()} {copyright}
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
