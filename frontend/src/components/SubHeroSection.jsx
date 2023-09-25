import React from 'react'
import Navbar from './Navbar'

const SubHeroSection = ({children}) => {
  return (
    <div
    style={{backgroundColor: " #FFDEE9",
    backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)", width: "100%", height: "50vh"}}
    >
        <Navbar />
        <div className='flex flex-wrap justify-between align-middle p-5'>
            {children}
        </div>
        </div>
  )
}

export default SubHeroSection