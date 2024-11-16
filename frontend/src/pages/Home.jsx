import React from 'react'
import Navbar from '../Components/Navbar'
import Main from '../Components/home/Main'
import WatchesCard from '../Components/home/WatchesCard'
// import Main2 from '../Components/home/Main2'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Main/>
        <WatchesCard/>
    </div>
  )
}

export default Home