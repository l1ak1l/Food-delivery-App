import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import Carousel from '../Components/Carousel'
export default function Home() {
  return (
    <div>
   <Navbar/>
   <div><Carousel/></div>
   <div>
    <Card/>
   </div>
    </div>
  )
}
