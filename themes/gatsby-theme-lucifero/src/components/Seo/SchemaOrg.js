// https://developers.google.com/search/docs/advanced/structured-data
import React from 'react'
import Helmet from 'react-helmet'
// import { stringify } from '@ungap/structured-clone/json'

import { getWebSiteSchema } from './Schema/CreativeWork/Website'
import { getBreadcrumbSchema } from './Schema/Breadcrumb'
import { getOrganizationSchema } from './Schema/PlacesAndOrganizations'
import { getPageSchema } from './Schema/CreativeWork'

const SchemaOrg = React.memo(({ site, page, crumbs }) => {
  const { siteUrl, website, organization } = site

  const schema = [
    getWebSiteSchema(website, organization),
    getOrganizationSchema(organization),
    getBreadcrumbSchema(siteUrl, crumbs),
    getPageSchema(siteUrl, organization, page),
  ].filter((e) => e)

  // TODO: handle special page types, eg.
  // - event: Event
  // - poi: TouristAttraction part of TouristTrip
  // amenity: 'ItemPage',
  // image: 'ItemPage',
  // product: 'ItemPage',
  // region: 'ItemPage',
  // restaurant: 'ItemPage',
  // work: 'ItemPage',

  return <SchemaContainer schema={schema} />
})

export default SchemaOrg

export const SchemaContainer = React.memo(({ schema }) => {
  // const stringified = stringify(schema)
  const stringified = JSON.stringify(schema)
  // const stringified = stringify(schema)
  return (
    <Helmet>
      <script type="application/ld+json">{stringified}</script>
    </Helmet>
  )
})
