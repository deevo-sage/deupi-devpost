// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import '@openzeppelin/contracts/access/Ownable.sol';

contract Main is Ownable {
  event Payment(string x, uint256 y);

  function pay(string memory to, uint256 val) public payable {
    require(msg.value >= val, 'amazed ho kya');
    emit Payment(to, val);
  }

  function retrieve() public payable onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }
}