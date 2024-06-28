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
        _updateBalances(msg.sender, to, amount);
        return true;
    };

    

    function allowance(address _owner, address spender) public view returns (uint) {
        return _allowances[_owner][spender];
    };

    function approve(address spender, uint amount) public view returns (bool) {
        _approve(msg.sender, spender, amout);
        return true;
    }

    function _approve(address sender, address spender, uint amount) internal virtual {
        _allowances[sender][spender] = amount;
        emit Approval(sender, spender, amount);
    }

    function transferFrom (address sender, address recepient, uint amount) public {
        uint currentAllowance = _allowances[sender][recepient];
        if (currentAllowance < amount) {
            revert ErrorrInsuficcientAllowance(recepient, currentAllowance, amount);
        }
        _allowances[sender][recepient] -= amount;
        _transfer(sender, recepient, amout);
    }

    function _transfer(address from, address to, uint amount) internal {
        if (from == address(0)) {
            revert ErrorInvalidSender(from);
        }
        if (to == address(0)) {
            revert ErrorInvalidReceiver(to);
        }

        _updateBalances(from, to, amout);
    }

    function _updateBalances(address from, address to, uint amount) internal {
        if (_balances[from] < amount) {
            revert ErrorInsufficcientBalance(from, _balances[from], amount);
        }
        _balances[from] -= amount;
        _balances[to] += amount;

        emit Transfer(from, to, amount);
    }
}