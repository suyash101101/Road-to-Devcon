import type { Slide } from './slides-session1'
import { SandwichViz } from '../viz/Widgets'

function Code({ children }: { children: string }) {
  return <pre className="code">{children}</pre>
}

export const session3Slides: Slide[] = [
  {
    id: 's3-title',
    notes: 'Session 3 opener. Sandwich harm first, then RAILGUN fix, then live demo.',
    content: (
      <>
        <p className="eyebrow">Session 3 · RAILGUN Live Demo</p>
        <h1 className="display">Private Payments on Ethereum</h1>
        <p className="lead">From sandwich harm → shielded pool → live Sepolia demo</p>
        <p className="sub">
          Deck:{' '}
          <a href="https://road-to-devcon.vercel.app/?session=3" target="_blank" rel="noreferrer">
            road-to-devcon.vercel.app/?session=3
          </a>
          {' · '}Repo: github.com/vg239/kohaku-railgun
        </p>
      </>
    ),
  },
  {
    id: 's3-problem',
    notes: 'Bridge from Session 1 sandwich lab. Intent visible while pending.',
    content: (
      <>
        <p className="eyebrow">Recap · why privacy</p>
        <h2 className="title">Public mempool = public intent</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Normal swap (sandwich lab)</h3>
            <ol className="steps">
              <li>Victim broadcasts swap → sits in mempool</li>
              <li>Bot reads: pair, amount, slippage, address</li>
              <li>Front-run → victim fills worse → back-run profit</li>
            </ol>
            <p className="sub">Harm: out-traded because intent was visible while pending — not hacked.</p>
          </div>
          <div className="panel ok">
            <h3>Today&apos;s fix</h3>
            <p>Can the network <strong>verify</strong> a transaction without reading <strong>who sent what to whom</strong>?</p>
            <p className="callout" style={{ marginTop: '0.75rem' }}>
              RAILGUN shielded pool on the <strong>same</strong> Ethereum chain — ZK proofs hide intent inside the pool.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-sandwich-viz',
    notes: 'Click 0→3 slowly. Numbers match sandwich-attack lab output exactly.',
    content: (
      <>
        <p className="eyebrow">Sandwich attack · step by step</p>
        <h2 className="title">Pool: 100 WETH / 1M MEME · victim swaps 10 WETH</h2>
        <SandwichViz />
      </>
    ),
  },
  {
    id: 's3-sandwich-flow',
    notes: 'Static recap if you want no clicking. Same numbers as the widget.',
    content: (
      <>
        <p className="eyebrow">Sandwich · the four beats</p>
        <h2 className="title">What happens in the AMM (lab-verified)</h2>
        <ol className="steps">
          <li><strong>Intent</strong> — Victim pending: 10 WETH → MEME. Fair = 90,909 MEME. Min = 81,818 (10% slippage). <em>Public in mempool.</em></li>
          <li><strong>Front-run</strong> — Searcher spends 5 WETH, buys 47,619 MEME. Price drops to ~9,070 MEME/WETH.</li>
          <li><strong>Victim</strong> — Still swaps 10 WETH but only gets 82,815 MEME. Lost 8,093 vs fair. Tx succeeds.</li>
          <li><strong>Back-run</strong> — Searcher sells 47,619 MEME back. Net profit ≈ <strong>0.97 WETH</strong> (970654627539503386 wei).</li>
        </ol>
        <p className="callout">The victim is the filling. The bot is the bread on both sides.</p>
      </>
    ),
  },
  {
    id: 's3-sandwich-why',
    notes: 'Slippage is the budget. Three ingredients.',
    content: (
      <>
        <p className="eyebrow">Why sandwiches work</p>
        <h2 className="title">Three ingredients</h2>
        <ol className="steps">
          <li><strong>Public mempool</strong> — bot sees your pending swap (amount, pair, slippage).</li>
          <li><strong>AMM math</strong> — bot&apos;s trade moves the price (x × y = k).</li>
          <li><strong>Slippage tolerance</strong> — victim accepts up to X% worse; that X is the bot&apos;s budget.</li>
        </ol>
        <p className="callout">Victim tx still succeeds — they just get fewer tokens. That is why it is insidious.</p>
      </>
    ),
  },
  {
    id: 's3-sandwich-lab',
    notes: 'Run sandwich-attack locally. Pause on Victim lost MEME 8093 line.',
    content: (
      <>
        <p className="eyebrow">Sandwich lab · reproduce it</p>
        <h2 className="title">sandwich-attack repo</h2>
        <Code>{`git clone https://github.com/suyash101101/sandwich-attack.git
cd sandwich-attack
forge install foundry-rs/forge-std
forge test -vv

# Terminal A
anvil --port 8545

# Terminal B
forge script script/Sandwich.s.sol:SandwichScript \\
  --broadcast --rpc-url http://127.0.0.1:8545 -vv`}</Code>
        <p className="sub" style={{ marginTop: '0.75rem' }}>Expected output:</p>
        <Code>{`=== VICTIM INTENT (PUBLIC in mempool) ===
Swap 10 WETH -> MEME, minOut 81818

=== VICTIM EXECUTES ===
Victim got MEME       82815
Fair would have been  90909
Victim lost MEME      8093

=== BACK-RUN ===
Searcher profit (wei)  970654627539503386  (~0.97 WETH)`}</Code>
      </>
    ),
  },
  {
    id: 's3-one-chain',
    notes: 'Critical: NOT a new blockchain. Same nodes, same blocks.',
    content: (
      <>
        <p className="eyebrow">Architecture</p>
        <h2 className="title">One Ethereum — not a separate world</h2>
        <Code>{`Same Sepolia Ethereum (one chain, one mempool, one block space)
├── Your 0x wallet              (public — Etherscan)
├── Public mempool                (bots read swap intent here)
└── RAILGUN smart contracts       (shielded pool INSIDE the chain)
         └── encrypted notes + Merkle tree + ZK verifier`}</Code>
        <p className="callout">Private ≠ off-chain. Every node runs the same verifier and updates the same contract storage.</p>
      </>
    ),
  },
  {
    id: 's3-0x-0zk',
    notes: 'Two identities on same chain. 0x pays gas for shield. 0zk holds notes.',
    content: (
      <>
        <p className="eyebrow">Two address types</p>
        <h2 className="title">0x vs 0zk — what each one is</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>0x… (public Ethereum address)</h3>
            <ul>
              <li>Normal wallet — MetaMask, hardware wallet, test key in <code>.env</code></li>
              <li>Holds public ETH + ERC-20 (USDC on Sepolia)</li>
              <li>Every tx visible on Etherscan + readable in mempool</li>
              <li><strong>Shield</strong> is signed from here (you pay gas)</li>
            </ul>
            <p className="mono dim" style={{ marginTop: '0.5rem' }}>Example: 0xc22c…460BD</p>
          </div>
          <div className="panel ok">
            <h3>0zk… (RAILGUN private address)</h3>
            <ul>
              <li>Created by <code>wallet.create()</code> — not imported from MetaMask</li>
              <li>Derived from a random mnemonic stored locally by Kohaku SDK</li>
              <li>Balance = encrypted <strong>notes</strong> inside the pool, not a public ERC-20 mapping</li>
              <li><strong>Transfer</strong> is 0zk → 0zk only (private)</li>
            </ul>
            <p className="mono dim" style={{ marginTop: '0.5rem' }}>Example: 0zk1qyj9wpk7vgdrg…fua5dp</p>
          </div>
        </div>
        <p className="callout"><strong>Not the same thing:</strong> your 0x address is public. Your 0zk address is your identity inside the shielded pool. You need both for the full flow.</p>
      </>
    ),
  },
  {
    id: 's3-three-verbs',
    notes: 'Memorize: shield in, transfer inside, unshield out.',
    content: (
      <>
        <p className="eyebrow">Three operations</p>
        <h2 className="title">Shield → Transfer → Unshield</h2>
        <Code>{`shield     0xYou  ──▶  pool       (PUBLIC deposit — visible on Etherscan)
transfer   0zkYou ──▶  0zkBob     (PRIVATE — mempool sees proof bytes only)
unshield   0zkYou ──▶  0xAnyone   (PUBLIC exit — amount/recipient visible)`}</Code>
        <div className="repo-grid" style={{ marginTop: '1rem' }}>
          <div className="repo-card">
            <div className="tag">shield</div>
            <p>Public USDC → RAILGUN contract. Auto-approves ERC-20 if needed. Creates encrypted note at your 0zk.</p>
          </div>
          <div className="repo-card">
            <div className="tag">transfer</div>
            <p>0zk → 0zk. ZK proof on laptop. Broadcaster submits. Sender/recipient/amount hidden.</p>
          </div>
          <div className="repo-card">
            <div className="tag">unshield</div>
            <p>Prove note ownership. USDC sent to any 0x. Exit visible; shield link blurred by anonymity set.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-shield-detail',
    notes: 'After shield: USDC in contract, note for 0zk. Walk through Alice 10 USDC example.',
    content: (
      <>
        <p className="eyebrow">Step 1 · Shield</p>
        <h2 className="title">Public → private (deposit)</h2>
        <ol className="steps">
          <li>Alice has <strong>10 USDC</strong> in <code>0xAlice</code> + ETH for gas</li>
          <li><code>wallet.create()</code> → her <code>0zkAlice</code> identity (no tx yet)</li>
          <li><code>shield(10 USDC)</code> → approve USDC (if needed) + Sepolia tx from <code>0xAlice</code></li>
          <li>Contract takes USDC, writes encrypted <strong>note</strong> (commitment) in Merkle tree</li>
        </ol>
        <p className="callout"><strong>Visible:</strong> Alice deposited into RAILGUN. <strong>Hidden:</strong> note secrets — outsiders see a hash leaf, not &quot;Alice 10 USDC&quot;.</p>
      </>
    ),
  },
  {
    id: 's3-note-merkle',
    notes: 'Note = sealed envelope. Merkle tree = contract ledger of commitments. All nodes same root.',
    content: (
      <>
        <p className="eyebrow">Inside the pool</p>
        <h2 className="title">Notes &amp; Merkle tree</h2>
        <Code>{`Merkle ROOT  ← stored in RAILGUN contract (every node agrees)
    ├── hash
    ├── hash
    └── leaf H  ← Alice's note commitment (not plaintext balance)

Note = bearer claim: only whoever holds the secret can spend it.`}</Code>
        <p className="sub">Shield adds a leaf. Transfer replaces leaves (spend old + create new). Unshield destroys note, sends ERC-20 out.</p>
      </>
    ),
  },
  {
    id: 's3-transfer-detail',
    notes: 'ZK proof on laptop. Broadcaster submits. Verifier on every node.',
    content: (
      <>
        <p className="eyebrow">Step 2 · Transfer</p>
        <h2 className="title">0zk → 0zk (private send)</h2>
        <ol className="steps">
          <li>Alice splits note: <strong>4 USDC → 0zkBob</strong>, <strong>6 change → 0zkAlice</strong></li>
          <li>Laptop generates <strong>ZK proof</strong>: valid spend, no double-spend, balances add up</li>
          <li><strong>Broadcaster</strong> submits tx (pays gas — not Alice&apos;s 0x wallet)</li>
          <li>Every node runs <strong>Verifier.verify(proof)</strong> → updates Merkle root</li>
        </ol>
        <p className="callout">Sandwich bots see proof bytes — not &quot;swap 10 WETH for MEME&quot;. No readable intent to front-run.</p>
      </>
    ),
  },
  {
    id: 's3-unshield-detail',
    notes: 'Exit public. Anonymity set breaks shield→unshield link.',
    content: (
      <>
        <p className="eyebrow">Step 3 · Unshield</p>
        <h2 className="title">Private → public (withdraw)</h2>
        <ol className="steps">
          <li>Alice proves she owns a note worth <strong>6 USDC</strong></li>
          <li>Requests release to <code>0xCharlie</code></li>
          <li>Verifier accepts proof → contract sends real USDC to Charlie</li>
          <li>Etherscan shows USDC at Charlie — hard to link to Alice&apos;s original shield if pool is busy</li>
        </ol>
      </>
    ),
  },
  {
    id: 's3-broadcaster',
    notes: 'Broadcaster only for transfer/unshield. NOT for shield. Cannot steal — verifier rejects bad proofs.',
    content: (
      <>
        <p className="eyebrow">Broadcaster &amp; node sync</p>
        <h2 className="title">Who submits what?</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Shield</h3>
            <p><strong>You</strong> sign from <code>0x</code> → public mempool → all nodes execute</p>
          </div>
          <div className="panel ok">
            <h3>Transfer / Unshield</h3>
            <p><strong>Broadcaster</strong> submits proof-tx, pays gas → all nodes verify same proof</p>
          </div>
        </div>
        <p className="callout">Trust the <strong>verifier math</strong>, not the relayer. Invalid proof → revert. All nodes end with identical contract state.</p>
      </>
    ),
  },
  {
    id: 's3-zk-proof',
    notes: 'Prover heavy on laptop. Verifier cheap on-chain. Chain checks proof not plaintext.',
    content: (
      <>
        <p className="eyebrow">ZK proof</p>
        <h2 className="title">What the chain actually checks</h2>
        <Code>{`Proof says (without revealing secrets):
  ✓ I own an unspent note in the Merkle tree
  ✓ New outputs balance correctly
  ✓ Nullifier is fresh (no double-spend)

Verifier contract on Sepolia: verify(proof) → true/false
Every full node runs the same check in the same block.`}</Code>
      </>
    ),
  },
  {
    id: 's3-kohaku-railgun',
    notes: 'RAILGUN=protocol on chain. Kohaku=SDK. Our repo=four-line wrapper.',
    content: (
      <>
        <p className="eyebrow">Stack</p>
        <h2 className="title">RAILGUN vs Kohaku vs this repo</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>RAILGUN</h3>
            <p>Smart contracts + ZK circuits deployed on Ethereum (Sepolia for us).</p>
          </div>
          <div className="panel">
            <h3>@kohaku-eth/railgun</h3>
            <p>SDK — sync state, build proofs, prepare transactions.</p>
          </div>
        </div>
        <p className="sub" style={{ marginTop: '0.75rem' }}>kohaku-railgun repo wraps Kohaku into <code>wallet · shield · transfer · unshield</code>.</p>
      </>
    ),
  },
  {
    id: 's3-code',
    notes: 'Open examples/demo.ts on GitHub. Live: demo:shield then demo:dry.',
    content: (
      <>
        <p className="eyebrow">Code</p>
        <h2 className="title">Four lines</h2>
        <Code>{`import { wallet, shield, transfer, unshield } from '../src/index.js'

const w = await wallet.create()
await shield({ token: 'USDC', amount: 1000n })
await transfer({ to: '0zk1q...', amount: 500n })
await unshield({ to: '0x...', amount: 250n })`}</Code>
      </>
    ),
  },
  {
    id: 's3-faq-concepts',
    notes: 'Speaker prep — read before class. Press N for notes on any slide.',
    content: (
      <>
        <p className="eyebrow">FAQ · concepts (speaker prep)</p>
        <h2 className="title">Questions students ask</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Architecture</h3>
            <ul>
              <li><strong>Separate chain?</strong> No — RAILGUN is contracts on Sepolia, same nodes/blocks.</li>
              <li><strong>Separate mempool?</strong> No — shield uses public mempool; transfer intent is hidden inside proof.</li>
              <li><strong>Buy shielded USDC?</strong> No — shield public USDC into the pool to create notes.</li>
              <li><strong>Is shield private?</strong> No — deposit tx is public. Privacy starts after shield.</li>
              <li><strong>Is unshield private?</strong> Exit amount + recipient 0x are public; link to your shield is blurred.</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>0x vs 0zk</h3>
            <ul>
              <li><strong>0x</strong> = normal wallet. Holds ETH/USDC. Signs shield tx. Visible everywhere.</li>
              <li><strong>0zk</strong> = Railgun identity from <code>wallet.create()</code>. Holds notes, not public ERC-20.</li>
              <li><strong>Can I send 0x → 0zk directly?</strong> No — must shield first, then transfer inside pool.</li>
              <li><strong>Same person?</strong> Yes — one human, two identities on the same chain.</li>
              <li><strong>New 0zk every run?</strong> Yes in starter — random mnemonic each <code>wallet.create()</code> unless you persist storage.</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-faq-ops',
    notes: 'Operational FAQ — faucets, keys, live demo limits.',
    content: (
      <>
        <p className="eyebrow">FAQ · setup &amp; live demo</p>
        <h2 className="title">Before you run it</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Common mistakes</h3>
            <ul>
              <li><strong>PRIVATE_KEY in .env</strong> = secret key (0x + 64 hex). <em>Not</em> your public 0x address.</li>
              <li><strong>Need both</strong> Sepolia ETH (gas) + Sepolia USDC (shield amount).</li>
              <li><strong>Allowance error?</strong> Repo auto-approves USDC before shield — pull latest main.</li>
              <li><strong>transfer/unshield live fails?</strong> Starter has no bundler — use <code>npm run demo:dry</code> to explain.</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Security &amp; trust</h3>
            <ul>
              <li><strong>Can broadcaster steal?</strong> No — bad proof rejected by verifier on every node.</li>
              <li><strong>Who pays gas for transfer?</strong> Broadcaster — so your 0x is not linked to the private send.</li>
              <li><strong>What is a note?</strong> Encrypted bearer claim — like a sealed envelope in the Merkle tree.</li>
              <li><strong>Anonymity set?</strong> More shields in the pool → harder to link your shield to your unshield.</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-faucets',
    notes: 'Students need Sepolia ETH + Sepolia USDC. PRIVATE_KEY is secret hex NOT your 0x address.',
    content: (
      <>
        <p className="eyebrow">Testnet setup</p>
        <h2 className="title">Faucets &amp; wallet config</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Sepolia ETH (gas)</h3>
            <ul>
              <li><a href="https://sepoliafaucet.com/" target="_blank" rel="noreferrer">sepoliafaucet.com</a></li>
              <li><a href="https://www.alchemy.com/faucets/ethereum-sepolia" target="_blank" rel="noreferrer">Alchemy Sepolia faucet</a></li>
              <li><a href="https://faucet.quicknode.com/ethereum/sepolia" target="_blank" rel="noreferrer">QuickNode Sepolia</a></li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Sepolia USDC (shield demo)</h3>
            <ul>
              <li><a href="https://faucet.circle.com/" target="_blank" rel="noreferrer">Circle faucet</a> — test USDC</li>
            </ul>
            <p className="sub">Token: <code>0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238</code></p>
          </div>
        </div>
        <p className="callout"><strong>.env PRIVATE_KEY</strong> = secret key (0x + 64 hex chars). MetaMask → Account details → Show private key.</p>
      </>
    ),
  },
  {
    id: 's3-live-demo',
    notes: 'Live shield on Sepolia. demo:dry for transfer/unshield until bundler wired.',
    content: (
      <>
        <p className="eyebrow">Live demo</p>
        <h2 className="title">Run it on Sepolia</h2>
        <Code>{`git clone https://github.com/vg239/kohaku-railgun.git
cd kohaku-railgun
npm install
cp .env.example .env    # add PRIVATE_KEY + keep DRY_RUN=0

npm run check:wallet    # verify key format + balances
npm run demo:shield     # LIVE — approve + shield 1 USDC (2 Sepolia txs)
npm run demo:dry        # preview transfer + unshield (no broadcast)
npm test`}</Code>
        <p className="sub" style={{ marginTop: '0.75rem' }}>
          Verified shield tx:{' '}
          <a href="https://sepolia.etherscan.io/tx/0x2609c90e0572ffb8bfe723b8d67a26092346aafa88d928c7628be5ecded9d1d3" target="_blank" rel="noreferrer">
            sepolia.etherscan.io/tx/0x2609…d1d3
          </a>
        </p>
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          <div className="panel ok">
            <h3>Works live today</h3>
            <ul>
              <li><code>wallet.create()</code> → 0zk address</li>
              <li><code>shield()</code> → approve + shield txs on Sepolia</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Explain with demo:dry</h3>
            <ul>
              <li><code>transfer()</code> — ZK proof path</li>
              <li><code>unshield()</code> — exit path</li>
            </ul>
            <p className="sub">Full live transfer needs broadcaster/bundler config in Kohaku.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-sandwich-compare',
    notes: 'Close the loop: sandwich harm vs RAILGUN transfer.',
    content: (
      <>
        <p className="eyebrow">Compare</p>
        <h2 className="title">Sandwich lab vs RAILGUN transfer</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Sandwich victim (Session 1 lab)</h3>
            <ul>
              <li>Intent: swap 10 WETH → MEME</li>
              <li>Visible in mempool while pending</li>
              <li>Bot profits ~0.97 WETH — victim loses 8,093 MEME</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>RAILGUN transfer</h3>
            <ul>
              <li>Intent: send USDC to 0zkBob</li>
              <li>Mempool sees proof bytes — not readable swap intent</li>
              <li>Verifier checks math — sandwich bots blind</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-end',
    notes: 'Wrap. Point to repo, Etherscan shield tx, and deck URL.',
    content: (
      <>
        <p className="eyebrow">Wrap</p>
        <h1 className="display">Same chain. Hidden intent inside the pool.</h1>
        <p className="lead">Sandwich harm showed public intent. Shield deposits publicly. Transfer privately. Unshield exits publicly. ZK proofs keep the middle honest and unreadable.</p>
        <div className="rule" />
        <p className="sub">
          github.com/vg239/kohaku-railgun ·{' '}
          <a href="https://road-to-devcon.vercel.app/?session=3" target="_blank" rel="noreferrer">
            road-to-devcon.vercel.app/?session=3
          </a>
        </p>
      </>
    ),
  },
]
