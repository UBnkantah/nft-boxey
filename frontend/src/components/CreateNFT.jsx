import React, { useState } from 'react'
import {NFTStorage} from 'nft.storage'
import { useMetaMask } from 'metamask-react'
import {ethers} from 'ethers'
import { ABI } from '../utils/AbiData'
import ReadNFTs from '../components/ReadNFTs'

console.log('ABI', ABI)

const CreateNFTs = () => {
    const {account} = useMetaMask()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)

    const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const NFTCollection = new ethers.Contract(ADDRESS, ABI)


    const handleSubmit = async(e) => {
        e.preventDefault()
        const content = {name, description, image, properties: {price}}

        const nftstorage = new NFTStorage({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjYkI1ZGViQ0IzMjRBMDdmM0QxNkNBNzg1ODcyYmRkZjI0M0MxNkIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTA1MTY2NDIwMCwibmFtZSI6IlNob3BleSJ9.INQfCqbNnpUUhIQkMcOWNQHkkyJm9BCnRou182b1Wpw"})

        const metadata = await nftstorage.store(content)

        // console.log('NFT data stored!')
        console.log('Metadata URI: ', metadata.url)


        try {
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                console.log("account", account)
                console.log("signer", await signer.getAddress())
                const response = await NFTCollection.connect(signer).createNFT(name, ethers.utils.parseEther(price), account, metadata.url);
                console.log(response)
            }
        } catch (e) {
            console.log('something went wrong...',e)
        }
    }

  return (
    <div >
        <ReadNFTs />
    <form onSubmit={handleSubmit} className='mx-auto border border'>
        <div className='d-flex gap-2'>
            <label>Product</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded'/>    
        </div>
        <div className='d-flex gap-2'>
            <label>Description</label>
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='p-2 rounded'/>    
        </div>
        <div className='d-flex gap-2'>
            <label>Price</label>
            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} className='p-2 rounded' />    
        </div>
        <div className='d-flex gap-2'>
            <label>Avatar</label>
            <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />    
        </div>    
        <button type='submit' className='btn btn-success'>Submit</button>
    </form>    
    </div>
  )
}

export default CreateNFTs