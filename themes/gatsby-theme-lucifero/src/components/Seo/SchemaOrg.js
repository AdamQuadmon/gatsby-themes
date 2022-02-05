// https://developers.google.com/search/docs/advanced/structured-data
import React from 'react'
import Helmet from 'react-helmet'
import { stringify } from '@ungap/structured-clone/json'

import { getWebSiteSchema } from './Schema/CreativeWork/Website'
import { getBreadcrumbSchema } from './Schema/Breadcrumb'
import { getOrganizationSchema } from './Schema/PlacesAndOrganizations'
import { getPageSchema } from './Schema/CreativeWork'

export default React.memo(({ site, page, crumbs }) => {
  const schema = [
    getWebSiteSchema(site),
    getOrganizationSchema(site),
    getBreadcrumbSchema(site, crumbs),
    getPageSchema(site, page),
  ]

  const stringified = stringify(schema)

  return (
    <Helmet>
      <script type="application/ld+json">{stringified}</script>
    </Helmet>
  )
})
