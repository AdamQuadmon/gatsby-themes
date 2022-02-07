import React from 'react'

import Hero from './Hero'
import Sections from './Blog/Sections'
import { useHomeAreas } from '../hooks/use-homeAreas'
import { useUi } from '../hooks/use-ui'

const Home = (pageData) => {
  const ui = useUi()
  const hasHero = ui.home.includes('hero')
  return (
    <>
      {hasHero && <Hero />}
      {<Sections pageData={pageData} field="area" />}
    </>
  )
}

export default Home
