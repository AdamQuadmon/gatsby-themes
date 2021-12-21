import React from 'react'
import { Box } from '@chakra-ui/react'

import { useMap } from '../hooks/use-map'

const GMap = () => {
  const map = useMap()

  if (!map || !map.src) {
    return null
  }

  return (
    // Important! Always set the container height explicitly
    <Box height="450" width="100%">
      <div className="google-map-code">
        <iframe
          src={map.src}
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

export default GMap
