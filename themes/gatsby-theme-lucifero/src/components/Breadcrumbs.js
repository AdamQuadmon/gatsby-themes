import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { ImHome } from 'react-icons/im'
import { Box, useStyleConfig } from '@chakra-ui/react'

// https://github.com/sbardian/gatsby-plugin-breadcrumb
const Breadcrumbs = ({ crumbs, variant }) => {
  const styles = useStyleConfig('Breadcrumbs', { variant })

  crumbs[0].crumbLabel = <ImHome />

  const customCrumbLabel = crumbs[crumbs.length - 1].crumbLabel
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
