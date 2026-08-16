import type { ReactNode } from 'react'
import {
  BytecodePipeViz,
  ChainGrowViz,
  MempoolViz,
  MiningViz,
  NodeNetworkViz,
  SandwichViz,
} from '../viz/Widgets'

export type Slide = {
  id: string
  notes: string
  content: ReactNode
}

function Code({ children }: { children: string }) {
  return <pre className="code">{children}</pre>
}

export const slides: Slide[] = [
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
    id: 'mempool-viz',
    notes: 'Spawn and mine. This replaces mempool.space.',
    content: (
      <>
        <p className="eyebrow">Live mempool</p>
        <h2 className="title">Fees decide who enters the next block</h2>
        <MempoolViz />
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
          <li>PoW to decide the next page.</li>
          <li>A public mempool as the on-ramp into blocks.</li>
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
          <div className="panel">
            <h3>Private key</h3>
            <p>Secret. Signs transactions. Lose it and the account is gone. Leak it and the account is stolen.</p>
          </div>
          <div className="panel">
            <h3>Address / EOA</h3>
            <p>Public account id derived from the key. Safe to share. Wallet apps (like MetaMask) help you manage keys.</p>
          </div>
        </div>
        <p className="sub">EOA means Externally Owned Account: controlled by a person with a key, not by contract code.</p>
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
    notes: 'Critical: where is the CPU.',
    content: (
      <>
        <p className="eyebrow">Where is the CPU?</p>
        <h2 className="title">
          The <span className="accent">EVM</span> lives on every full node
        </h2>
        <p className="sub">
          EVM = Ethereum Virtual Machine: the shared rulebook for running contract bytecode. Not a single server in one city.
        </p>
        <NodeNetworkViz />
      </>
    ),
  },
  {
    id: 'gas',
    notes: 'Gas as bid.',
    content: (
      <>
        <p className="eyebrow">Paying for shared compute</p>
        <h2 className="title">Gas</h2>
        <p className="lead">Every operation costs gas. You bid for block space and computation.</p>
        <ol className="steps">
          <li>Stops infinite loops from freezing the world computer.</li>
          <li>Pays the people who secure and propose blocks.</li>
          <li>Same fee auction you saw in the mempool simulator.</li>
        </ol>
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
    notes: 'One clear PoS explanation.',
    content: (
      <>
        <p className="eyebrow">Chapter 6 · Proof of Stake</p>
        <h2 className="title">Ethereum moved from PoW to PoS</h2>
        <ol className="steps">
          <li>Validators lock (stake) ETH as collateral.</li>
          <li>The protocol picks who proposes the next block.</li>
          <li>Cheat and you can lose stake. Honesty is economically enforced.</li>
        </ol>
        <p className="callout">Same public ledger idea. Different way to choose the next page. Far less energy than mining puzzles.</p>
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
    id: 'sol-visibility',
    notes: 'Visibility.',
    content: (
      <>
        <p className="eyebrow">Who can call what</p>
        <h2 className="title">Function visibility</h2>
        <ol className="steps">
          <li>
            <strong>public</strong>: anyone (or other contracts) can call.
          </li>
          <li>
            <strong>external</strong>: meant for outside callers.
          </li>
          <li>
            <strong>internal</strong>: this contract + children.
          </li>
          <li>
            <strong>private</strong>: only this contract. Note: private is not secret on-chain data.
          </li>
        </ol>
        <p className="callout">Private hides it from other contracts. Observers can still often read raw storage.</p>
      </>
    ),
  },
  {
    id: 'sol-view',
    notes: 'view vs transactions.',
    content: (
      <>
        <p className="eyebrow">Reads vs writes</p>
        <h2 className="title">view / pure versus state changes</h2>
        <div className="grid-2">
          <div className="panel ok">
            <h3>view / pure</h3>
            <p>Do not change state. Wallets can call them without sending a blockchain transaction (usually free from your perspective).</p>
          </div>
          <div className="panel">
            <h3>State-changing</h3>
            <p>Needs a signed tx, gas, mempool, inclusion. This is when the world updates.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'sol-events',
    notes: 'Events briefly.',
    content: (
      <>
        <p className="eyebrow">Feedback to apps</p>
        <h2 className="title">Events are a cheap news ticker</h2>
        <Code>{`event Transfer(address indexed from, address indexed to, uint256 amt);

function transfer(address to, uint256 amt) public {
    // ... update balances ...
    emit Transfer(msg.sender, to, amt);
}`}</Code>
        <p className="sub">Apps listen to logs. Cheaper than stuffing everything into storage.</p>
      </>
    ),
  },
  {
    id: 'bytecode',
    notes: 'Pipeline viz.',
    content: (
      <>
        <p className="eyebrow">Under the hood</p>
        <h2 className="title">Solidity is not what nodes execute</h2>
        <BytecodePipeViz />
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
    id: 'sandwich',
    notes: 'Click 0-3.',
    content: (
      <>
        <p className="eyebrow">Sandwich attack</p>
        <h2 className="title">Front-run, victim, back-run</h2>
        <SandwichViz />
      </>
    ),
  },
  {
    id: 'sandwich-demo',
    notes: 'Run Foundry live.',
    content: (
      <>
        <p className="eyebrow">Live demo</p>
        <h2 className="title">Simulate it with Foundry</h2>
        <Code>{`# Terminal A
anvil

# Terminal B
cd sandwich-attack
forge script script/Sandwich.s.sol:SandwichScript \\
  --broadcast --rpc-url http://127.0.0.1:8545`}</Code>
        <p className="sub">Look for victim loss and searcher profit in the logs.</p>
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
    notes: 'Leave on screen.',
    content: (
      <>
        <p className="eyebrow">Hands-on</p>
        <h2 className="title">Two repos</h2>
        <div className="repo-grid">
          <div className="repo-card">
            <div className="tag">Lab A</div>
            <h3>mempool-mev</h3>
            <p>Fee race in a local txpool. See pending work and inclusion priority.</p>
            <code>github.com/suyash101101/mempool-mev</code>
          </div>
          <div className="repo-card">
            <div className="tag">Lab B</div>
            <h3>sandwich-attack</h3>
            <p>Tiny AMM. Sandwich a swap. Read the profit.</p>
            <code>github.com/suyash101101/sandwich-attack</code>
          </div>
        </div>
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
            <span>Two terminals ready</span>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'lab-a',
    notes: 'Lab A commands.',
    content: (
      <>
        <p className="eyebrow">Lab A</p>
        <h2 className="title">mempool-mev</h2>
        <Code>{`git clone https://github.com/suyash101101/mempool-mev.git
cd mempool-mev
forge install foundry-rs/forge-std --no-commit

anvil --block-time 8

forge script script/FeeRace.s.sol:FeeRaceScript \\
  --broadcast --rpc-url http://127.0.0.1:8545 -vv`}</Code>
      </>
    ),
  },
  {
    id: 'lab-b',
    notes: 'Lab B commands.',
    content: (
      <>
        <p className="eyebrow">Lab B</p>
        <h2 className="title">sandwich-attack</h2>
        <Code>{`git clone https://github.com/suyash101101/sandwich-attack.git
cd sandwich-attack
forge install foundry-rs/forge-std --no-commit
forge test -vv

anvil
forge script script/Sandwich.s.sol:SandwichScript \\
  --broadcast --rpc-url http://127.0.0.1:8545`}</Code>
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
