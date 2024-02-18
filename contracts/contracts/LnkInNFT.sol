// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LnkInNFT is ERC721 {
    uint256 public tokenCounter;
    mapping(address => bool) public privilegedAddresses;

    constructor () ERC721 ("LnkInNFT", "LNNFT") {
        tokenCounter = 0;
    }

    function mint(address _to) public {
        require(privilegedAddresses[msg.sender], "Caller is not privileged");
        _safeMint(_to, tokenCounter);
        tokenCounter++;
    }

    function addPrivilegedAddress(address _address) public {
        require(privilegedAddresses[msg.sender], "Caller is not privileged");
        privilegedAddresses[_address] = true;
    }

    function removePrivilegedAddress(address _address) public {
        require(privilegedAddresses[msg.sender], "Caller is not privileged");
        privilegedAddresses[_address] = false;
    }

    function isPrivileged(address _address) public view returns (bool) {
        return privilegedAddresses[_address];
    }
}