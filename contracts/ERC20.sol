// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract ERC20 {
    address public owner;
    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowances;

    uint public totalSupply;

    string private _name;
    string private _symbol;

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    constructor(string memory name_, string memory symbol_) {
        owner = msg.sender;
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view returns(string memory) {
        return _name;
    }
    function symbol() public view returns(string memory) {
        return _symbol;
    }
    function decimal() public pure returns(uint) {
        return 18;
    }

    function totalSupply() public view returns(uint) {
        return totalSupply;
    }

    function balanceOf(address account) public view returns (uint) {
        return _balances[account];
    };

    function transfer(address to, uint amount) public returns (bool) {
        balances[msg.sender] -= amount;
        balances[to] +=amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    };
}