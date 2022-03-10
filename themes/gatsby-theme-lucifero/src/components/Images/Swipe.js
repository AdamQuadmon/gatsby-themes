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

const shouldReturnNode = (node, filters, key) => {
  const keyIsEmpty = !filters[key]
  return keyIsEmpty ? true : filters[key] === node[key]
}

const filterImages = (images, filters) => {
  const filtersKeys = Object.keys(filters)
  let filtered = images.filter(({ node }) => {
    return filtersKeys.reduce((r, k) => r && shouldReturnNode(node, filters, k))
  })
  return filtered.sort((a, b) => a.node.order - b.node.order)
}

// to render the slider items `Swiper` requires its children property
// to be a collection of `SwiperSlider`
// avoiding being able to create reusable slider components.
// React.cloneElement workaround is created to assign a key to each `SwiperSlider`
// TODO This workaround should be removed when this issue
// https://github.com/nolimits4web/swiper/issues/4413 is resolved
const Swipe = ({ area, topic, zone, subject, language, variant, ...rest }) => {
  const styles = useStyleConfig('Swipe', { variant })
  const images = filterImages(useImages(language), {
    area,
    topic,
    zone,
    subject,
  })
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <Box __css={styles} {...rest}>
      <Box>
        <Swiper
          modules={[Navigation, Keyboard, A11y, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={50}
          slidesPerView={1}
          effect={'cards'}
          keyboard={{ enabled: true }}
          mousewheel={{ releaseOnEdges: true }}
          grabCursor
          navigation
          loop={images.length > 3}
          // autoHeight
          // lazy
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {images.map(({ node }, index) => (
            <SwiperSlide key={`slide_${index}_${node.slug}`}>
              {React.cloneElement(
                <Link to={node.slug}>
                  <Image
                    key={node.contentUrl}
                    image={node}
                    className="swiper-lazy"
                  />
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <ThumbsContainer images={images} onSwiper={setThumbsSwiper} />
    </Box>
  )
}

export default Swipe

export const ThumbsContainer = ({ images, onSwiper }) => {
  return (
    <Box>
      {images && images.length > 1 && (
        <Box className="thumb_container">
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
            onSwiper={onSwiper}
          >
            {images.map(({ node }, index) => (
              <SwiperSlide key={`thumb_${index}_${node.slug}`}>
                {React.cloneElement(
                  <Image
                    key={node.contentUrl}
                    image={node}
                    aspectRatio={16 / 9}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  )
}

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
