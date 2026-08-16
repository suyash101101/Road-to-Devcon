# Sandwich Attack Lab (Lab B)

Road to Devcon · Session 1 · NITK Surathkal

Deploy a tiny AMM, sandwich a victim swap on Anvil, and read **searcher profit** in your terminal.

Pair with Lab A ([`mempool-mev`](https://github.com/suyash101101/mempool-mev)) — that one shows the public waiting room; this one shows the attack.

> Teaching code only. No fees, no production safety. Do **not** use on mainnet.

---

## Prerequisites

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

---

## Setup

```bash
git clone https://github.com/suyash101101/sandwich-attack.git
cd sandwich-attack

forge install foundry-rs/forge-std --no-commit
forge build
forge test -vv
```

---

## Run the sandwich (e2e)

**Terminal A**

```bash
anvil
```

**Terminal B**

```bash
forge script script/Sandwich.s.sol:SandwichScript \
  --broadcast \
  --rpc-url http://127.0.0.1:8545
```

You should see logs like:

```text
=== FRONT-RUN ===
=== VICTIM EXECUTES ===
Victim lost MEME    ...
=== BACK-RUN ===
Searcher profit WETH ...
```

---

## How it maps to reality

| Demo step | Real mempool |
|-----------|----------------|
| Victim intends 10 WETH → MEME | Pending Uniswap tx (public) |
| Searcher buys first | Front-run / bundle |
| Victim fills worse | Slippage eaten |
| Searcher sells into victim | Back-run profit |

---

## Layout

```text
src/MockERC20.sol
src/SimpleAMM.sol
script/Sandwich.s.sol
test/Sandwich.t.sol
```

## Exercises

1. Change searcher size `20 ether` → `5 ether` — profit?
2. Tighten victim slippage to 0.1% — does victim revert?
3. Add a 0.3% fee to the AMM — still sandwichable?

## Safety

Anvil keys are public. Never use them with real funds.
