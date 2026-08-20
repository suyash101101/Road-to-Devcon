# Road to Devcon · NITK Surathkal

React slide deck for Sessions 1–2, plus hands-on labs and the Kohaku starter repo.

**Live deck:** https://devcon-site.vercel.app

| Session | URL | Topic |
|---------|-----|-------|
| Session 1 | https://devcon-site.vercel.app | Mempool, MEV, privacy intro |
| Session 2 | https://devcon-site.vercel.app/?session=2 | ZK, shielded pools, Kohaku SDK |
| Lab A | https://github.com/suyash101101/mempool-mev | Mempool fee race |
| Lab B | https://github.com/suyash101101/sandwich-attack | Sandwich attack |
| Session 3 code | https://github.com/vg239/kohaku-railgun | Shield / transfer / unshield |

## Beginner setup (all OS)

You only need **Git** and **Node.js 20+** (from https://nodejs.org/).

```bash
# Session 3 starter — works on Windows, macOS, Linux
git clone https://github.com/vg239/kohaku-railgun.git
cd kohaku-railgun
npm install
npm run setup
npm run demo:dry    # safe preview — no blockchain
npm test
```

Copy `.env.example` to `.env` — see the [kohaku-railgun README](https://github.com/vg239/kohaku-railgun) for Windows vs Mac/Linux copy commands.

## Develop the slide deck

```bash
cd Road-to-Devcon
npm install
npm run dev
```

Open Session 2: http://localhost:5173/?session=2

Controls: `→` / `Space` next · `←` prev · `N` notes · `F` fullscreen

```bash
npm run build
npm run preview
```

## Narrative

**Session 1:** 2008 → Bitcoin → mempool → MEV labs  
**Session 2:** ZK proofs → shielded pools → RAILGUN → Kohaku SDK  
**Session 3:** Live code in kohaku-railgun

## Workshops

Foundry labs live in separate repos (see table above). Copies under `workshops/` for reference.
