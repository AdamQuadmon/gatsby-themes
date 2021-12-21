import React from 'react'

import Hero from './Hero'
import Sections from './Blog/Sections'
import { useHomeAreas } from '../hooks/use-homeAreas'
import { useUi } from '../hooks/use-ui'

const Home = () => {
  const data = useHomeAreas()
  const ui = useUi()
  const hasHero = ui.home.includes('hero')
  const hasSections = ui.home.includes('sections') && data.section
  return (
    <>
      {hasHero && <Hero />}
      {hasSections && <Sections data={data} field="area" />}
    </>
  )
}

export default Home
