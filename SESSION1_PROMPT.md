# Session 1 — updated teaching prompt
# Road to Devcon @ NITK Surathkal · "Make Private Apps using Ethereum"

You are helping me build Session 1 of three workshops.

Audience: 2nd/3rd year eng students. Strong CS fundamentals. ~zero blockchain. ~100 people. 90 min.
Title: "Ethereum, Mempools & Why Privacy Matters"

## Narrative order (revised)

Context first, then the live hook — so the mempool screen means something.

1. **Title + map (3 min)**
2. **2008 and Bitcoin's problem (8 min)** — trusted intermediaries failed; Satoshi: ledger with no trusted party
3. **How Bitcoin works — PoW (10 min)** — miners race; foreshadow waiting room (don't deep-dive mempool yet)
4. **PoW → PoS + gas (7 min)** — one-line PoS rationale; gas as bid for block space
5. **Hook — mempool.space (5 min)** — "every tx is a public message of intent." Watch, don't fully explain; return in part 8
6. **What Ethereum is + EVM (12 min)** — shared spreadsheet that computes; Postgres vs Ethereum; EOA, wallet, signed tx; bytecode/state (no opcodes)
7. **Solidity mental model (15 min)** — public program + public memory; Counter + tiny transfer mapping; tie to part 6
8. **Mempool properly (15 min)** — name it; gossip one-liner; fee ordering; pending = public
9. **MEV + sandwich (15 min)** — one-line MEV; diagram; Foundry Anvil demo + commands on screen
10. **Beyond DeFi (7 min)** — wallet profiling; public group chat for money
11. **AI bridge (4 min)** — leaky mempool ≈ leaky LLM prompts; same privacy arc for the event
12. **Homework + Session 2 preview (2 min)** — MetaMask, Sepolia faucet, one tx, Etherscan

## Constraints

- Term shown/analogised BEFORE named
- One idea per slide; diagrams over text walls
- Speaker notes: casual Indian-English, 3–5 sentences
- Jargon budget: mempool, gas, MEV, sandwich attack, EOA, PoW, PoS, EVM

## Deliverables (this repo)

- Interactive HTML deck (GitHub Pages): `/index.html`
- Hands-on sandwich lab: `/workshops/sandwich-mev` (also publish as its own student repo)
