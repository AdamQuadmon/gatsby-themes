import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import { useStyleConfig } from '@chakra-ui/react'

// https://github.com/sbardian/gatsby-plugin-breadcrumb
const Breadcrumbs = ({ breadcrumb, variant }) => {
  const styles = useStyleConfig('Breadcrumbs', { variant })
  const { crumbs, baseLabel } = breadcrumb

  if (baseLabel && crumbs[1].crumbLabel !== baseLabel) {
    crumbs.splice(1, 0, { crumbLabel: baseLabel, pathname: `/${baseLabel}/` })
  }

  return <Breadcrumb crumbs={crumbs} __css={styles} />
}

export default Breadcrumbs
