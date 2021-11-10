import React from 'react'
import { Box } from '@chakra-ui/react'
import { useStaticQuery, graphql } from 'gatsby'

const Map = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            maps {
              src
              address
              lat
              lng
              zoom
            }
          }
        }
      }
    `
  )

  const { src, address, lat, lng, zoom } = site.siteMetadata.maps

  if (!src) {
    return
  }

  const defaultProps = {
    src,
    location: {
      address,
      lat,
      lng,
    },
    zoom,
  }

  return (
    // Important! Always set the container height explicitly
    <Box height="450" width="100%">
      <div className="google-map-code">
        <iframe
          src={defaultProps.src}
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          loading="lazy"
          title="map"
        ></iframe>
      </div>
    </Box>
  )
}

export default Map
