import React from 'react'
import { Link } from 'react-router-dom'

const CollectionTopTitle = () => {
  return (
    <div className='flex flex-wrap justify-between align-middle m-10'>
        <div>
            <h2>Collections</h2>
        </div>
        <div>
            <button className='bg-green-500 p-3 font-extrabold text-black rounded-xl '>
                <Link to="/create-nft">
                    Create NFT
                </Link>
            </button>
        </div>
    </div>
  )
}

export default CollectionTopTitle