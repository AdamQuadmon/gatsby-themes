import React from 'react'
import { cloneDeep } from 'lodash'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { ImHome } from 'react-icons/im'
import { Box, useStyleConfig } from '@chakra-ui/react'

// https://github.com/sbardian/gatsby-plugin-breadcrumb
const Breadcrumbs = ({ crumbs, variant }) => {
  const styles = useStyleConfig('Breadcrumbs', { variant })
  const clonedCrumbs = cloneDeep(crumbs)

  clonedCrumbs[0].crumbLabel = <ImHome />

  const customCrumbLabel = clonedCrumbs[crumbs.length - 1].crumbLabel
    .toLowerCase()
    .replaceAll('-', ' ')
    .split('/')
    .pop()

  return (
    <Box __css={styles}>
      <Breadcrumb crumbs={clonedCrumbs} crumbLabel={customCrumbLabel} />
    </Box>
  )
}

export default Breadcrumbs
