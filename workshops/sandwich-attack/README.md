# Lab B — Sandwich Attack (MEV Demo)

**Web3 Uncovered · Road to Devcon · Session 1**

> Bots can **read your pending swap** in the mempool, trade before and after you, and extract value. This lab runs that attack on a local AMM.

Pair with **Lab A:** [`mempool-mev`](https://github.com/suyash101101/mempool-mev) — shows the public waiting room first.

> Teaching code only. **Do not use on mainnet.**

---

## The privacy crux

```
[Searcher BUY]  →  [Victim SWAP]  →  [Searcher SELL]
   front-run         worse price        back-run
```

1. Victim broadcasts a swap → it sits **publicly** in the mempool
2. Searcher copies the intent (token, size, slippage)
3. Searcher front-runs (pumps price), victim fills worse, searcher back-runs (profit)

**Core lesson:** On a public ledger, **transaction intent is not private** before confirmation. That is why privacy tech (Session 2: ZK) matters.

---

## Prerequisites (once)

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup

forge --version
anvil --version
```

---

## Setup

```bash
git clone https://github.com/suyash101101/sandwich-attack.git
cd sandwich-attack

forge install foundry-rs/forge-std
forge build
forge test -vv
```

Expected:

```text
[PASS] test_sandwichExtractsValueFromVictim()
  victim shortfall (MEME) 8093
  searcher profit (wei) <positive number>
```

---

## Run end-to-end

### Terminal A

```bash
anvil --port 8545
```

### Terminal B

```bash
forge script script/Sandwich.s.sol:SandwichScript \
  --broadcast \
  --rpc-url http://127.0.0.1:8545 \
  -vv
```

### Expected output

```text
=== VICTIM INTENT (PUBLIC in mempool — anyone can read this) ===
Swap 10 WETH -> MEME, minOut 81818

=== FRONT-RUN ===
Searcher bought MEME 47619

=== VICTIM EXECUTES ===
Victim got MEME       82815
Fair would have been  90909
Victim lost MEME      8093

=== BACK-RUN ===
Searcher profit (wei)  <positive>

=== WHY PRIVACY MATTERS ===
Pending txs are public. Bots saw victim intent and reordered around it.
```

---

## How it maps to mainnet

| Demo | Real network |
|------|--------------|
| Victim swap pending | Uniswap swap visible in mempool |
| Searcher front-run | Higher gas / Flashbots bundle |
| Victim gets less tokens | Slippage tolerance eaten |
| Searcher back-run | MEV bot profit |

---

## Layout

```text
src/MockERC20.sol      # minimal ERC-20
src/SimpleAMM.sol      # x*y=k AMM (no fees, teaching only)
script/Sandwich.s.sol  # full sandwich simulation
test/Sandwich.t.sol    # automated checks
```

---

## Exercises

1. Change front-run from `5 ether` to `2 ether` — how does victim loss change?
2. Tighten slippage from `90%` to `98%` — does the victim tx revert?
3. Add a 0.3% swap fee to the AMM — is it still sandwichable?

---

## Safety

Anvil private keys are **public test keys**. Never fund them on mainnet.
