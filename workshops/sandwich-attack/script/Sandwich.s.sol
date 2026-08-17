// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {MockERC20} from "../src/MockERC20.sol";
import {SimpleAMM} from "../src/SimpleAMM.sol";

/// @notice Deploys tokens + AMM, seeds liquidity, then runs a sandwich against a victim swap.
///
/// Run (local):
///   anvil
///   forge script script/Sandwich.s.sol:SandwichScript --broadcast --rpc-url http://127.0.0.1:8545
contract SandwichScript is Script {
    // Anvil default accounts
    uint256 internal constant DEPLOYER_KEY =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 internal constant SEARCHER_KEY =
        0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
    uint256 internal constant VICTIM_KEY =
        0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a;

    function run() external {
        address deployer = vm.addr(DEPLOYER_KEY);
        address searcher = vm.addr(SEARCHER_KEY);
        address victim = vm.addr(VICTIM_KEY);

        vm.startBroadcast(DEPLOYER_KEY);

        MockERC20 weth = new MockERC20("Wrapped ETH", "WETH");
        MockERC20 token = new MockERC20("Meme Token", "MEME");
        SimpleAMM amm = new SimpleAMM(weth, token);

        // Seed pool: 100 WETH / 1_000_000 MEME  => spot ~ 10_000 MEME per WETH
        weth.mint(deployer, 100 ether);
        token.mint(deployer, 1_000_000 ether);
        weth.approve(address(amm), type(uint256).max);
        token.approve(address(amm), type(uint256).max);
        amm.seed(100 ether, 1_000_000 ether);

        // Fund actors
        weth.mint(searcher, 50 ether);
        weth.mint(victim, 10 ether);

        vm.stopBroadcast();

        uint256 priceBefore = amm.spotPriceBPerA();
        console2.log("=== SETUP ===");
        console2.log("AMM        ", address(amm));
        console2.log("Spot MEME/WETH (1e18)", priceBefore);
        console2.log("Searcher WETH", weth.balanceOf(searcher) / 1e18);
        console2.log("Victim WETH  ", weth.balanceOf(victim) / 1e18);

        // --- Victim intent (would normally sit in the mempool) ---
        uint256 victimIn = 10 ether;
        uint256 fairOut = amm.getAmountOut(victimIn, amm.reserveA(), amm.reserveB());
        // Victim allows 10% slippage — realistic DEX default, room for a moderate sandwich
        uint256 victimMinOut = (fairOut * 90) / 100;

        console2.log("=== VICTIM INTENT (PUBLIC in mempool - anyone can read this) ===");
        console2.log("Swap 10 WETH -> MEME, minOut", victimMinOut / 1e18);
        console2.log("Privacy leak: amount, direction, and slippage are visible BEFORE confirmation");

        // --- 1) Searcher front-run (copied from public mempool) ---
        uint256 searcherStartWeth = weth.balanceOf(searcher);
        uint256 searcherIn = 5 ether;
        vm.startBroadcast(SEARCHER_KEY);
        weth.approve(address(amm), type(uint256).max);
        token.approve(address(amm), type(uint256).max);
        uint256 bought = amm.swapExactIn(true, searcherIn, 0);
        vm.stopBroadcast();

        uint256 priceMid = amm.spotPriceBPerA();
        console2.log("=== FRONT-RUN ===");
        console2.log("Searcher bought MEME", bought / 1e18);
        console2.log("Spot after front-run", priceMid);

        // --- 2) Victim lands at worse price ---
        vm.startBroadcast(VICTIM_KEY);
        weth.approve(address(amm), type(uint256).max);
        uint256 victimOut = amm.swapExactIn(true, victimIn, victimMinOut);
        vm.stopBroadcast();

        console2.log("=== VICTIM EXECUTES ===");
        console2.log("Victim got MEME     ", victimOut / 1e18);
        console2.log("Fair would have been", fairOut / 1e18);
        console2.log("Victim lost MEME    ", (fairOut - victimOut) / 1e18);

        // --- 3) Searcher back-run: sell MEME back for WETH ---
        vm.startBroadcast(SEARCHER_KEY);
        uint256 soldFor = amm.swapExactIn(false, bought, 0);
        vm.stopBroadcast();

        uint256 searcherWeth = weth.balanceOf(searcher);
        uint256 profitWei = searcherWeth - searcherStartWeth;
        console2.log("=== BACK-RUN ===");
        console2.log("Searcher sold for WETH", soldFor / 1e18);
        console2.log("Searcher final WETH   ", searcherWeth / 1e18);
        console2.log("Searcher profit (wei) ", profitWei);
        console2.log("=== WHY PRIVACY MATTERS ===");
        console2.log("Pending txs are public. Bots saw victim intent and reordered around it.");
        console2.log("Victim lost MEME tokens. Searcher captured value. Intent was never private.");
        console2.log("=== DONE - sandwich complete ===");
    }
}
