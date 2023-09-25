import React from 'react'
import {Link} from "react-router-dom"

const CreateNFTTop = () => {
  return (
    <div className='flex justify-between align-middle p-5 '>
        <div>
            <button className='bg-green-500 text-black-500 font-bold rounded-xl p-3'>
              <Link to="/">
                Home
            </Link>  
            </button>
            
        </div>
        <div>
        <button className='bg-green-500 text-black-500 font-bold rounded-xl p-3'>
              <Link to="/collection">
                Collection
            </Link>  
            </button>
        </div>
    </div>
  )
}

export default CreateNFTTop