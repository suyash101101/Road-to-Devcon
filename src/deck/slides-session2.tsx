import type { Slide } from './slides-session1'

function Code({ children }: { children: string }) {
  return <pre className="code">{children}</pre>
}

export const session2Slides: Slide[] = [
  {
    id: 's2-title',
    notes: 'Session 2 opener. Connect back to Session 1 mempool leak.',
    content: (
      <>
        <p className="eyebrow">Session 2 · ZK Intuition</p>
        <h1 className="display">
          Zero-Knowledge, Shielded Pools &amp; Provable AI
        </h1>
        <p className="lead">How do we send messages the network can verify — but not read?</p>
        <p className="sub">Hashes · Signatures · ZK Proofs · Shielded Pools · Kohaku SDK · zkML</p>
      </>
    ),
  },
  {
    id: 's2-recap-mempool',
    notes: 'Bridge from Session 1. MEV = bots reading intent in the public mempool.',
    content: (
      <>
        <p className="eyebrow">Recap · Session 1</p>
        <h2 className="title">The mempool is a public group chat</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>What we learned</h3>
            <ul>
              <li>Transactions broadcast publicly before confirmation</li>
              <li>Validators choose tx ordering — for profit</li>
              <li>MEV = bots reading your intentions &amp; front-running</li>
              <li>You sign everything with a private key</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Today&apos;s question</h3>
            <p>Can we send a transaction the network can verify is valid — but <strong>cannot read the contents</strong>?</p>
            <p className="callout" style={{ marginTop: '0.75rem' }}>Answer: Zero-Knowledge Proofs + shielded pools</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's2-zk-intro',
    notes: 'Skip the math. Focus on intuition.',
    content: (
      <>
        <p className="eyebrow">Section 3 · Zero-Knowledge Proofs</p>
        <h2 className="title">The most important primitive in modern crypto</h2>
        <p className="lead">
          A ZK proof lets you convince someone a statement is true — without revealing <em>why</em> it&apos;s true.
        </p>
        <div className="grid-2">
          <div className="panel">
            <h3>Classic example</h3>
            <p>&ldquo;I know the password to this room.&rdquo; Prove it — without saying the password.</p>
          </div>
          <div className="panel">
            <h3>Blockchain example</h3>
            <p>&ldquo;I own enough funds to cover this transfer.&rdquo; Prove it — without revealing my balance.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's2-public-vs-shielded',
    notes: 'Side by side. This is the privacy crux from Session 1 applied to transfers.',
    content: (
      <>
        <p className="eyebrow">Section 4 · On-chain shape</p>
        <h2 className="title">Public vs shielded transfer</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Public ERC-20 transfer</h3>
            <Code>{`transfer(to: 0xABCD..., amount: 1000 USDC)
// Etherscan shows: from, to, amount, token`}</Code>
          </div>
          <div className="panel ok">
            <h3>Shielded transfer</h3>
            <Code>{`transact({ nullifiers, commitments, proof: "0xd7e3..." })
// Chain knows: proof valid ✓
// Chain does NOT know: sender, recipient, amount`}</Code>
          </div>
        </div>
        <p className="callout">The contract verifies the proof. It doesn&apos;t need to read the transaction.</p>
      </>
    ),
  },
  {
    id: 's2-shielded-pool',
    notes: 'Vault analogy. Everyone shares one Merkle tree of encrypted notes.',
    content: (
      <>
        <p className="eyebrow">Section 5 · Shielded pools</p>
        <h2 className="title">The shared vault</h2>
        <p className="lead">Public 0x wallets shield in. Inside the pool, only participants know what happens.</p>
        <Code>{`0xYou  ──shield()──▶  🔒 SHIELDED POOL  ◀──shield()──  0xAlice
                         0zk...you
                         0zk...alice
                              │
                    transfer() private · invisible
                              │
                         unshield() ──▶ 0xAny`}</Code>
        <p className="sub">Observer sees contract balance only — not who owns what inside.</p>
      </>
    ),
  },
  {
    id: 's2-mempool-contrast',
    notes: 'KEY SLIDE — connect Session 1 mempool lab to RAILGUN. Only shield/unshield touch public mempool.',
    content: (
      <>
        <p className="eyebrow">Session 1 → Session 2 bridge</p>
        <h2 className="title">What hits the public mempool?</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Session 1 · Uniswap swap</h3>
            <ul>
              <li>Intent visible while pending</li>
              <li>Bots read amount, pair, slippage</li>
              <li>Sandwich attack possible</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>RAILGUN · three primitives</h3>
            <ul>
              <li><strong>shield</strong> — public tx (deposit visible)</li>
              <li><strong>transfer</strong> — <em>no public mempool</em> · proof only</li>
              <li><strong>unshield</strong> — exit visible, link broken by anonymity set</li>
            </ul>
          </div>
        </div>
        <p className="callout">
          Private ops go through a <strong>broadcaster</strong> — chain sees a proof from a relayer, not your wallet or your intent.
        </p>
      </>
    ),
  },
  {
    id: 's2-gen2-railgun',
    notes: 'Gen-2 advances. View keys for compliance.',
    content: (
      <>
        <p className="eyebrow">Section 5 · Generation 2</p>
        <h2 className="title">Gen-2: RAILGUN — continuous &amp; composable</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Key advances</h3>
            <ul>
              <li>Continuous balances — any amount</li>
              <li>Private 0zk → 0zk transfers</li>
              <li>Full DeFi composability</li>
              <li>View keys for selective disclosure</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Architecture</h3>
            <ul>
              <li>UTXO-style encrypted notes</li>
              <li>Every action produces a ZK proof</li>
              <li>On-chain verifier checks proofs</li>
              <li>Live on Ethereum, Arbitrum, BSC, Polygon</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's2-private-dex',
    notes: 'Private swaps — why sandwich bots lose. This is the demo payoff.',
    content: (
      <>
        <p className="eyebrow">Section 5 · Private DeFi</p>
        <h2 className="title">Private DEX swaps — intent never hits the mempool</h2>
        <ol className="steps">
          <li>You hold shielded USDC inside the pool (0zk balance).</li>
          <li>You prove a swap via RAILGUN&apos;s DeFi adapter — e.g. private Uniswap route.</li>
          <li>Chain verifies the proof. Amount, pair, direction stay hidden.</li>
          <li>Sandwich bots see nothing to front-run — no public swap intent.</li>
        </ol>
        <p className="callout">
          Same leak from Session 1, different fix: don&apos;t broadcast intent — broadcast <strong>proof of valid execution</strong>.
        </p>
      </>
    ),
  },
  {
    id: 's2-primitives',
    notes: 'Three SDK primitives. Session 3 will run these live.',
    content: (
      <>
        <p className="eyebrow">Section 6 · SDK primitives</p>
        <h2 className="title">Three primitives every developer uses</h2>
        <div className="repo-grid">
          <div className="repo-card">
            <div className="tag">01 · shield</div>
            <h3>Public → Private</h3>
            <p>Move public ERC-20 into the shielded pool. Receive an encrypted note.</p>
            <Code>{`shield({ token: 'USDC', amount: 1000n })`}</Code>
          </div>
          <div className="repo-card">
            <div className="tag">02 · transfer</div>
            <h3>0zk → 0zk</h3>
            <p>Send privately inside the pool. Chain sees only a proof.</p>
            <Code>{`transfer({ to: '0zk1q...', amount: 500n })`}</Code>
          </div>
          <div className="repo-card">
            <div className="tag">03 · unshield</div>
            <h3>Private → Public</h3>
            <p>Prove note ownership, withdraw public tokens.</p>
            <Code>{`unshield({ to: '0xPublic', amount: 250n })`}</Code>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's2-kohaku',
    notes: 'Show examples/demo.ts from starter repo. DO NOT run live — Session 3.',
    content: (
      <>
        <p className="eyebrow">Section 6 · Kohaku SDK preview</p>
        <h2 className="title">Meet Kohaku — our Session 3 tool</h2>
        <p className="lead">
          <code>@kohaku-eth/railgun</code> wraps RAILGUN into a developer-friendly TypeScript SDK.
          The starter repo exposes four lines — from <code>examples/demo.ts</code>:
        </p>
        <Code>{`// github.com/vg239/kohaku-railgun/examples/demo.ts
import { wallet, shield, transfer, unshield } from '../src/index.js'

const w = await wallet.create()              // 0zk address
await shield({ token: 'USDC', amount: 1000n })
await transfer({ to: '0zk1q...', amount: 500n })
await unshield({ to: '0x...', amount: 250n })`}</Code>
        <p className="callout">Read <code>examples/demo.ts</code> in the repo · run <code>npm run demo:dry</code> when we code live.</p>
      </>
    ),
  },
  {
    id: 's2-zkml',
    notes: 'Brief zkML beat — EZKL pipeline.',
    content: (
      <>
        <p className="eyebrow">Section 7 · Provable AI</p>
        <h2 className="title">From PyTorch to on-chain proof</h2>
        <ol className="steps">
          <li>Train a small model · export ONNX</li>
          <li><code>ezkl compile-circuit</code> — ONNX → R1CS constraints</li>
          <li><code>ezkl prove</code> — generate proof π (seconds to minutes)</li>
          <li>Deploy Solidity verifier · <code>verify(proof)</code> in milliseconds</li>
        </ol>
        <p className="sub">The image never hits the chain. The model never re-runs on-chain. Only the proof.</p>
      </>
    ),
  },
  {
    id: 's2-homework',
    notes: 'Homework — four concrete steps. demo:dry is the check that setup worked.',
    content: (
      <>
        <p className="eyebrow">Homework</p>
        <h2 className="title">Before the coding session</h2>
        <ol className="big-list">
          <li>
            <span className="n">01</span>
            <span>Read railgun.org/docs — 5 minutes on how shielded pools work</span>
          </li>
          <li>
            <span className="n">02</span>
            <span>Install Node 20+ from nodejs.org · run <code>node --version</code></span>
          </li>
          <li>
            <span className="n">03</span>
            <span>
              Clone github.com/vg239/kohaku-railgun · <code>npm install</code> · <code>npm run setup</code>
            </span>
          </li>
          <li>
            <span className="n">04</span>
            <span>
              Open <code>examples/demo.ts</code> · run <code>npm run demo:dry</code> · then <code>npm test</code>
            </span>
          </li>
        </ol>
        <p className="callout">If <code>demo:dry</code> prints all four steps and exits — you are ready.</p>
      </>
    ),
  },
  {
    id: 's2-end',
    notes: 'Close Session 2.',
    content: (
      <>
        <p className="eyebrow">Session 2 · Wrap</p>
        <h1 className="display">You now know how privacy works on-chain</h1>
        <p className="lead">The network doesn&apos;t need to read your transaction to verify it. A proof is enough.</p>
        <div className="rule" />
        <p className="sub">Starter repo: github.com/vg239/kohaku-railgun · Deck: devcon-site.vercel.app</p>
      </>
    ),
  },
]
