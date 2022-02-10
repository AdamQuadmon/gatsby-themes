import React from 'react'

import Hero from './Hero'
import Sections from './Blog/Sections'
import { useUi } from '../hooks/use-ui'

const Home = (pageData) => {
  const { home } = useUi()
  const hasHero = home.includes('hero')
  return (
    <>
      {hasHero && <Hero />}
      {<Sections pageData={pageData} field="area" />}
    </>
  )
}

export default Home
