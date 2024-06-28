// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint amount);

    event Approval(address indexed owner, address indexed spender, uint amount);

    function name() public view returns  (string memory);
    function symbol() public view returns (string memory);
    function decimal() public view returns (uint);

    function totalSupply() public view returns (uint);

    function balanceOf(address account) public view returns (uint);

    function transer(address to, uint amount) public returns (bool);

    function allowance(address owner, address spender) public view returns (bool);

    function approve(address spender, uint amount) public returns (bool);

    function transferFrom(address sender, address recepient, uint amount) public returns (bool);

}