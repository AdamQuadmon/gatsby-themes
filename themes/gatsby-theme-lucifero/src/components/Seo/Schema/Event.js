import {
  getLocationSchema,
  getOrganizationMinSchema,
} from './PlacesAndOrganizations'
import { getOfferSchema } from './Offer'
import { getType } from './Thing'

const types = {
  generic: 'Event',
  business: 'BusinessEvent',
  festival: 'Festival',
  food: 'FoodEvent',
  exhibit: 'ExhibitionEvent',
  music: 'MusicEvent',
  sport: 'SportsEvent',
}

const defaultType = 'generic'

// https://developers.google.com/search/docs/advanced/structured-data/event
const attendanceModes = {
  offline: 'OfflineEventAttendanceMode',
}

const statuses = {
  scheduled: 'EventScheduled',
}
const performers = {
  group: 'PerformingGroup',
}

const defaultMode = 'offline'
const defaultState = 'scheduled'
const defaultPerformer = 'group'

export const getEventSchema = (
  event,
  location,
  images,
  organizer,
  performer,
  offer
) => {
  const {
    type,
    name,
    description,
    attendanceMode,
    endDate,
    startDate,
    status,
  } = event

  const eventAttendanceMode = getType(
    attendanceMode,
    attendanceModes,
    defaultMode
  )

  const eventStatus = getType(status, statuses, defaultState)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': getType(type, types, defaultType),
      name,
      description,
      startDate,
      endDate,
      eventAttendanceMode,
      eventStatus,
      image: images.map((image) => image.src),
      offers: getOfferSchema(offer),
      location: getLocationSchema(location),
      organizer: getOrganizationMinSchema(organizer),
    },
  ]

  if (performer) {
    schema.performer = {
      '@context': 'https://schema.org',
      '@type': getType(performer.type, performers, defaultPerformer),
      name: performer.name,
    }
  }

  return schema
}
