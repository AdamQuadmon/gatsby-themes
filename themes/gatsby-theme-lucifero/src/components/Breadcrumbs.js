import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { ImHome } from 'react-icons/im'
import { Box, useStyleConfig } from '@chakra-ui/react'
import { useSiteMetadata } from '../hooks/use-siteMetadata'

// https://github.com/sbardian/gatsby-plugin-breadcrumb
const Breadcrumbs = ({ breadcrumb, variant }) => {
  const styles = useStyleConfig('Breadcrumbs', { variant })
  const { languages } = useSiteMetadata()
  const { crumbs } = breadcrumb

  crumbs[0].crumbLabel = <ImHome />

  if (crumbs[1] && languages.includes(crumbs[1].crumbLabel)) {
    crumbs[0].pathname = crumbs[1].pathname
    crumbs.splice(1, 1)
  }

  const customCrumbLabel =
    crumbs.length > 1 &&
    crumbs[crumbs.length - 1].crumbLabel
      .toLowerCase()
      .replaceAll('-', ' ')
      .split('/')
      .pop()

  return (
    <Box __css={styles}>
      <Breadcrumb crumbs={crumbs} crumbLabel={customCrumbLabel} />
    </Box>
  )
}

export default Breadcrumbs
