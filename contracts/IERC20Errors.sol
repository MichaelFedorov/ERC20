// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

interface IERC20Errors {
    error ErrorInvalidSender(address sender);
    error ErrorInvalidReceiver(address sender);
    error ErrorInsufficcientBalance(address sender, uint balance, uint needed);
    error ErrorrInsuficcientAllowance(address sender, address spender, uint amount)
}