import React from 'react'
import Navbar from './Navbar'
import HeroImg from "../assets/heroimg.jpg"

const HeroSection = () => {
  return (
    <div
    style={{backgroundColor: " #FFDEE9",
    backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)", width: "100%", height: "80vh"}}
    >
        <Navbar />
        <div className='flex flex-wrap justify-between align-middle p-5'>
            <div className='w-32 bg-blue-950'>

            </div>
            <div className='bg-white rounded p-5 w-32'>
            <img src={HeroImg} alt="image" style={{width: "300px", height: "300px"}}/>
            </div>
        </div>
        </div>
  )
}

export default HeroSection