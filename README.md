# Road to Devcon · NITK Surathkal

Interactive workshop track toward [Devcon 8 · Mumbai](https://devcon.org/en/) (3–6 Nov 2026).

**Theme:** Make Private Apps using Ethereum

| Artifact | Link |
|----------|------|
| Session 1 deck (this repo) | GitHub Pages / Vercel |
| Lab A · mempool & fees | [`mempool-mev`](https://github.com/suyash101101/mempool-mev) |
| Lab B · sandwich attack | [`sandwich-attack`](https://github.com/suyash101101/sandwich-attack) |

---

## Present the deck

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Controls: `→` / `Space` next · `←` prev · `N` notes · `F` fullscreen

### Deploy

- **GitHub Pages:** Settings → Pages → branch `main` / root  
- **Vercel:** import this repo (static); `vercel.json` included

---

## Student labs (e2e)

### 0. Install Foundry once

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Lab A — mempool-mev

```bash
git clone https://github.com/suyash101101/mempool-mev.git
cd mempool-mev && forge install foundry-rs/forge-std --no-commit
anvil --block-time 8   # terminal A
forge script script/FeeRace.s.sol:FeeRaceScript --broadcast --rpc-url http://127.0.0.1:8545 -vv
```

### Lab B — sandwich-attack

```bash
git clone https://github.com/suyash101101/sandwich-attack.git
cd sandwich-attack && forge install foundry-rs/forge-std --no-commit
anvil   # terminal A
forge script script/Sandwich.s.sol:SandwichScript --broadcast --rpc-url http://127.0.0.1:8545
```

Monorepo copies (same code) live under `workshops/` for editing.

---

## License

MIT · teaching materials only
