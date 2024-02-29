// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract BlockchainFinalExamNFT is ERC721, ERC721URIStorage,  ERC721Enumerable, Ownable {
    string private constant TOKEN_URI = "ipfs://bafybeihldui6hmcmch6kqdgzuhq5aeb5koemhbascnmzz3hhybrn4rfg2i";
    uint256 tokenIdCounter;

    constructor() ERC721("Blockchain Final Exam NFT", "BFE") Ownable(msg.sender) {
      tokenIdCounter = 0;
    }

    function safeMint(address to) public onlyOwner {
      _safeMint(to, tokenIdCounter);
      _setTokenURI(tokenIdCounter, TOKEN_URI);
      tokenIdCounter++;
    }


    function burn(uint256 tokenId) public onlyOwner {
      super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
      return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
      return super.supportsInterface(interfaceId);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
      super._increaseBalance(account, value);
    }

     function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
      return super._update(to, tokenId, auth);
    }
    
}