import { getOrganizationId } from '../PlacesAndOrganizations'

export const getWebSiteSchema = (website, organization) => {
  const { alternateName, description, title } = website

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
