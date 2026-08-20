import type { ReactNode } from 'react'
import {
  BytecodePipeViz,
  ChainGrowViz,
  GossipViz,
  MempoolViz,
  MiningViz,
  NodeNetworkViz,
  PosStakeViz,
  SandwichViz,
  TxConfirmFlowViz,
} from '../viz/Widgets'

export type Slide = {
  id: string
  notes: string
  content: ReactNode
}

function Code({ children }: { children: string }) {
  return <pre className="code">{children}</pre>
}

export const session1Slides: Slide[] = [
  {
    id: 'title',
    notes: 'Welcome. Theme is private apps on Ethereum. Energy high. This is a live deck, click the widgets.',
    content: (
      <>
        <p className="eyebrow">NITK Surathkal · Workshop series</p>
        <h1 className="display">Road to Devcon</h1>
        <p className="lead">
          Make <span className="accent">Private Apps</span> using Ethereum
        </p>
        <div className="rule" />
        <p className="eyebrow" style={{ color: 'var(--pink)' }}>
          Session 1
        </p>
        <h2 className="title" style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.5rem)' }}>
          Ethereum, Mempools and Why Privacy Matters
        </h2>
      </>
    ),
  },
  {
    id: 'arc',
    notes: 'Preview the story once. We start in 2008, not in jargon.',
    content: (
      <>
        <p className="eyebrow">The story we will tell</p>
        <h2 className="title">From a crisis to a world computer</h2>
        <ol className="big-list">
          <li>
            <span className="n">01</span>
            <span>2008: trust in banks cracks</span>
          </li>
          <li>
            <span className="n">02</span>
            <span>Satoshi, Bitcoin, blockchain, Proof of Work</span>
          </li>
          <li>
            <span className="n">03</span>
            <span>Mempool: the public waiting room (with mining)</span>
          </li>
          <li>
            <span className="n">04</span>
            <span>What was missing: compute → Ethereum</span>
          </li>
          <li>
            <span className="n">05</span>
            <span>PoS, smart contracts, Solidity</span>
          </li>
          <li>
            <span className="n">06</span>
            <span>MEV, sandwiches, privacy, your labs</span>
          </li>
        </ol>
      </>
    ),
  },

  // ---- 2008 ----
  {
    id: '2008',
    notes: 'Paint the year. Housing crash, banks wobble, bailouts on the news.',
    content: (
      <>
        <p className="eyebrow">Chapter 1 · The break</p>
        <h1 className="display">2008</h1>
        <p className="lead">The financial crisis hits. Markets seize. Banks that felt unbreakable suddenly look fragile.</p>
      </>
    ),
  },
  {
    id: 'faith',
    notes: 'Investors and ordinary people both feel it. Deposits, jobs, homes.',
    content: (
      <>
        <p className="eyebrow">Faith cracks</p>
        <h2 className="title">People lose trust in the middlemen</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>What banks were</h3>
            <ul>
              <li>Keep your money</li>
              <li>Keep the official ledger</li>
              <li>Decide who can move value</li>
            </ul>
          </div>
          <div className="panel">
            <h3>What it felt like</h3>
            <ul>
              <li>Risk hidden until it exploded</li>
              <li>Bailouts for institutions</li>
              <li>Losses for everyday people</li>
            </ul>
          </div>
        </div>
        <p className="callout">If the ledger lives inside institutions that can fail, who do you trust with truth?</p>
      </>
    ),
  },
  {
    id: 'question',
    notes: 'This question opens Satoshi. Do not name Bitcoin yet.',
    content: (
      <>
        <p className="eyebrow">The question in the air</p>
        <h2 className="title">
          Can money move on the internet <span className="accent">without</span> trusting a bank to keep the books?
        </h2>
        <p className="sub">That question is an engineering problem, not just a slogan.</p>
      </>
    ),
  },

  // ---- Satoshi ----
  {
    id: 'satoshi',
    notes: 'Whitepaper as a response. No mythology.',
    content: (
      <>
        <p className="eyebrow">Chapter 2 · An answer appears</p>
        <h2 className="title">October 2008: a paper lands</h2>
        <p className="lead">
          Satoshi Nakamoto publishes <span className="accent">Bitcoin: A Peer-to-Peer Electronic Cash System</span>.
        </p>
        <p className="sub">Idea: a ledger shared across the internet. No single company owns the official copy.</p>
      </>
    ),
  },
  {
    id: 'whitepaper-idea',
    notes: 'Three bullets only.',
    content: (
      <>
        <p className="eyebrow">Core promise</p>
        <h2 className="title">Peer-to-peer electronic cash</h2>
        <ol className="steps">
          <li>Send value online like email: person to person.</li>
          <li>No bank required to approve the send.</li>
          <li>Everyone can verify the history. No one can quietly rewrite it.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'bitcoin-born',
    notes: '2009 genesis. Keep short.',
    content: (
      <>
        <p className="eyebrow">Bitcoin arrives</p>
        <h2 className="title">2009: the network goes live</h2>
        <p className="lead">Bitcoin is not only a coin. It is a running system: messages, computers, and a growing public history.</p>
        <p className="callout">To understand the coin, you must understand the <span className="accent">blockchain</span>.</p>
      </>
    ),
  },

  // ---- Blockchain ----
  {
    id: 'what-chain',
    notes: 'Define blockchain simply.',
    content: (
      <>
        <p className="eyebrow">Chapter 3 · Blockchain</p>
        <h2 className="title">What is a blockchain?</h2>
        <p className="lead">A shared notebook of transactions, split into pages called blocks, linked so tampering shows.</p>
        <div className="grid-2">
          <div className="panel">
            <h3>Transaction</h3>
            <p>A signed message: I send value to you. Signature proves it came from the owner of those funds.</p>
          </div>
          <div className="panel">
            <h3>Block</h3>
            <p>A batch of transactions packaged together. The next official page of history.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'chain-grow',
    notes: 'Click add block a few times.',
    content: (
      <>
        <p className="eyebrow">How pages lock together</p>
        <h2 className="title">Each block points to the one before it</h2>
        <ChainGrowViz />
      </>
    ),
  },
  {
    id: 'who-writes',
    notes: 'Problem before PoW name.',
    content: (
      <>
        <p className="eyebrow">The hard part</p>
        <h2 className="title">Who is allowed to write the next page?</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>If anyone can write</h3>
            <p>Cheaters invent free money. Chaos.</p>
          </div>
          <div className="panel danger">
            <h3>If one company writes</h3>
            <p>We are back to a bank-shaped middleman.</p>
          </div>
        </div>
        <p className="callout">Bitcoin uses a race: make writing costly, make checking easy. That race is Proof of Work.</p>
      </>
    ),
  },

  // ---- PoW + Mempool together ----
  {
    id: 'pow',
    notes: 'Name PoW after the problem.',
    content: (
      <>
        <p className="eyebrow">Chapter 4 · Proof of Work + the waiting room</p>
        <h2 className="title">Proof of Work (PoW)</h2>
        <ol className="steps">
          <li>Special computers called miners try to solve a hard puzzle.</li>
          <li>First valid solution wins the right to publish the next block.</li>
          <li>Other computers check the solution. If valid, they copy that block.</li>
          <li>Cheating means redoing enormous amounts of work.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'mining-viz',
    notes: 'Click Mine several times. Point at waiting room clearing.',
    content: (
      <>
        <p className="eyebrow">Live demo</p>
        <h2 className="title">Watch a block get mined</h2>
        <MiningViz />
      </>
    ),
  },
  {
    id: 'nonce',
    notes: 'Explain the puzzle knob. Nonce = number used once.',
    content: (
      <>
        <p className="eyebrow">What the miners are actually doing</p>
        <h2 className="title">The nonce is the dial they twist</h2>
        <ol className="steps">
          <li>
            A candidate block has transactions + a link to the previous block + a field called the <strong>nonce</strong> (number used once).
          </li>
          <li>Miners change the nonce again and again and hash the whole block header.</li>
          <li>They need a hash that is rare enough (enough leading zeros). That is the puzzle.</li>
          <li>First valid nonce wins. Others verify the hash in a moment. Hard to find, easy to check.</li>
        </ol>
        <p className="callout">In the mining demo, those rising hash counters are stand-ins for nonce attempts. Real Bitcoin mining does this at enormous scale.</p>
      </>
    ),
  },
  {
    id: 'mempool-name',
    notes: 'Mempool HERE with mining, not later.',
    content: (
      <>
        <p className="eyebrow">Same chapter · the waiting room</p>
        <h2 className="title">
          Before a miner picks your transaction, it sits in the <span className="accent">mempool</span>
        </h2>
        <p className="lead">Memory pool: pending transactions that are not in a block yet.</p>
        <p className="sub">They travel by gossip across nodes. Many eyes can see them while they wait.</p>
      </>
    ),
  },
  {
    id: 'gas-early',
    notes: 'Yes: introduce fees/gas HERE before the fee auction viz.',
    content: (
      <>
        <p className="eyebrow">Paying to enter the next page</p>
        <h2 className="title">Fees (and later, gas) are your bid</h2>
        <ol className="steps">
          <li>Block space is scarce. Not every pending tx fits in the next block.</li>
          <li>You attach a fee tip. Higher tip = more attractive to whoever builds the block.</li>
          <li>On Ethereum this meter is called <strong>gas</strong>: you pay for computation and for space.</li>
          <li>Same idea you are about to click: highest fees usually enter first.</li>
        </ol>
        <p className="callout">Gas also stops infinite loops from freezing the shared computer. Fee auction + anti-spam in one mechanism.</p>
      </>
    ),
  },
  {
    id: 'mempool-viz',
    notes: 'Spawn and mine. Fees already introduced.',
    content: (
      <>
        <p className="eyebrow">Live mempool</p>
        <h2 className="title">Fees decide who enters the next block</h2>
        <MempoolViz />
      </>
    ),
  },
  {
    id: 'gossip',
    notes: 'Click Broadcast. This answers how mempools sync.',
    content: (
      <>
        <p className="eyebrow">How it goes live on every node</p>
        <h2 className="title">Gossip: there is no single mempool server</h2>
        <GossipViz />
      </>
    ),
  },
  {
    id: 'ledger-sync',
    notes: 'Clarify simultaneous vs same result.',
    content: (
      <>
        <p className="eyebrow">How the shared ledger updates</p>
        <h2 className="title">Not magic simultaneity. Same rules, same result.</h2>
        <ol className="steps">
          <li>
            <strong>Pending:</strong> many nodes independently hold copies of the mempool after gossip (seconds, not one global database write).
          </li>
          <li>
            <strong>Sealed:</strong> a miner/validator publishes a block. Peers check it (PoW hash or PoS rules).
          </li>
          <li>
            <strong>Apply:</strong> every full node re-executes the txs locally and updates its own copy of state.
          </li>
          <li>
            <strong>Agree:</strong> honest nodes following the same rules land on the same balances. That agreement is the ledger.
          </li>
        </ol>
        <p className="callout">They do not share one RAM chip. They converge because the protocol is deterministic: same inputs → same outputs.</p>
      </>
    ),
  },
  {
    id: 'mempool-public',
    notes: 'Uncomfortable fact. Sets up MEV later.',
    content: (
      <>
        <p className="eyebrow">Why this matters already</p>
        <h2 className="title">Pending usually means public</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Observers can see</h3>
            <ul>
              <li>Where value is going</li>
              <li>How much you bid in fees</li>
              <li>Which app you are about to use</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Remember this</h3>
            <p>We will return to this surface when we talk about MEV and privacy. The waiting room is the leak.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pow-recap',
    notes: 'Bridge to the gap.',
    content: (
      <>
        <p className="eyebrow">Checkpoint</p>
        <h2 className="title">What Bitcoin nailed</h2>
        <ol className="steps">
          <li>Shared history without a single ledger owner.</li>
          <li>PoW (nonce grinding) to decide the next page.</li>
          <li>A gossiped public mempool as the on-ramp into blocks.</li>
        </ol>
        <p className="callout">So what was still missing?</p>
      </>
    ),
  },

  // ---- Gap / Ethereum ----
  {
    id: 'missing',
    notes: 'Compute gap.',
    content: (
      <>
        <p className="eyebrow">Chapter 5 · The missing piece</p>
        <h2 className="title">Bitcoin moves money. It is awkward as a full app platform.</h2>
        <p className="lead">People wanted loans, exchanges, games, organizations... programs that move value with rules.</p>
        <p className="sub">You can bolt some logic onto Bitcoin, but a general purpose computer on a shared ledger was the next leap.</p>
      </>
    ),
  },
  {
    id: 'vitalik',
    notes: 'Vitalik / Ethereum intro.',
    content: (
      <>
        <p className="eyebrow">Ethereum</p>
        <h2 className="title">Vitalik Buterin proposes a world computer</h2>
        <p className="lead">
          Keep the shared ledger idea. Add a shared place to run <span className="accent">code</span>, not only balances.
        </p>
        <p className="sub">Ethereum launches as a network where apps and assets live in the same public state.</p>
      </>
    ),
  },
  {
    id: 'eth-solved',
    notes: 'What it solved.',
    content: (
      <>
        <p className="eyebrow">What Ethereum unlocked</p>
        <h2 className="title">Programmable value</h2>
        <div className="grid-2">
          <div className="panel ok">
            <h3>Smart contracts</h3>
            <p>Programs stored on the chain. The network runs them the same way everywhere.</p>
          </div>
          <div className="panel ok">
            <h3>One settlement layer</h3>
            <p>Tokens, exchanges, NFTs, DAOs can all settle on the same shared computer.</p>
          </div>
        </div>
        <p className="callout">Money + rules + apps, without handing the official database to one company.</p>
      </>
    ),
  },
  {
    id: 'keys',
    notes: 'Accounts without banking login.',
    content: (
      <>
        <p className="eyebrow">How you show up on Ethereum</p>
        <h2 className="title">Keys, not usernames</h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Private key</h3>
            <p>Secret number. Signs transactions. Lose it = funds gone. Leak it = funds stolen. Never screenshot. Never paste in Discord.</p>
          </div>
          <div className="panel ok">
            <h3>Public address (EOA)</h3>
            <p>Derived from the private key. Safe to share. Looks like 0xabc... Safe to receive funds here.</p>
          </div>
        </div>
        <p className="sub">EOA = Externally Owned Account. A human key, not contract code.</p>
      </>
    ),
  },
  {
    id: 'keys-deep',
    notes: 'Seed phrase vs private key vs address.',
    content: (
      <>
        <p className="eyebrow">Three layers people confuse</p>
        <h2 className="title">Seed phrase → keys → address</h2>
        <ol className="steps">
          <li>
            <strong>Seed / recovery phrase</strong> (12 or 24 words): master backup. Controls every account the wallet derives.
          </li>
          <li>
            <strong>Private key</strong>: one account's signing secret (derived from the seed).
          </li>
          <li>
            <strong>Address</strong>: public id others use to pay you.
          </li>
        </ol>
        <p className="callout">If someone has your seed, they have everything. Treat it like the PIN + ATM card + house key combined.</p>
      </>
    ),
  },
  {
    id: 'metamask',
    notes: 'Live MetaMask walkthrough if projector allows.',
    content: (
      <>
        <p className="eyebrow">Your first wallet</p>
        <h2 className="title">MetaMask + Sepolia test ETH</h2>
        <ol className="steps">
          <li>Install MetaMask (browser extension). Create a new wallet. Write the seed on paper offline.</li>
          <li>Switch network to <strong>Sepolia</strong> (Ethereum test network). Fake money only.</li>
          <li>Copy your address. Use a Sepolia faucet to mint / drip test ETH.</li>
          <li>Send a tiny amount to a friend. Open the tx on Sepolia Etherscan.</li>
        </ol>
        <p className="callout">Never put mainnet money on a workshop seed. Throwaway wallet only.</p>
      </>
    ),
  },
  {
    id: 'tx-path',
    notes: 'Path into mempool again briefly.',
    content: (
      <>
        <p className="eyebrow">A transaction on Ethereum</p>
        <h2 className="title">From intent to waiting room</h2>
        <ol className="steps">
          <li>You choose an action: send ETH or call a contract.</li>
          <li>Your wallet builds a transaction and signs it with your key.</li>
          <li>It sends that signed message to a node.</li>
          <li>The node gossips it. It enters the mempool.</li>
          <li>A block producer includes it. Every node executes it.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'evm-where',
    notes: 'Critical: where is the CPU. Click Run.',
    content: (
      <>
        <p className="eyebrow">Where is the CPU?</p>
        <h2 className="title">
          The <span className="accent">EVM</span> lives on every full node
        </h2>
        <NodeNetworkViz />
      </>
    ),
  },
  {
    id: 'gas',
    notes: 'Short recap. Next slide splits base fee vs tip (EIP-1559).',
    content: (
      <>
        <p className="eyebrow">Gas again (Ethereum)</p>
        <h2 className="title">Same fee auction, now metering code</h2>
        <ol className="steps">
          <li>Every EVM opcode costs gas. Complex contracts cost more.</li>
          <li>You pay <strong>gas used × gas price</strong>. Wallets help you set the price.</li>
          <li>Failed calls can still burn gas. Loops can empty a wallet if unbounded.</li>
        </ol>
        <p className="sub">Since EIP-1559, that “gas price” splits into <strong>base fee</strong> + <strong>tip</strong> — next slide.</p>
      </>
    ),
  },
  {
    id: 'eip1559-fees',
    notes: 'Memorize: tip is YOUR bid. Base fee is network-set. Lab uses legacy gasPrice for clarity.',
    content: (
      <>
        <p className="eyebrow">EIP-1559 · how Ethereum fees work today</p>
        <h2 className="title">Base fee + priority tip</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Base fee</h3>
            <ul>
              <li>Set by the <strong>network</strong> per block (goes up when blocks are full).</li>
              <li><strong>Burned</strong> — removed from supply.</li>
              <li>You do not choose it; you must pay at least this much.</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>Priority fee (tip)</h3>
            <ul>
              <li><strong>You choose</strong> this — your bid to jump the queue.</li>
              <li>Goes to the <strong>validator / block builder</strong>.</li>
              <li>Higher tip → more likely to be included <em>soon</em> (and ordered first).</li>
            </ul>
          </div>
        </div>
        <p className="callout">
          <strong>Total ≈ gas used × (base fee + tip).</strong> MetaMask shows “max fee” and “priority fee”. Searchers outbid you on the <span className="accent">tip</span>.
        </p>
        <div className="panel" style={{ marginTop: '0.75rem' }}>
          <h3>In our mempool lab (simplified)</h3>
          <p>We use <strong>legacy</strong> txs with plain <code>gasPrice</code> so you can read the race clearly in <code>txpool_content</code>:</p>
          <ul>
            <li><code>0x3b9aca00</code> = <strong>1 gwei</strong> (low bid)</li>
            <li><code>0xba43b7400</code> = <strong>50 gwei</strong> (high bid)</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'new-gap',
    notes: 'After Ethereum: energy, scale, privacy.',
    content: (
      <>
        <p className="eyebrow">A new gap appears</p>
        <h2 className="title">Ethereum solved programmability. New pains showed up.</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>PoW energy + throughput</h3>
            <p>Securing the chain with heavy mining used lots of energy and limited how many txs fit.</p>
          </div>
          <div className="panel">
            <h3>Privacy</h3>
            <p>Public mempools and public state make verification easy and secrecy hard. That is our course theme.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pos',
    notes: 'Explain then click the interactive.',
    content: (
      <>
        <p className="eyebrow">Chapter 6 · Proof of Stake</p>
        <h2 className="title">Ethereum moved from PoW to PoS</h2>
        <ol className="steps">
          <li>Validators lock (stake) ETH as collateral.</li>
          <li>The protocol picks who proposes the next block (weighted by stake).</li>
          <li>Cheat and you can lose stake. Honesty is economically enforced.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'pos-viz',
    notes: 'Stake, propose, slash live.',
    content: (
      <>
        <p className="eyebrow">Live demo</p>
        <h2 className="title">Stake weight, propose, slash</h2>
        <PosStakeViz />
      </>
    ),
  },

  // ---- Solidity lots ----
  {
    id: 'sc-intro',
    notes: 'Mental model.',
    content: (
      <>
        <p className="eyebrow">Chapter 7 · Smart contracts</p>
        <h2 className="title">A smart contract is a public program with public memory</h2>
        <p className="lead">Deploy once. The code sits at an address. The network will keep running it the same way for everyone.</p>
        <p className="sub">Not a legal PDF. A program the chain is forced to execute.</p>
      </>
    ),
  },
  {
    id: 'sc-pieces',
    notes: 'Four pieces.',
    content: (
      <>
        <p className="eyebrow">Pieces of a contract</p>
        <h2 className="title">State, functions, callers, rules</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>State variables</h3>
            <p>Data stored on-chain. Survives between calls. Everyone can usually read it.</p>
          </div>
          <div className="panel">
            <h3>Functions</h3>
            <p>The actions. Some only read. Some change state and need a real transaction + gas.</p>
          </div>
          <div className="panel">
            <h3>msg.sender</h3>
            <p>The address that signed this call. Your identity for this request.</p>
          </div>
          <div className="panel">
            <h3>require / conditions</h3>
            <p>Checks that must pass. If they fail, the call reverts and state does not change.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sol-counter',
    notes: 'Walk line by line.',
    content: (
      <>
        <p className="eyebrow">Solidity · example 1</p>
        <h2 className="title">A tiny Counter</h2>
        <Code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count; // on-chain memory

    function inc() public {
        count += 1; // costs gas, anyone may call
    }

    function incBy(uint256 n) public {
        require(n > 0, "n must be > 0");
        count += n;
    }
}`}</Code>
      </>
    ),
  },
  {
    id: 'sol-counter-explain',
    notes: 'Explain each part.',
    content: (
      <>
        <p className="eyebrow">What each part means</p>
        <h2 className="title">Reading the Counter</h2>
        <ol className="steps">
          <li>
            <strong>pragma</strong> picks the compiler version family.
          </li>
          <li>
            <strong>uint256 public count</strong> stores a number and auto-creates a free getter.
          </li>
          <li>
            <strong>inc()</strong> changes state, so it must be mined in a transaction.
          </li>
          <li>
            <strong>require</strong> guards bad inputs. Fail = revert.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'sol-call-path',
    notes: 'End to end call.',
    content: (
      <>
        <p className="eyebrow">When you tap Inc in a wallet</p>
        <h2 className="title">What happens under the hood</h2>
        <ol className="steps">
          <li>Wallet encodes a call to the contract address (function selector for inc).</li>
          <li>You sign. Tx enters the mempool.</li>
          <li>Included in a block. Every node runs the EVM against that bytecode.</li>
          <li>Storage slot for count updates. Explorers show the new value.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'sol-types',
    notes: 'Beginner types.',
    content: (
      <>
        <p className="eyebrow">Solidity basics</p>
        <h2 className="title">Types you will see constantly</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>uint256</h3>
            <p>Unsigned integer. Money almost always uses big integers, not decimals.</p>
          </div>
          <div className="panel">
            <h3>address</h3>
            <p>20-byte account or contract id.</p>
          </div>
          <div className="panel">
            <h3>bool / string / bytes</h3>
            <p>Flags and data. Strings cost more gas than tight bytes.</p>
          </div>
          <div className="panel">
            <h3>mapping</h3>
            <p>Hash map from key to value. Backbone of balances.</p>
          </div>
        </div>
        <p className="callout">1 ETH = 10^18 wei. Wallets hide the zeros. Contracts usually do not.</p>
      </>
    ),
  },
  {
    id: 'sol-transfer',
    notes: 'Token as mapping.',
    content: (
      <>
        <p className="eyebrow">Solidity · example 2</p>
        <h2 className="title">Balances are a mapping</h2>
        <Code>{`mapping(address => uint256) public balances;

function transfer(address to, uint256 amt) public {
    require(balances[msg.sender] >= amt, "not enough");
    balances[msg.sender] -= amt;
    balances[to] += amt;
}`}</Code>
        <p className="sub">Sending tokens is subtract + add in public storage. Exchanges swap these mappings. That is what sandwich bots hunt.</p>
      </>
    ),
  },
  {
    id: 'paymasters',
    notes: 'UX future after they know gas.',
    content: (
      <>
        <p className="eyebrow">Better UX on the horizon</p>
        <h2 className="title">Gasless-ish flows and paymasters</h2>
        <ol className="steps">
          <li>Classic UX: user must hold ETH just to pay gas. Harsh for beginners.</li>
          <li>
            <strong>Account abstraction / smart wallets</strong>: account is a contract with richer rules.
          </li>
          <li>
            <strong>Paymaster</strong>: a sponsor can pay gas for the user (app pays, or pay in tokens).
          </li>
        </ol>
        <p className="sub">Know the problem it solves: onboarding without buying ETH first.</p>
      </>
    ),
  },
  {
    id: 'sol-events',
    notes: 'Events with indexed.',
    content: (
      <>
        <p className="eyebrow">Advanced Solidity</p>
        <h2 className="title">Events are a cheap news ticker</h2>
        <Code>{`event Transfer(address indexed from, address indexed to, uint256 amt);

function transfer(address to, uint256 amt) public {
    balances[msg.sender] -= amt;
    balances[to] += amt;
    emit Transfer(msg.sender, to, amt);
}`}</Code>
        <p className="sub">
          <strong>indexed</strong> lets explorers filter logs (max 3 indexed fields). Apps subscribe to events instead of polling storage.
        </p>
      </>
    ),
  },
  {
    id: 'sol-compilation',
    notes: 'solc splits output. Body vs brain map.',
    content: (
      <>
        <p className="eyebrow">Contract internals · compilation</p>
        <h2 className="title">solc turns .sol into two artifacts</h2>
        <div className="grid-2">
          <div className="panel ok">
            <h3>Input</h3>
            <p>Human-readable Solidity (<code>.sol</code>)</p>
          </div>
          <div className="panel">
            <h3>Process</h3>
            <p>Solidity compiler (<strong>solc</strong>) typechecks + compiles</p>
          </div>
          <div className="panel">
            <h3>Output 1 — Bytecode</h3>
            <p>The <strong>body</strong>: executable EVM logic deployed on-chain</p>
          </div>
          <div className="panel">
            <h3>Output 2 — ABI</h3>
            <p>The <strong>brain map</strong>: JSON interface for callers</p>
          </div>
        </div>
        <p className="sub">One source file → compiler → bytecode + ABI. They land in different places after compile.</p>
      </>
    ),
  },
  {
    id: 'sol-source',
    notes: 'SimpleStorage. set costs gas, get is view.',
    content: (
      <>
        <p className="eyebrow">The human-readable code</p>
        <h2 className="title">What you write (.sol)</h2>
        <Code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value; // write — costs gas
    }

    function get() public view returns (uint256) {
        return storedValue; // read — no state change
    }
}`}</Code>
        <p className="sub"><code>forge compile</code> / <code>solc</code> reads this and emits bytecode + ABI into <code>out/</code>.</p>
      </>
    ),
  },
  {
    id: 'bytecode-hex',
    notes: 'Not human readable. This is what gets deployed.',
    content: (
      <>
        <p className="eyebrow">Bytecode · the body</p>
        <h2 className="title">What the EVM actually runs</h2>
        <ol className="steps">
          <li>Long hex string made of <strong>opcodes</strong>: PUSH, ADD, SSTORE, etc.</li>
          <li>Deploy = upload this hex to every node at a contract address.</li>
          <li>Blockchain only stores and executes this — not your <code>.sol</code> file.</li>
        </ol>
        <Code>{`0x608060405234801561001057600080fd5b50600436106100365760003560e01c806360fe47b11461003b5780636d4ce63c14610057575b600080fd5b610055600480360381019061005091906101565b610075565b005b...`}</Code>
        <p className="sub">Opaque without the ABI. You cannot tell <code>set()</code> from <code>get()</code> by staring at hex.</p>
      </>
    ),
  },
  {
    id: 'abi-interface',
    notes: 'ABI packs/unpacks data. 4-byte selectors.',
    content: (
      <>
        <p className="eyebrow">ABI · the language interface</p>
        <h2 className="title">JSON menu for talking to bytecode</h2>
        <ol className="steps">
          <li>Lists function names (<code>set</code>, <code>get</code>), param types, return types.</li>
          <li>Defines how to <strong>pack</strong> and <strong>unpack</strong> calldata.</li>
          <li>Maps human names → 4-byte <strong>function selectors</strong> inside bytecode.</li>
        </ol>
        <p className="callout">Apps never send <code>set(42)</code> as text. They encode calldata using the ABI, then send bytes to the contract address.</p>
      </>
    ),
  },
  {
    id: 'abi-json',
    notes: 'Show get (view) vs set (nonpayable) in JSON.',
    content: (
      <>
        <p className="eyebrow">ABI · translation manual</p>
        <h2 className="title">abi.json for SimpleStorage</h2>
        <Code>{`[
  {
    "name": "get",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "name": "set",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "value", "type": "uint256" }],
    "outputs": []
  }
]`}</Code>
        <p className="sub"><code>get()</code> is a read (view). <code>set(uint256)</code> is a write and costs gas. Wallets and ethers.js read this JSON to build calls.</p>
      </>
    ),
  },
  {
    id: 'abi-why',
    notes: 'Bytecode is a black box without ABI.',
    content: (
      <>
        <p className="eyebrow">Why ABI exists</p>
        <h2 className="title">Bytecode alone is a black box</h2>
        <p className="lead">
          Staring at hex, you cannot tell which bytes are <code>transfer()</code> vs <code>getBalance()</code>. The ABI maps human names to internal selectors.
        </p>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Without ABI</h3>
            <p>Machine code with no labels. You must guess encodings by hand.</p>
          </div>
          <div className="panel ok">
            <h3>With ABI</h3>
            <p>Libraries turn <code>contract.set(42)</code> into the right calldata + know how to decode the return value.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'bytecode',
    notes: 'Click Step through the pipeline.',
    content: (
      <>
        <p className="eyebrow">How it is wired · interactive</p>
        <h2 className="title">Source → solc → bytecode + ABI → network</h2>
        <BytecodePipeViz />
        <p className="sub" style={{ marginTop: '0.75rem' }}>
          Deploy stores <strong>bytecode</strong> at an address. Apps use <strong>ABI + RPC</strong> to call functions.
        </p>
      </>
    ),
  },
  {
    id: 'rpc-portal',
    notes: 'Browser cannot talk P2P. RPC is the portal.',
    content: (
      <>
        <p className="eyebrow">Before we interact</p>
        <h2 className="title">RPC — your portal to the chain</h2>
        <p className="lead">
          The blockchain is a P2P network. Your browser cannot join it directly. An <strong>RPC URL</strong> points at one node (yours, Infura, Alchemy, Anvil) that translates requests.
        </p>
        <div className="grid-2">
          <div className="panel ok">
            <h3>User app</h3>
            <p>React, wallet UI, Foundry script — speaks HTTP/JSON-RPC.</p>
          </div>
          <div className="panel">
            <h3>RPC node</h3>
            <p>One Ethereum node with an API. Forwards reads, submits signed txs.</p>
          </div>
          <div className="panel">
            <h3>Blockchain</h3>
            <p>Thousands of peers. Shared history + state. Your RPC is one window in.</p>
          </div>
          <div className="panel danger">
            <h3>Remember</h3>
            <p>MetaMask does not run a full node in the browser. It talks to an RPC URL you configure.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ethers',
    notes: 'Conductors: ABI + address + RPC. ethers preferred.',
    content: (
      <>
        <p className="eyebrow">Frontend libraries · the conductors</p>
        <h2 className="title">ABI + address + RPC URL → ethers.js</h2>
        <div className="grid-2">
          <div className="panel">
            <h3>Provider</h3>
            <p>Read-only RPC connection. Balances, logs, chain id.</p>
          </div>
          <div className="panel">
            <h3>Signer / Wallet</h3>
            <p>Signs txs. MetaMask injects a signer.</p>
          </div>
          <div className="panel">
            <h3>Contract</h3>
            <p><code>address + ABI + signer</code> → JS methods map to on-chain functions.</p>
          </div>
          <div className="panel ok">
            <h3>Minimal call</h3>
            <p><code>const c = new Contract(addr, abi, signer); await c.set(42);</code></p>
          </div>
        </div>
        <p className="sub">ethers.js (or web3.js) handles JSON-RPC encoding so you do not format raw requests by hand.</p>
      </>
    ),
  },
  {
    id: 'openzeppelin',
    notes: 'Do not roll your own secure primitives.',
    content: (
      <>
        <p className="eyebrow">Do not reinvent secure building blocks</p>
        <h2 className="title">OpenZeppelin</h2>
        <ol className="steps">
          <li>Battle-tested contracts: Ownable, AccessControl, Pausable, ReentrancyGuard...</li>
          <li>Used across the industry. Audited patterns. Still read what you inherit.</li>
          <li>Example: import "@openzeppelin/contracts/access/Ownable.sol";</li>
        </ol>
        <p className="callout">For workshop permissions and safety rails, start from OpenZeppelin instead of blank Solidity.</p>
      </>
    ),
  },
  {
    id: 'sol-gotchas',
    notes: 'Beginner footguns.',
    content: (
      <>
        <p className="eyebrow">Beginner gotchas</p>
        <h2 className="title">Things that surprise everyone</h2>
        <ol className="steps">
          <li>No decimal money type. Use integers and decimals conventions.</li>
          <li>Deployed code is hard to patch. Test like the bug will be forever.</li>
          <li>Public by default culture. Assume storage is visible.</li>
          <li>Failed transactions can still cost gas.</li>
          <li>Unbounded loops can make functions too expensive to call.</li>
        </ol>
      </>
    ),
  },

  // ---- Nodes, RPC, mempool (bridge Solidity → labs) ----
  {
    id: 'nodes-no-server',
    notes: 'After Solidity: where does this code actually run? No single server.',
    content: (
      <>
        <p className="eyebrow">Under the hood · nodes</p>
        <h2 className="title">There is no single Ethereum server</h2>
        <p className="lead">
          Thousands of computers run the same software. Each holds a copy of history and state. They stay in sync because they follow the <span className="accent">same rules</span>.
        </p>
        <p className="sub">Your Counter, your token balances, your swap — every full node stores and re-runs the same result.</p>
      </>
    ),
  },
  {
    id: 'node-types',
    notes: 'Three node types. RPC is what MetaMask hits.',
    content: (
      <>
        <p className="eyebrow">Types of nodes</p>
        <h2 className="title">Full node · RPC node · Validator</h2>
        <div className="grid-2">
          <div className="panel ok">
            <h3>Full node</h3>
            <p>Stores all blocks + current state. Validates every tx. Keeps a local <strong>mempool</strong> copy.</p>
          </div>
          <div className="panel">
            <h3>RPC node</h3>
            <p>Exposes an HTTP API. <strong>MetaMask talks to this.</strong> Infura, Alchemy, or your local Anvil.</p>
          </div>
          <div className="panel">
            <h3>Block builder / validator</h3>
            <p>Picks which pending txs enter the next block. On Ethereum today: Proof of Stake validators.</p>
          </div>
          <div className="panel danger">
            <h3>What each stores</h3>
            <p><strong>Blockchain</strong> = history · <strong>State</strong> = balances &amp; contract vars · <strong>Mempool</strong> = pending txs (temporary)</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'node-flow',
    notes: 'Walk the flow top to bottom. Pause on builder step — MEV hook.',
    content: (
      <>
        <p className="eyebrow">Confirm → Confirmed</p>
        <h2 className="title">The path every transaction takes</h2>
        <TxConfirmFlowViz />
        <p className="callout" style={{ marginTop: '0.85rem' }}>
          Pending txs are visible during steps 2–4. That window is why fee races and sandwich attacks are possible.
        </p>
      </>
    ),
  },
  {
    id: 'mempool-visible',
    notes: 'This is the privacy leak. Point to cast command — live demo in mempool lab.',
    content: (
      <>
        <p className="eyebrow">The mempool · what leaks</p>
        <h2 className="title">
          Pending usually means <span className="accent">public</span>
        </h2>
        <div className="grid-2">
          <div className="panel danger">
            <h3>Visible before confirmation</h3>
            <ul>
              <li>Sender address</li>
              <li>Target contract (which app)</li>
              <li>Calldata (swap amount, function)</li>
              <li>Gas tip (how urgent)</li>
            </ul>
          </div>
          <div className="panel ok">
            <h3>See it live (mempool fee-race lab)</h3>
            <p>While Anvil is waiting to mine a block, run:</p>
            <Code>{`cast rpc txpool_content \\
  --rpc-url http://127.0.0.1:8545`}</Code>
            <p className="sub">Two pending pings with different gas prices — same data bots scrape on mainnet.</p>
          </div>
        </div>
        <p className="callout">Local mempool on your Anvil node is still public to anyone with RPC access. Gossip spreads copies to peers on real networks.</p>
      </>
    ),
  },
  {
    id: 'privacy-crux-slide',
    notes: 'Memorize this line for the meet.',
    content: (
      <>
        <p className="eyebrow">The privacy crux</p>
        <h2 className="title">Intent is visible before it executes</h2>
        <p className="lead">
          Privacy is not only hiding your name. It is hiding <span className="accent">what you plan to do</span> before the chain finalizes it.
        </p>
        <div className="grid-2">
          <div className="panel">
            <h3>Mempool fee-race lab</h3>
            <p>Two pending txs compete on gas tip. You peek the public txpool. Proves visibility + ordering.</p>
          </div>
          <div className="panel danger">
            <h3>Sandwich attack lab</h3>
            <p>Bots read that same pool. Front-run your swap, then back-run for profit.</p>
          </div>
        </div>
      </>
    ),
  },

  // ---- MEV ----
  {
    id: 'mev',
    notes: 'Connect back to early mempool.',
    content: (
      <>
        <p className="eyebrow">Chapter 8 · When the waiting room is hunted</p>
        <h2 className="title">MEV</h2>
        <p className="lead">Maximal Extractable Value: profit from choosing which transactions enter a block and in what order.</p>
        <p className="sub">You already saw the public mempool during mining. Searchers watch that feed for opportunity.</p>
      </>
    ),
  },
  {
    id: 'mev-actors',
    notes: 'Searcher / builder / validator sketch.',
    content: (
      <>
        <p className="eyebrow">Who extracts value</p>
        <h2 className="title">Searchers, builders, proposers</h2>
        <ol className="steps">
          <li>
            <strong>Searchers</strong> scan mempools (and private orderflow) for profitable reorderings.
          </li>
          <li>
            <strong>Builders</strong> assemble full blocks / bundles optimized for fees + MEV.
          </li>
          <li>
            <strong>Proposers / validators</strong> propose the block that earns them rewards (often via builder markets).
          </li>
        </ol>
        <p className="sub">You do not need the full PBS diagram tonight. Remember: ordering is valuable because intent is visible early.</p>
      </>
    ),
  },
  {
    id: 'sandwich',
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
    id: 'sandwich-flow',
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
    id: 'sandwich-why',
    notes: 'Slippage is the budget. Three ingredients.',
    content: (
      <>
        <p className="eyebrow">Why sandwiches work</p>
        <h2 className="title">Three ingredients</h2>
        <ol className="steps">
          <li><strong>Public mempool</strong> — bot sees your pending swap (amount, pair, slippage).</li>
          <li><strong>AMM math</strong> — bot's trade moves the price (x × y = k).</li>
          <li><strong>Slippage tolerance</strong> — victim accepts up to X% worse; that X is the bot's budget.</li>
        </ol>
        <p className="callout">Victim tx still succeeds — they just get fewer tokens. That is why it is insidious.</p>
      </>
    ),
  },
  {
    id: 'privacy',
    notes: 'Theme beat.',
    content: (
      <>
        <p className="eyebrow">Why we are here</p>
        <h2 className="title">Public verification vs human privacy</h2>
        <p className="lead">Open ledgers are great for checking truth. They are rough for salaries, treasuries, and personal intent.</p>
        <p className="callout">
          Same pattern in AI: a prompt is also a message of intent. Leaky mempool, leaky model API. Session 2 starts with Zero Knowledge.
        </p>
      </>
    ),
  },

  // ---- Labs ----
  {
    id: 'labs',
    notes: 'Two repos, one story. Fee-race lab first.',
    content: (
      <>
        <p className="eyebrow">Hands-on · two labs</p>
        <h2 className="title">One story, two proofs</h2>
        <div className="repo-grid">
          <div className="repo-card">
            <div className="tag">Run first · mempool fee-race</div>
            <h3>mempool-mev</h3>
            <p><strong>What it proves:</strong> pending txs are public. Two accounts race on gas tip — higher tip wins inclusion. You inspect the txpool with <code>cast</code>.</p>
            <code>github.com/suyash101101/mempool-mev</code>
          </div>
          <div className="repo-card">
            <div className="tag">Run second · sandwich attack</div>
            <h3>sandwich-attack</h3>
            <p><strong>What it proves:</strong> bots read that same public pool. On a tiny AMM they front-run your swap, let you execute at a worse price, then back-run for profit.</p>
            <code>github.com/suyash101101/sandwich-attack</code>
          </div>
        </div>
        <p className="callout" style={{ marginTop: '1rem' }}>Fee-race lab = the leak. Sandwich lab = who profits from the leak.</p>
      </>
    ),
  },
  {
    id: 'prereq',
    notes: 'Foundry install help.',
    content: (
      <>
        <p className="eyebrow">Before you clone</p>
        <h2 className="title">Prerequisites</h2>
        <ol className="big-list">
          <li>
            <span className="n">01</span>
            <span>Git installed</span>
          </li>
          <li>
            <span className="n">02</span>
            <span>Foundry: curl -L https://foundry.paradigm.xyz | bash then foundryup</span>
          </li>
          <li>
            <span className="n">03</span>
            <span>Check: forge --version and anvil --version</span>
          </li>
          <li>
            <span className="n">04</span>
            <span>Two (or three) terminals ready</span>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'mempool-lab-what',
    notes: 'Explain Ping.sol. Use demo.sh for live — not forge script alone.',
    content: (
      <>
        <p className="eyebrow">Mempool fee-race lab · what it does</p>
        <h2 className="title">mempool-mev — public waiting room</h2>
        <ol className="steps">
          <li>Deploys <strong>Ping.sol</strong> — a tiny counter (harmless target).</li>
          <li>Account #1 sends <code>ping()</code> with <strong>gasPrice = 1 gwei</strong> (low tip).</li>
          <li>Account #2 sends <code>ping()</code> with <strong>gasPrice = 50 gwei</strong> (high tip).</li>
          <li>Both sit in Anvil's txpool — you read them with <code>txpool_content</code>.</li>
          <li>Higher tip is ordered <strong>first</strong> in the block.</li>
        </ol>
        <p className="sub">Real bots watch the same pool for Uniswap swaps — same mechanism, higher stakes.</p>
      </>
    ),
  },
  {
    id: 'mempool-lab-run',
    notes: 'demo.sh is the live path. Terminal C txpool is the money moment.',
    content: (
      <>
        <p className="eyebrow">Mempool fee-race lab · run</p>
        <h2 className="title">mempool-mev</h2>
        <Code>{`git clone https://github.com/suyash101101/mempool-mev.git
cd mempool-mev
forge install foundry-rs/forge-std
forge test -vv

# Terminal A — slow blocks (time to peek)
anvil --block-time 8 --port 8545

# Terminal B — recommended live demo
chmod +x demo.sh && ./demo.sh

# Terminal C (when demo.sh pauses!)
cast rpc txpool_content --rpc-url http://127.0.0.1:8545`}</Code>
      </>
    ),
  },
  {
    id: 'mempool-lab-output',
    notes: 'Point at gasPrice hex. High tip is first in block — not always lastCaller.',
    content: (
      <>
        <p className="eyebrow">Mempool fee-race lab · what to look for</p>
        <h2 className="title">Expected output — checklist</h2>
        <div className="grid-2">
          <div className="panel ok">
            <h3>txpool_content (pending)</h3>
            <ul>
              <li>Two pending <code>ping()</code> txs</li>
              <li>Same <code>to</code> (Ping contract)</li>
              <li><code>gasPrice: 0x3b9aca00</code> → 1 gwei</li>
              <li><code>gasPrice: 0xba43b7400</code> → 50 gwei</li>
            </ul>
          </div>
          <div className="panel danger">
            <h3>After block mines</h3>
            <Code>{`cast tx <LOW_HASH>  --rpc-url ... | grep gasPrice
# gasPrice  1000000000   (1 gwei)

cast tx <HIGH_HASH> --rpc-url ... | grep gasPrice
# gasPrice  50000000000  (50 gwei)`}</Code>
          </div>
        </div>
        <p className="callout">
          <strong>High tip goes first</strong> in the block. <code>lastCaller</code> is whoever pinged <em>last</em> — so it may be the low-tip account if both fit in one block.
        </p>
      </>
    ),
  },
  {
    id: 'sandwich-lab-what',
    notes: 'Three actors: deployer, searcher, victim.',
    content: (
      <>
        <p className="eyebrow">Sandwich attack lab · what it does</p>
        <h2 className="title">sandwich-attack — MEV in action</h2>
        <ol className="steps">
          <li>Deploys <strong>SimpleAMM</strong> (100 WETH / 1M MEME pool).</li>
          <li><strong>Front-run:</strong> searcher buys MEME with 5 WETH (price rises).</li>
          <li><strong>Victim:</strong> swaps 10 WETH for MEME at worse rate.</li>
          <li><strong>Back-run:</strong> searcher sells MEME back (~0.97 WETH profit).</li>
        </ol>
        <p className="sub">Victim intent (amount, pair, slippage) is logged as PUBLIC — same data a bot reads in the mempool.</p>
      </>
    ),
  },
  {
    id: 'sandwich-lab-run',
    notes: 'Sandwich lab commands.',
    content: (
      <>
        <p className="eyebrow">Sandwich attack lab · run</p>
        <h2 className="title">sandwich-attack</h2>
        <Code>{`git clone https://github.com/suyash101101/sandwich-attack.git
cd sandwich-attack
forge install foundry-rs/forge-std
forge test -vv

# Terminal A
anvil --port 8545

# Terminal B
forge script script/Sandwich.s.sol:SandwichScript \\
  --broadcast --rpc-url http://127.0.0.1:8545 -vv`}</Code>
      </>
    ),
  },
  {
    id: 'sandwich-lab-output',
    notes: 'Pause on Victim lost MEME 8093 and profit wei line.',
    content: (
      <>
        <p className="eyebrow">Sandwich attack lab · what to look for</p>
        <h2 className="title">Expected output (verified live)</h2>
        <Code>{`=== VICTIM INTENT (PUBLIC in mempool) ===
Swap 10 WETH -> MEME, minOut 81818

=== FRONT-RUN ===
Searcher bought MEME 47619

=== VICTIM EXECUTES ===
Victim got MEME       82815
Fair would have been  90909
Victim lost MEME      8093

=== BACK-RUN ===
Searcher profit (wei)  970654627539503386  (~0.97 WETH)`}</Code>
        <p className="callout">Tx succeeded. Victim was not hacked — out-traded because swap intent was public while pending.</p>
      </>
    ),
  },
  {
    id: 'hw',
    notes: 'Homework.',
    content: (
      <>
        <p className="eyebrow">Homework</p>
        <h2 className="title">Before Session 2</h2>
        <ol className="big-list">
          <li>
            <span className="n">01</span>
            <span>Finish both labs</span>
          </li>
          <li>
            <span className="n">02</span>
            <span>MetaMask with a throwaway seed</span>
          </li>
          <li>
            <span className="n">03</span>
            <span>Sepolia faucet + one transfer</span>
          </li>
          <li>
            <span className="n">04</span>
            <span>Open the tx on Sepolia Etherscan</span>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'end',
    notes: 'Thanks. Stay for Foundry help.',
    content: (
      <>
        <p className="eyebrow">Next</p>
        <h1 className="display">Session 2</h1>
        <p className="lead">Zero Knowledge: proving without revealing</p>
        <div className="rule" />
        <p className="sub">Deck: road-to-devcon.vercel.app · labs linked in Discord</p>
      </>
    ),
  },
]
