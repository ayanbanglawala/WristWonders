import React from 'react'
import Navbar from '../Components/Navbar'
import Main from '../Components/home/Main'
import WatchesCard from '../Components/home/WatchesCard'
import Footer from '../Components/Footer'
import Collection from '../Components/home/Collection'
// import Main2 from '../Components/home/Main2'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Main/>
        <Collection/>
        <WatchesCard/>
        <Footer/>
    </div>
  )
}

export default Home