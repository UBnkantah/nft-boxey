import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { ABI } from "../utils/AbiData";


const NftForm = () => {
  const { account } = useMetaMask();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const NFTCollection = new ethers.Contract(ADDRESS, ABI);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = { name, description, image, properties: { price } };

    const nftstorage = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjYkI1ZGViQ0IzMjRBMDdmM0QxNkNBNzg1ODcyYmRkZjI0M0MxNkIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTA1MTY2NDIwMCwibmFtZSI6IlNob3BleSJ9.INQfCqbNnpUUhIQkMcOWNQHkkyJm9BCnRou182b1Wpw",
    });

    const metadata = await nftstorage.store(content);

    // console.log('NFT data stored!')
    console.log("Metadata URI: ", metadata.url);

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("account", account);
        console.log("signer", await signer.getAddress());
        const response = await NFTCollection.connect(signer).createNFT(
          name,
          ethers.utils.parseEther(price),
          account,
          metadata.url
        );
        console.log(response);
      }
      setName("")
      setPrice("")
      setDescription("")
      setImage(null)
    } catch (e) {
      console.log("something went wrong...", e);
    }
  };

  return (
    <div
      style={{
        width: "500px",
        height: "fit-content",
        margin: "100px",
        padding: "50px",
      }}
      className="border border-success rounded"
    >
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px] bg-white">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Name
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John NFT"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-3">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Price
              </label>
              <input
                type="number"
                name="email"
                id="email"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-3">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <textarea
                        rows="6"
                        placeholder="Description"
                        class="
                        w-full
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        resize-none
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
            </div>

            <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload NFT
              </label>

              <div class="mb-8">
                <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} name="file" id="file" class="sr-only" />
                <label
                  for="file"
                  
                  class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span class="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <button class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-dark outline-none">
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NftForm;
