import { getOrganizationId } from '../PlacesAndOrganizations'

export const getWebSiteSchema = (site) => {
  const { alternateName, description, organization, title } = site
  const orgId = getOrganizationId(organization)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    alternateName,
    description,
    publisher: {
      '@id': orgId,
    },
  }

  return schema
}
