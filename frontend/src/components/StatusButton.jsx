import { useMetaMask } from 'metamask-react'
import {Link} from "react-router-dom"
import React from 'react'

const StatusButton = () => {
    const{status, connect} = useMetaMask()
  return (
    <div>
        {status === "connecting" && <button className='bg-yellow-500 text-black rounded-xl p-4 font-bold'>Connecting...</button>}
        {status === "connected" && <div>
          <button className='bg-green-500 p-3 font-extrabold text-black rounded-xl '>
            <Link to="/collection">
            Collection
          </Link>
          </button>
          
          </div>}
        {status === "initializing" && <div>CONNECT WALL</div>}
        {status === "notConnected" && <button className='bg-green-500 text-black rounded-xl p-4 font-bold ' onClick={connect}>CONNECT WALLET</button>}
        {status === "unavailable" && <button className='bg-green-500 text-black rounded-xl p-4 font-bold ' onClick={connect}>CONNECT WALLET</button>}
    </div>
  )
}

export default StatusButton