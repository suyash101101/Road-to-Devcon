// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MockERC20} from "./MockERC20.sol";

/// @notice Tiny constant-product AMM (x * y = k). Teaching tool only.
/// @dev No fees, no TWAP, no reentrancy guard — intentional simplicity for MEV demos.
contract SimpleAMM {
    MockERC20 public immutable tokenA; // e.g. WETH-like
    MockERC20 public immutable tokenB; // e.g. TOKEN

    uint256 public reserveA;
    uint256 public reserveB;

    event Sync(uint256 reserveA, uint256 reserveB);
    event Swap(address indexed trader, bool aForB, uint256 amountIn, uint256 amountOut);

    constructor(MockERC20 tokenA_, MockERC20 tokenB_) {
        tokenA = tokenA_;
        tokenB = tokenB_;
    }

    function seed(uint256 amountA, uint256 amountB) external {
        require(reserveA == 0 && reserveB == 0, "ALREADY_SEEDED");
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "A");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "B");
        reserveA = amountA;
        reserveB = amountB;
        emit Sync(reserveA, reserveB);
    }

    /// @notice Swap exact tokenA for tokenB (or reverse if aForB == false).
    function swapExactIn(bool aForB, uint256 amountIn, uint256 minOut)
        external
        returns (uint256 amountOut)
    {
        require(amountIn > 0, "ZERO");
        if (aForB) {
            amountOut = getAmountOut(amountIn, reserveA, reserveB);
            require(amountOut >= minOut, "SLIPPAGE");
            require(tokenA.transferFrom(msg.sender, address(this), amountIn), "IN");
            require(tokenB.transfer(msg.sender, amountOut), "OUT");
            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            amountOut = getAmountOut(amountIn, reserveB, reserveA);
            require(amountOut >= minOut, "SLIPPAGE");
            require(tokenB.transferFrom(msg.sender, address(this), amountIn), "IN");
            require(tokenA.transfer(msg.sender, amountOut), "OUT");
            reserveB += amountIn;
            reserveA -= amountOut;
        }
        emit Swap(msg.sender, aForB, amountIn, amountOut);
        emit Sync(reserveA, reserveB);
    }

    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut)
        public
        pure
        returns (uint256)
    {
        require(reserveIn > 0 && reserveOut > 0, "EMPTY");
        // x * y = k  =>  dy = y - k / (x + dx)
        uint256 amountInWithFee = amountIn; // 0% fee for clarity
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = reserveIn + amountInWithFee;
        return numerator / denominator;
    }

    function spotPriceBPerA() external view returns (uint256) {
        // tokenB per 1e18 tokenA
        return (reserveB * 1e18) / reserveA;
    }
}
