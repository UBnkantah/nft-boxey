const { expect } = require("chai");
// import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers"

describe("NftCol", function () {
  async function deployFixture() {
    let creatorFund;
    // let creator, buyer;
    const GWEI = 1_000_000;

    const [owner, creator, buyer] = await ethers.getSigners();

    const NftCol = await ethers.getContractFactory("NFTCollection");
    const NftLock = await NftCol.deploy("NFTCollection", "NMH");

    return { NftLock, creator, buyer, owner };
  }

  describe("Creation", function () {
    it("Should Mint and Store an NFT", async function () {
      const { NftLock, owner, creator } = await deployFixture();

      const tokenName = "Kingsley";
      const tokenPrice = 1;
      const txTransaction = await NftLock.connect(owner).createNFT(
        tokenName,
        tokenPrice,
        owner,
        "dkslkdlskjsdlfjsdlk"
      );
      await expect(txTransaction)
        .to.emit(NftLock, "Transfer")
        .withArgs(
          "0x0000000000000000000000000000000000000000",
          owner.address,
          1
        );
    });

    it("Should Read an NFT", async function () {
      const { NftLock, owner } = await deployFixture();
      const tokenId = 1;
      const nftName = "Monster";
      const nftPrice = 100;
      const nftSale = true;
      await NftLock.connect(owner).createNFT(
        nftName,
        nftPrice,
        owner,
        "dkslkdlskjsdlfjsdlk"
      );

      const [name, price, isForSale] = await NftLock.readNFT(tokenId);

      expect(name).to.equal(nftName, "Name Should Match");
      expect(price).to.equal(nftPrice, "Price should match");
      expect(isForSale).to.equal(nftSale, "isForSale should match");
    });

    it("Should Read All NFT", async function () {
      const { NftLock } = await deployFixture();
      await NftLock.readAllNFTs();
    });

    // it("Sh");
  });
});
