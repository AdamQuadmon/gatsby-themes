// Replace gatsby-plugin-image
import React, { useState } from 'react'
import _ from 'lodash'
import { Box, useStyleConfig } from '@chakra-ui/react'

// https://swiperjs.com/react
// https://swiperjs.com/demos
import SwiperCore, {
  A11y,
  EffectCards,
  FreeMode,
  Keyboard,
  Mousewheel,
  Navigation,
  Thumbs,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/effect-cards'
import 'swiper/css/free-mode'
import 'swiper/css/keyboard'
// import 'swiper/css/lazy'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { Link } from '../Link'
import Image from '../Image'
import { useImages } from '../../hooks/use-images'

SwiperCore.use([
  FreeMode,
  EffectCards,
  Mousewheel,
  Keyboard,
  Navigation,
  A11y,
  Thumbs,
])

const checkNode = (node, filters, filter) => {
  const shouldFilter = filters[filter]
  return !shouldFilter ? true : filters[filter] === node[filter]
}

const filterImages = (images, filters) => {
  const filtersKeys = Object.keys(filters)
  let filtered = images.edges.filter(({ node }) => {
    return filtersKeys.reduce((c, f) => c && checkNode(node, filters, f))
  })
  return filtered.sort((a, b) => a.node.order - b.node.order)
}

// `Swiper` to render the slider items requires its children property
// to be a collection of `SwiperSlider`
// avoiding being able to create reusable slider components.
// React.cloneElement workaround is created to assign a key to each `SwiperSlider`
// TODO This workaround should be removed when this issue
// https://github.com/nolimits4web/swiper/issues/4413 is resolved
const Swipe = ({ album, area, zone, variant }) => {
  const styles = useStyleConfig('Swipe', { variant })
  const images = filterImages(useImages(), { album, area, zone })
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <Box __css={styles}>
      <Box w="100%" height="300">
        <Swiper
          modules={[Navigation, Keyboard, A11y, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={50}
          slidesPerView={1}
          effect={'cards'}
          keyboard={{ enabled: true }}
          mousewheel={{ releaseOnEdges: true }}
          grabCursor
          autoHeight
          navigation
          // lazy
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {images.map(({ node }, index) => (
            <SwiperSlide key={`slide_${index}_${node.file}`}>
              {React.cloneElement(
                <Link to={node.slug}>
                  <Image key={node.file} image={node} className="swiper-lazy" />
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box w="100%" height="100">
        <Swiper
          modules={[Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          mousewheel
          grabCursor
          autoHeight
          freeMode
          navigation
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
          {images.map(({ node }, index) => (
            <SwiperSlide key={`thumb_${index}_${node.file}`}>
              {React.cloneElement(
                <Image
                  key={node.file}
                  file={node.file}
                  folder={node.folder}
                  aspectRatio={16 / 9}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

export default Swipe

// TODO: store grid template
const GridBox = ({ children }) => {
  return (
    <Box
      padding={4}
      w="100%"
      maxW="900px"
      mx="auto"
      sx={{ columnCount: [1, 2, 3], columnGap: '8px' }}
    >
      {children}
    </Box>
  )
}
