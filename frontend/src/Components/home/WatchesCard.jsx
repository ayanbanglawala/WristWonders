import React from 'react'
import Card from './Card'

const WatchesCard = () => {
  return (
    <div className='container m-0 w-100 lg:m-5 mt-5 w-100 flex flex-col lg:flex-row items-center justify-center gap-6'>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default WatchesCard