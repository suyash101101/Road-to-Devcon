# Road to Devcon · NITK Surathkal

React slide deck and workshop links.

**Deck:** https://devcon-site.vercel.app  
**Session 2 deck:** https://devcon-site.vercel.app/?session=2  
**Session 3 deck:** https://devcon-site.vercel.app/?session=3

| Repo | URL |
|------|-----|
| kohaku-railgun | https://github.com/vg239/kohaku-railgun |
| mempool-mev | https://github.com/suyash101101/mempool-mev |
| sandwich-attack | https://github.com/suyash101101/sandwich-attack |

## kohaku-railgun setup (Session 3 live demo)

```bash
git clone https://github.com/vg239/kohaku-railgun.git
cd kohaku-railgun
npm install
cp .env.example .env   # add PRIVATE_KEY (secret key, not 0x address)
npm run check:wallet   # Sepolia ETH + USDC from faucets
npm run demo:shield    # live approve + shield
npm run demo:dry       # transfer + unshield preview
npm test
```

Faucets: [Sepolia ETH](https://sepoliafaucet.com/) · [Circle USDC](https://faucet.circle.com/)

## Develop the deck

```bash
npm install
npm run dev
```

Controls: `→` / `Space` next · `←` prev · `N` notes · `F` fullscreen

```bash
npm run build
npm run preview
```

Workshop lab copies live under `workshops/`.
