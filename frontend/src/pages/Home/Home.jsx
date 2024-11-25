import React from 'react'
import Navbar from '../../Components/Navbar'
import Hero from '../../Components/home/Hero'
import WatchesCard from '../../Components/home/WatchesCard'
import Footer from '../../Components/Footer'
import Collection from '../../Components/home/Collection'
// import Main2 from '../Components/home/Main2'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        {/* <Collection/> */}
        <WatchesCard/>
        <Footer/>
    </div>
  )
}

export default Home