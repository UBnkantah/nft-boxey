// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721Enumerable, Ownable {
    // using SafeMath for uint256;

    struct NFT {
        string name;
        uint256 price;
        bool isForSale;
        address owner; // an address for the owner
        string metadata; // a string for the metadata
    }

    NFT[] public nftCollection;
    uint256 public nextTokenId = 1;
    uint256 public feePercentage = 5; // 5% fee on NFT sales

    mapping(uint256 => address) private nftOwner;
    mapping(uint256 => address) private nftCreator;

    event CreatedNFT(address indexed, string metadata);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function createNFT(string memory name, uint price, address owner, string memory metadataUrl) external { // include arguments for the owner address and the metadata string
        nftCollection.push(NFT(name, price, true, owner, metadataUrl)); // pass the owner and metadata here...
        uint256 tokenId = nextTokenId;
        nextTokenId++; 
        _mint(owner, tokenId); // pass the owner for minting
        nftOwner[tokenId] = owner; // pass the owner for minting
        nftCreator[tokenId] = owner; // pass the owner for minting

        emit CreatedNFT(owner, metadataUrl);
    }

    function readNFT(uint256 _tokenId) external view returns (string memory name, uint256 price, bool isForSale) {
        require(_exists(_tokenId), "NFT does not exist");
        NFT memory nft = nftCollection[_tokenId - 1];
        return (nft.name, nft.price, nft.isForSale);
    }

    function readAllNFTs() external view returns (NFT[] memory) {
        return nftCollection;
    }

    function buyNFT(uint256 _tokenId) external payable {
        require(_exists(_tokenId), "NFT does not exist");
        NFT storage nft = nftCollection[_tokenId - 1];
        require(nft.isForSale, "NFT is not for sale");
        require(msg.value >= nft.price, "Insufficient funds");

        address seller = nftOwner[_tokenId];
        address creator = nftCreator[_tokenId];
        uint256 creatorFee = (nft.price * feePercentage) / 100;
        uint256 sellerProceeds = nft.price - creatorFee;

        nft.isForSale = false;
        nftOwner[_tokenId] = msg.sender;
        nftCreator[_tokenId] = creator;

        payable(seller).transfer(sellerProceeds);
        payable(creator).transfer(creatorFee);
    }

    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        feePercentage = _feePercentage;
    }
}