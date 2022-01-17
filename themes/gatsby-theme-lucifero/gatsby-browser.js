import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'
// import '@fontsource/sorts-mill-goudy'
// import '@fontsource/im-fell-english'

import 'prismjs/themes/prism-solarizedlight.css'
// require('prismjs/themes/prism-dark.css');
// require("prismjs/themes/prism-tomorrow.css")

// from https://github.com/gatsbyjs/gatsby/blob/master/examples/gatsbygram/gatsby-browser.js
// exports.shouldUpdateScroll = (args) => {
//   const windowWidth = window.innerWidth
//   // Scroll position only matters on mobile as on larger screens, we use a
//   // modal.
//   return windowWidth < 750
// }

// exports.onInitialClientRender = () => {
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
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
}
