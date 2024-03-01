// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlochchainFinalExamCoin is ERC20 {
    constructor() ERC20("Blochchain Final Exam Coin", "FEC") {
        _mint(msg.sender, 500 * (10 ** 18));
    }
}