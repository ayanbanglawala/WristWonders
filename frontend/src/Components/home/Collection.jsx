import React from 'react'
import CollectionCard from './CollectionCard'

const Collection = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-5xl stylish font-bold">Collection</h1>
      <div className="container mx-auto my-5 flex flex-wrap justify-center gap-6 w-[100vw]">
        <CollectionCard/>
        <CollectionCard/>
        <CollectionCard/>
        <CollectionCard/>
        <CollectionCard/>
        <CollectionCard/>
        <CollectionCard/>
        <CollectionCard/>
      </div>
    </div>
  )
}

export default Collection