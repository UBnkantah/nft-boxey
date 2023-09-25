require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config()

// 48db219ddde11ef39e297887f462583aba5d31942398af56d11e7d815faafb10

const ALCHEMY_KEY="https://polygon-mumbai.g.alchemy.com/v2/RhLbAF1JrOX-Y0j-v9WH2PhiFXvAGM0A"

// const 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: ALCHEMY_KEY,
      accounts: ["637bbe278aa096c8e045008a75923187e296abc579ab1dbe058f2d517b46b437"]
    }
  }
};
