import { getOrganizationMinSchema } from "../PlacesAndOrganizations"

// https://developers.google.com/search/docs/advanced/structured-data/course
export const getCourseSchema = (name, description, provider) => {
  const schema =
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name,
      description,
      provider: getOrganizationMinSchema(provider),
    },

  return schema
}
