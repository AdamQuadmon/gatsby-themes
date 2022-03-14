import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'
// import '@fontsource/sorts-mill-goudy'
// import '@fontsource/im-fell-english'

// import 'prismjs/themes/prism-solarizedlight.css'
// require('prismjs/themes/prism-dark.css');
// require("prismjs/themes/prism-tomorrow.css")

// from https://github.com/gatsbyjs/gatsby/blob/master/examples/gatsbygram/gatsby-browser.js
// export const onInitialClientRender = () => {
//   window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true
// }

import React from 'react'
import { AnimatePresence } from 'framer-motion'

// Logs before the client route changes
export const onPreRouteUpdate = ({ location }) => {
  window.oldLocation = location.pathname
}
// Wraps every page in animation
export const wrapPageElement = ({ element }) => {
  // TODO: exit is not firing
  // console.log('wrapPageElement', element)
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
}

// https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/
export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 0.3 * 1000 * 2
  let scrollTimeout

  // https://github.com/gatsbyjs/gatsby/issues/28794#issuecomment-821884882
  if ('scrollRestoration' in window.history) {
    // Back off, browser, I got this...
    window.history.scrollRestoration = 'manual'
  }

  // if it's a "normal" route
  if (location.action === 'PUSH') {
    window.clearTimeout(scrollTimeout)
    scrollTimeout = window.setTimeout(
      () => window.scrollTo(0, 0),
      TRANSITION_DELAY
    )
  }
  // if we used the browser's forwards or back button
  else {
    const savedPosition = getSavedScrollPosition(location) || [0, 0]
    window.clearTimeout(scrollTimeout)
    scrollTimeout = window.setTimeout(
      () => window.scrollTo(...savedPosition),
      TRANSITION_DELAY
    )
  }
  return false
}
