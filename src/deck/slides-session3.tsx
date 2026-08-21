import type { Slide } from './slides-session1'
import { SandwichViz } from '../viz/Widgets'

export const session3Slides: Slide[] = [
  {
    id: 's3-title',
    notes: 'Session 3 — sandwich harm, shared vault analogy, 0x vs 0zk, three steps.',
    content: (
      <>
        <p className="eyebrow">Session 3 · RAILGUN Live Demo</p>
        <h1 className="display">Private Payments on Ethereum</h1>
        <p className="lead">Sandwich harm → shared vault → shield · transfer · unshield</p>
      </>
    ),
  },
  {
    id: 's3-problem',
    notes: 'Intent visible in mempool while pending.',
    content: (
      <>
        <p className="eyebrow">The problem</p>
        <h2 className="title">Public mempool = public intent</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Normal swap</h3>
            <ol className="steps">
              <li>You broadcast a swap — it waits in the mempool</li>
              <li>Bots read amount, pair, and slippage</li>
              <li>Front-run → you fill at a worse price → bot profits</li>
            </ol>
            <p className="sub">You were not hacked. Your intent was public while pending.</p>
          </div>
          <div className="panel ok">
            <h3>Today</h3>
            <p>Can the network <strong>verify</strong> a payment is valid without reading <strong>who sent what to whom</strong>?</p>
            <p className="callout" style={{ marginTop: '0.75rem' }}>
              Yes — with a <strong>shared vault</strong> on the same Ethereum chain and a math proof instead of plain text.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-sandwich-viz',
    notes: 'Click 0→3 slowly. Same numbers as the sandwich lab.',
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
    notes: 'Static recap. Victim loses 8093 MEME vs fair price.',
    content: (
      <>
        <p className="eyebrow">Sandwich · four beats</p>
        <h2 className="title">What the bot does</h2>
        <ol className="steps">
          <li><strong>Intent</strong> — Victim wants 10 WETH → MEME. Everyone can read that in the mempool.</li>
          <li><strong>Front-run</strong> — Bot buys first and moves the price.</li>
          <li><strong>Victim</strong> — Still swaps, but gets fewer tokens. Tx succeeds anyway.</li>
          <li><strong>Back-run</strong> — Bot sells and keeps ~0.97 WETH profit.</li>
        </ol>
        <p className="callout">The victim is the filling. The bot is the bread on both sides.</p>
      </>
    ),
  },
  {
    id: 's3-one-chain',
    notes: 'NOT a new blockchain. Vault is a smart contract on Ethereum.',
    content: (
      <>
        <p className="eyebrow">Same Ethereum</p>
        <h2 className="title">One chain — a vault inside it</h2>
        <p className="lead">RAILGUN is not a separate world. It is a <strong>shared vault</strong> built into Ethereum with smart contracts.</p>
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          <div className="panel">
            <h3>Outside the vault</h3>
            <ul>
              <li>Normal wallets and public balances</li>
              <li>Public mempool — bots read swap intent here</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Inside the vault</h3>
            <ul>
              <li>Private balances tied to <strong>0zk</strong> identities</li>
              <li>Moves checked by math — not readable as plain transfers</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-vault-analogy',
    notes: 'Core analogy for the whole session. Repeat this language.',
    content: (
      <>
        <p className="eyebrow">The analogy</p>
        <h2 className="title">Shared vault on Ethereum</h2>
        <ol className="steps">
          <li><strong>Shield</strong> — Walk up publicly. Drop USDC into the vault. Get a private chit tied to your <strong>0zk</strong>.</li>
          <li><strong>Transfer</strong> — Inside the vault, move value to someone else&apos;s <strong>0zk</strong>. Outsiders cannot read who sent how much.</li>
          <li><strong>Unshield</strong> — Prove your chit is valid. Vault pays real USDC out to any public <strong>0x</strong> address.</li>
        </ol>
        <p className="callout">
          The vault is <strong>shared</strong> — many people deposit. That crowd makes it harder to link your deposit to your withdrawal later.
        </p>
      </>
    ),
  },
  {
    id: 's3-0x-0zk',
    notes: 'Street address vs locker inside vault.',
    content: (
      <>
        <p className="eyebrow">Two identities</p>
        <h2 className="title">0x vs 0zk</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>0x — your public wallet</h3>
            <ul>
              <li>Like your <strong>street address</strong> — mail in and out is visible</li>
              <li>Holds public ETH and USDC</li>
              <li>You sign <strong>shield</strong> from here (deposit into vault)</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>0zk — your vault identity</h3>
            <ul>
              <li>Like a <strong>locker number inside the vault</strong> — not visible from the street</li>
              <li>Created when you call <code>wallet.create()</code></li>
              <li>Holds your private chit — not a normal public token balance</li>
              <li><strong>Transfer</strong> is 0zk → 0zk only</li>
            </ul>
          </div>
        </div>
        <p className="callout">Same person, two hats: public <strong>0x</strong> for entering/leaving; private <strong>0zk</strong> for moving inside.</p>
      </>
    ),
  },
  {
    id: 's3-three-verbs',
    notes: 'Three verbs map to vault in / inside / out.',
    content: (
      <>
        <p className="eyebrow">Three steps</p>
        <h2 className="title">Shield → Transfer → Unshield</h2>
        <div className="repo-grid">
          <div className="repo-card">
            <div className="tag">shield</div>
            <p><strong>0x → vault.</strong> Public deposit. Everyone sees you put money in — not how you will spend it inside.</p>
          </div>
          <div className="repo-card">
            <div className="tag">transfer</div>
            <p><strong>0zk → 0zk.</strong> Private move inside the vault. Sandwich bots cannot read the intent.</p>
          </div>
          <div className="repo-card">
            <div className="tag">unshield</div>
            <p><strong>0zk → 0x.</strong> Public exit. Payout is visible; link back to your deposit is hard in a busy vault.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-alice-story',
    notes: 'Walk Alice 10 USDC end to end with vault language only.',
    content: (
      <>
        <p className="eyebrow">End to end</p>
        <h2 className="title">Alice sends 4 USDC to Bob privately</h2>
        <ol className="steps">
          <li>Alice has <strong>10 USDC</strong> in her public <strong>0x</strong> wallet.</li>
          <li>She creates a <strong>0zk</strong> identity — her locker inside the vault.</li>
          <li><strong>Shield 10 USDC</strong> — public deposit. She gets a private chit for 10 inside the vault.</li>
          <li><strong>Transfer 4 USDC</strong> to Bob&apos;s <strong>0zk</strong> — only math is posted; sender and amount stay hidden.</li>
          <li>Alice keeps <strong>6 USDC</strong> change on her <strong>0zk</strong>.</li>
          <li><strong>Unshield 6 USDC</strong> to Charlie&apos;s <strong>0x</strong> — vault pays out publicly; hard to trace back to Alice&apos;s original deposit.</li>
        </ol>
      </>
    ),
  },
  {
    id: 's3-shield-detail',
    notes: 'Deposit is public. Privacy starts inside.',
    content: (
      <>
        <p className="eyebrow">Step 1 · Shield</p>
        <h2 className="title">Walk in publicly, get a chit</h2>
        <p className="lead">Alice drops USDC into the shared vault from her <strong>0x</strong> wallet.</p>
        <ul>
          <li><strong>Visible:</strong> Alice made a deposit into the vault.</li>
          <li><strong>Hidden:</strong> what she will do with it inside — send, hold, or unshield later.</li>
        </ul>
        <p className="callout">Shield is the front door. It is not private — it is how you get a private balance inside.</p>
      </>
    ),
  },
  {
    id: 's3-transfer-detail',
    notes: 'No merkle jargon. Proof = sealed envelope check.',
    content: (
      <>
        <p className="eyebrow">Step 2 · Transfer</p>
        <h2 className="title">Move inside the vault</h2>
        <p className="lead">Alice sends <strong>4 USDC</strong> to Bob&apos;s <strong>0zk</strong> without leaving the vault.</p>
        <ul>
          <li>Her laptop builds a <strong>proof</strong> — like showing the vault &quot;this chit is valid&quot; without opening it.</li>
          <li>A <strong>broadcaster</strong> submits it and pays gas — so Alice&apos;s public <strong>0x</strong> is not tied to the send.</li>
          <li>The network checks the math. If wrong, it rejects. If right, Bob&apos;s locker gets 4 USDC.</li>
        </ul>
        <p className="callout">Mempool sees proof data — not &quot;Alice sends 4 USDC to Bob.&quot; Sandwich bots go blind.</p>
      </>
    ),
  },
  {
    id: 's3-unshield-detail',
    notes: 'Exit is public. Crowd in vault blurs the link.',
    content: (
      <>
        <p className="eyebrow">Step 3 · Unshield</p>
        <h2 className="title">Walk out with a payout</h2>
        <p className="lead">Alice proves her remaining chit and asks the vault to pay <strong>6 USDC</strong> to Charlie&apos;s <strong>0x</strong>.</p>
        <ul>
          <li><strong>Visible:</strong> USDC arrived at Charlie&apos;s public address.</li>
          <li><strong>Hard to link:</strong> many people use the same vault — Alice&apos;s earlier deposit blends into the crowd.</li>
        </ul>
      </>
    ),
  },
  {
    id: 's3-broadcaster',
    notes: 'Messenger posts proof. Vault math is what you trust.',
    content: (
      <>
        <p className="eyebrow">Who submits what?</p>
        <h2 className="title">You vs broadcaster</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Shield</h3>
            <p><strong>You</strong> sign from your public <strong>0x</strong> — normal visible transaction.</p>
          </div>
          <div className="panel ok">
            <h3>Transfer / Unshield</h3>
            <p><strong>Broadcaster</strong> posts the proof and pays gas — your public wallet stays out of it.</p>
          </div>
        </div>
        <p className="callout">Can the broadcaster steal? No — the vault only accepts valid math. Bad proof = rejected.</p>
      </>
    ),
  },
  {
    id: 's3-zk-proof',
    notes: 'Sealed envelope analogy. No tree jargon on slide.',
    content: (
      <>
        <p className="eyebrow">The proof</p>
        <h2 className="title">Verify without reading</h2>
        <p className="lead">A zero-knowledge proof is like handing the vault a sealed envelope that says:</p>
        <ul>
          <li>I really own a valid chit inside</li>
          <li>I am not spending it twice</li>
          <li>The new chits balance correctly</li>
        </ul>
        <p className="callout">Every node runs the same check. They never need to see Alice&apos;s secrets written in plain text.</p>
      </>
    ),
  },
  {
    id: 's3-faq',
    notes: 'Speaker prep — read before class. Press N for notes.',
    content: (
      <>
        <p className="eyebrow">FAQ</p>
        <h2 className="title">Quick answers</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Basics</h3>
            <ul>
              <li><strong>Separate chain?</strong> No — same Ethereum. The vault is a contract on it.</li>
              <li><strong>Buy private USDC?</strong> No — shield public USDC to get a chit inside.</li>
              <li><strong>Is shield private?</strong> No — deposit is public. Privacy is inside the vault.</li>
              <li><strong>0x → 0zk directly?</strong> No — shield first, then transfer inside.</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Trust</h3>
            <ul>
              <li><strong>What is 0zk?</strong> Your locker identity inside the shared vault.</li>
              <li><strong>What is a chit?</strong> Your private claim on value inside — only you can spend it.</li>
              <li><strong>Shared vault?</strong> Many deposits mix together — harder to trace exit to entry.</li>
              <li><strong>Why not sandwich?</strong> Transfer intent is not readable in the mempool.</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-sandwich-compare',
    notes: 'Close the loop.',
    content: (
      <>
        <p className="eyebrow">Compare</p>
        <h2 className="title">Sandwich vs private transfer</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Public swap</h3>
            <ul>
              <li>Intent visible while pending</li>
              <li>Bot front-runs and profits</li>
              <li>You get a worse price — tx still succeeds</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Vault transfer</h3>
            <ul>
              <li>Intent hidden inside the vault</li>
              <li>Network checks proof, not plain text</li>
              <li>Sandwich bots cannot read who sent what</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 's3-end',
    notes: 'Wrap with vault metaphor.',
    content: (
      <>
        <p className="eyebrow">Wrap</p>
        <h1 className="display">Same chain. Shared vault. Hidden moves inside.</h1>
        <p className="lead">
          Public <strong>0x</strong> to enter and leave. Private <strong>0zk</strong> to move inside.
          Shield · transfer · unshield — with math the whole network can check.
        </p>
      </>
    ),
  },
]
