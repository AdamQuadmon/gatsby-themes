import React from 'react'

import Hero from './Hero'
import Sections from './Blog/Sections'
import { useHomeAreas } from '../hooks/use-homeAreas'

const Home = () => {
  const data = useHomeAreas()
  return (
    <>
      <Hero />
      {data.section && <Sections data={data} field="area" />}
    </>
  )
}

export default Home
