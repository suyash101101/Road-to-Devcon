// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {MockERC20} from "../src/MockERC20.sol";
import {SimpleAMM} from "../src/SimpleAMM.sol";

contract SandwichTest is Test {
    MockERC20 internal weth;
    MockERC20 internal token;
    SimpleAMM internal amm;

    address internal searcher = makeAddr("searcher");
    address internal victim = makeAddr("victim");

    function setUp() public {
        weth = new MockERC20("WETH", "WETH");
        token = new MockERC20("MEME", "MEME");
        amm = new SimpleAMM(weth, token);

        weth.mint(address(this), 100 ether);
        token.mint(address(this), 1_000_000 ether);
        weth.approve(address(amm), type(uint256).max);
        token.approve(address(amm), type(uint256).max);
        amm.seed(100 ether, 1_000_000 ether);

        weth.mint(searcher, 50 ether);
        weth.mint(victim, 10 ether);
    }

    function test_sandwichExtractsValueFromVictim() public {
        uint256 fairOut = amm.getAmountOut(10 ether, amm.reserveA(), amm.reserveB());
        uint256 minOut = (fairOut * 90) / 100;

        uint256 searcherStart = weth.balanceOf(searcher);

        // Front-run
        vm.startPrank(searcher);
        weth.approve(address(amm), type(uint256).max);
        token.approve(address(amm), type(uint256).max);
        uint256 bought = amm.swapExactIn(true, 5 ether, 0);
        vm.stopPrank();

        // Victim
        vm.startPrank(victim);
        weth.approve(address(amm), type(uint256).max);
        uint256 victimOut = amm.swapExactIn(true, 10 ether, minOut);
        vm.stopPrank();

        assertLt(victimOut, fairOut, "victim should get less than fair");

        // Back-run
        vm.startPrank(searcher);
        uint256 soldFor = amm.swapExactIn(false, bought, 0);
        vm.stopPrank();

        uint256 searcherFinal = weth.balanceOf(searcher);
        uint256 profitWei = searcherFinal - searcherStart;
        assertGt(profitWei, 0, "searcher should profit from reordering");
        console2.log("victim shortfall (MEME)", (fairOut - victimOut) / 1e18);
        console2.log("searcher back-run WETH", soldFor / 1e18);
        console2.log("searcher profit (wei)", profitWei);
    }
}
