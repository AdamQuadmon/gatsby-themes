// https://developers.google.com/search/docs/advanced/structured-data
import React from 'react'
import Helmet from 'react-helmet'
import { stringify } from '@ungap/structured-clone/json'

import { getWebSiteSchema } from './Schema/CreativeWork/Website'
import { getBreadcrumbSchema } from './Schema/Breadcrumb'
import { getOrganizationSchema } from './Schema/PlacesAndOrganizations'
import { getPageSchema } from './Schema/CreativeWork'

export default React.memo(({ site, page, crumbs }) => {
  const { website, organization } = site
  const { siteUrl } = website

  const schema = [
    getWebSiteSchema(website, organization),
    getOrganizationSchema(organization),
    getBreadcrumbSchema(siteUrl, crumbs),
    getPageSchema(siteUrl, organization, page),
  ]

  // TODO: handle special page types, eg.
  // - event: Event
  // - poi: TouristAttraction part of TouristTrip
  // amenity: 'ItemPage',
  // image: 'ItemPage',
  // product: 'ItemPage',
  // region: 'ItemPage',
  // restaurant: 'ItemPage',
  // work: 'ItemPage',

  const stringified = stringify(schema)

  return (
    <Helmet>
      <script type="application/ld+json">{stringified}</script>
    </Helmet>
  )
})
