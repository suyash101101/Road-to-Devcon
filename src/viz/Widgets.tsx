import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type PendingTx = { id: number; label: string; fee: number; hot: boolean }

function makePending(startId: number, n = 4): PendingTx[] {
  const labels = [
    'Alice → Bob · 0.4 ETH',
    'Carol · DEX swap',
    'Dev → Eve · 0.1 ETH',
    'NFT mint · hot',
    'Bridge deposit',
    'DAO vote',
    'Token approve',
  ]
  return Array.from({ length: n }, (_, i) => {
    const label = labels[(startId + i) % labels.length]
    const fee = 5 + ((startId * 7 + i * 13) % 80)
    return {
      id: startId + i,
      label,
      fee,
      hot: fee > 50 || label.includes('swap') || label.includes('hot'),
    }
  })
}

export function MiningViz() {
  const miners = ['Miner A', 'Miner B', 'Miner C']
  const [nextId, setNextId] = useState(10)
  const [waiting, setWaiting] = useState<PendingTx[]>(() => makePending(1, 5))
  const [racing, setRacing] = useState(false)
  const [hashes, setHashes] = useState<Record<string, number>>({
    'Miner A': 0,
    'Miner B': 0,
    'Miner C': 0,
  })
  const [winner, setWinner] = useState<string | null>(null)
  const [block, setBlock] = useState(0)
  const [lastIncluded, setLastIncluded] = useState<PendingTx[]>([])
  const [status, setStatus] = useState(
    'Mempool starts full. Press Mine to race. New pending txs refill after each block.',
  )

  async function mine() {
    if (racing) return
    let pool = waiting
    if (!pool.length) {
      const batch = makePending(nextId, 5)
      pool = batch
      setWaiting(batch)
      setNextId(nextId + batch.length)
    }
    setRacing(true)
    setWinner(null)
    setStatus('Miners hashing... first valid proof wins the block')
    const ticks = 12
    for (let t = 0; t < ticks; t++) {
      await new Promise((r) => setTimeout(r, 70))
      setHashes((h) => ({
        'Miner A': h['Miner A'] + 40 + Math.floor(Math.random() * 90),
        'Miner B': h['Miner B'] + 40 + Math.floor(Math.random() * 90),
        'Miner C': h['Miner C'] + 40 + Math.floor(Math.random() * 90),
      }))
    }
    const w = miners[Math.floor(Math.random() * miners.length)]
    const included = [...pool].sort((a, b) => b.fee - a.fee).slice(0, Math.min(4, pool.length))
    setWinner(w)
    setBlock((b) => b + 1)
    setLastIncluded(included)
    setWaiting([])
    setStatus(`${w} won Block #${block + 1}. Packed ${included.length} highest-fee txs. Refilling mempool...`)
    setRacing(false)
    await new Promise((r) => setTimeout(r, 450))
    setNextId((id) => {
      const batch = makePending(id, 4 + Math.floor(Math.random() * 2))
      setWaiting(batch)
      setStatus(`${w} won. Network copied the block. Fresh pending txs arrived in the mempool.`)
      return id + batch.length
    })
  }

  function addPending() {
    const batch = makePending(nextId, 3)
    setWaiting((w) => [...w, ...batch].slice(-10))
    setNextId(nextId + batch.length)
    setStatus(`Added ${batch.length} pending txs to the mempool.`)
  }

  function reset() {
    setWinner(null)
    setBlock(0)
    setLastIncluded([])
    setHashes({ 'Miner A': 0, 'Miner B': 0, 'Miner C': 0 })
    setWaiting(makePending(1, 5))
    setNextId(10)
    setStatus('Mempool starts full. Press Mine to race. New pending txs refill after each block.')
  }

  return (
    <div className="viz viz-lg">
      <div className="viz-label">Interactive · Watch a block get mined</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={mine} disabled={racing}>
          {racing ? 'Mining...' : 'Mine next block'}
        </button>
        <button type="button" className="btn" onClick={addPending}>
          Add pending txs
        </button>
        <button type="button" className="btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="viz-3">
        <div className="panel viz-panel">
          <h3>Mempool · {waiting.length} pending</h3>
          <div className="tx-stack">
            <AnimatePresence initial={false}>
              {[...waiting]
                .sort((a, b) => b.fee - a.fee)
                .map((t) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24, scale: 0.9 }}
                    className={`tx-row ${t.hot ? 'hot' : ''}`}
                  >
                    <span>{t.label}</span>
                    <span className="fee">{t.fee} gwei</span>
                  </motion.div>
                ))}
            </AnimatePresence>
            {!waiting.length && <p className="dim">Empty for a moment while the block seals...</p>}
          </div>
        </div>

        <div className="panel viz-panel">
          <h3>Miners racing</h3>
          <div className="miner-stack">
            {miners.map((m) => (
              <div key={m} className={`miner-card ${winner === m ? 'won' : ''} ${racing ? 'racing' : ''}`}>
                <div className="miner-top">
                  <strong>{m}</strong>
                  <span className="mono">{racing ? 'hashing' : winner === m ? 'WINNER' : 'idle'}</span>
                </div>
                <div className="hash-bar">
                  <motion.div
                    className="hash-fill"
                    animate={{ width: `${Math.min(100, (hashes[m] % 1000) / 10)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="mono dim">nonce attempts · {hashes[m].toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel viz-panel">
          <h3>Chain tip · Block #{block}</h3>
          {lastIncluded.length ? (
            <div className="tx-stack">
              {lastIncluded.map((t, i) => (
                <motion.div
                  key={`${block}-${t.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="tx-row sealed"
                >
                  <span>
                    #{i + 1} {t.label}
                  </span>
                  <span className="fee">{t.fee} gwei</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="dim">No sealed block yet. Mine once to fill this column.</p>
          )}
        </div>
      </div>
      <p className="viz-status">{status}</p>
    </div>
  )
}

export function MempoolViz() {
  type Tx = { id: number; from: string; to: string; value: string; fee: number }
  const seed = (): Tx[] => [
    { id: 1, from: '0xA1…f3', to: 'Uniswap', value: '1.20 ETH', fee: 62 },
    { id: 2, from: '0xB7…9a', to: 'Alice', value: '0.05 ETH', fee: 12 },
    { id: 3, from: '0xC3…11', to: 'NFT mint', value: '0.08 ETH', fee: 41 },
    { id: 4, from: '0xD9…ee', to: 'Bob', value: '0.30 ETH', fee: 8 },
    { id: 5, from: '0xE2…77', to: 'Bridge', value: '2.00 ETH', fee: 55 },
  ]
  const [pool, setPool] = useState<Tx[]>(seed)
  const [blocks, setBlocks] = useState(0)
  const [last, setLast] = useState<Tx[]>([])
  const [log, setLog] = useState('Mempool starts with live pending txs. Highest fee usually enters first.')
  const [id, setId] = useState(10)
  const [auto, setAuto] = useState(false)

  const sorted = useMemo(() => [...pool].sort((a, b) => b.fee - a.fee), [pool])
  const maxFee = Math.max(1, ...sorted.map((t) => t.fee))

  function spawn(n = 3) {
    const froms = ['0xA1…f3', '0xB7…9a', '0xC3…11', '0xD9…ee', '0xE2…77']
    const tos = ['Uniswap', 'Alice', 'NFT mint', 'Bob', 'Bridge', 'DAO']
    const next: Tx[] = []
    let cur = id
    for (let i = 0; i < n; i++) {
      next.push({
        id: cur++,
        from: froms[Math.floor(Math.random() * froms.length)],
        to: tos[Math.floor(Math.random() * tos.length)],
        value: `${(Math.random() * 2 + 0.05).toFixed(2)} ETH`,
        fee: 1 + Math.floor(Math.random() * 90),
      })
    }
    setId(cur)
    setPool((p) => [...p, ...next].slice(-14))
    setLog(`+${n} pending. Sorted by fee. Anyone with a node can read this list.`)
  }

  function mine() {
    if (!pool.length) {
      setLog('Empty. Spawn or reset.')
      return
    }
    const take = [...pool].sort((a, b) => b.fee - a.fee).slice(0, 4)
    const ids = new Set(take.map((t) => t.id))
    setPool((p) => p.filter((t) => !ids.has(t.id)))
    setLast(take)
    setBlocks((b) => b + 1)
    setLog(`Block #${blocks + 1} took top fees. Lower bids remain pending.`)
  }

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => {
      setId((cur) => {
        const froms = ['0xA1…f3', '0xB7…9a', '0xC3…11', '0xD9…ee', '0xE2…77']
        const tos = ['Uniswap', 'Alice', 'NFT mint', 'Bob', 'Bridge', 'DAO']
        const tx = {
          id: cur,
          from: froms[Math.floor(Math.random() * froms.length)],
          to: tos[Math.floor(Math.random() * tos.length)],
          value: `${(Math.random() * 2 + 0.05).toFixed(2)} ETH`,
          fee: 1 + Math.floor(Math.random() * 90),
        }
        setPool((p) => [...p, tx].slice(-14))
        setLog('Auto: +1 pending tx')
        return cur + 1
      })
    }, 1600)
    return () => clearInterval(t)
  }, [auto])

  return (
    <div className="viz viz-lg">
      <div className="viz-label">Interactive · Mempool fee auction</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={() => spawn(3)}>
          Spawn txs
        </button>
        <button type="button" className="btn" onClick={mine}>
          Build next block
        </button>
        <button type="button" className={`btn ${auto ? 'active' : ''}`} onClick={() => setAuto((v) => !v)}>
          {auto ? 'Auto: ON' : 'Auto spawn'}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPool(seed())
            setLast([])
            setBlocks(0)
            setAuto(false)
            setLog('Reset. Mempool seeded again.')
          }}
        >
          Reset
        </button>
      </div>
      <div className="viz-2">
        <div className="panel viz-panel">
          <h3>Pending · {pool.length}</h3>
          <div className="tx-stack tall">
            <AnimatePresence initial={false}>
              {sorted.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="fee-row"
                >
                  <div className="fee-meta">
                    <span className="mono">
                      {t.from} → {t.to}
                    </span>
                    <span className="mono accent">{t.value}</span>
                    <span className="mono gold">{t.fee} gwei</span>
                  </div>
                  <div className="fee-track">
                    <motion.div className="fee-fill" animate={{ width: `${(t.fee / maxFee) * 100}%` }} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="panel viz-panel">
          <h3>Sealed block #{blocks}</h3>
          <div className="tx-stack">
            {last.length ? (
              last.map((t, i) => (
                <motion.div
                  key={`${blocks}-${t.id}`}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="tx-row sealed"
                >
                  <span>
                    #{i + 1} {t.from} → {t.to}
                  </span>
                  <span className="fee">{t.fee} gwei</span>
                </motion.div>
              ))
            ) : (
              <p className="dim">Build a block to see inclusion order here.</p>
            )}
          </div>
          <p className="callout tight">Same auction logic as gas tips on Ethereum today.</p>
        </div>
      </div>
      <p className="viz-status">{log}</p>
    </div>
  )
}

export function NodeNetworkViz() {
  const nodes = ['Bangalore', 'Berlin', 'Lagos', 'Tokyo', 'São Paulo', 'Your laptop']
  const [counts, setCounts] = useState(nodes.map(() => 0))
  const [flash, setFlash] = useState(-1)
  const [phase, setPhase] = useState<'idle' | 'gossip' | 'exec' | 'done'>('idle')
  const [log, setLog] = useState('Tap Run. Watch gossip, then every EVM execute the same update.')

  async function run() {
    setPhase('gossip')
    setLog('1/3 Gossip: signed tx spreads peer to peer')
    for (let i = 0; i < nodes.length; i++) {
      setFlash(i)
      await new Promise((r) => setTimeout(r, 140))
    }
    setPhase('exec')
    setLog('2/3 Execute: each full node runs the EVM')
    const next = [...counts]
    for (let i = 0; i < nodes.length; i++) {
      await new Promise((r) => setTimeout(r, 150))
      next[i] += 1
      setCounts([...next])
      setFlash(i)
    }
    setFlash(-1)
    setPhase('done')
    setLog(`3/3 Consensus: all nodes agree count = ${next[0]}. That shared result is the chain.`)
  }

  return (
    <div className="viz viz-lg">
      <div className="viz-label">Interactive · Where the EVM lives</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={run}>
          Run tx: count += 1
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setCounts(nodes.map(() => 0))
            setPhase('idle')
            setLog('Tap Run. Watch gossip, then every EVM execute the same update.')
          }}
        >
          Reset
        </button>
      </div>
      <div className="phase-pills">
        {(['gossip', 'exec', 'done'] as const).map((p) => (
          <span key={p} className={`phase-pill ${phase === p ? 'on' : ''}`}>
            {p}
          </span>
        ))}
      </div>
      <div className="node-grid">
        {nodes.map((n, i) => (
          <motion.div
            key={n}
            animate={{
              scale: flash === i ? 1.04 : 1,
              borderColor: flash === i ? 'var(--cyan)' : 'rgba(196,181,253,0.28)',
              boxShadow: flash === i ? '0 0 24px rgba(94,242,208,0.25)' : '0 0 0 transparent',
            }}
            className="node-card"
          >
            <div className="mono dim">Node · {n}</div>
            <div className="node-cpu">EVM</div>
            <div className="mono accent-pink">count = {counts[i]}</div>
            <div className="mono dim tiny">full copy of state</div>
          </motion.div>
        ))}
      </div>
      <p className="viz-status">{log}</p>
    </div>
  )
}

export function BytecodePipeViz() {
  const steps = [
    { t: 'Solidity', d: 'Human-readable source' },
    { t: 'solc', d: 'Compile + typecheck' },
    { t: 'Bytecode', d: 'What the EVM runs' },
    { t: 'ABI', d: 'JSON menu for callers' },
    { t: 'Nodes', d: 'Store + re-execute' },
  ]
  const msgs = [
    'You write contract logic in Solidity.',
    'solc emits bytecode (body) and ABI (interface).',
    'Bytecode example: 0x608060405234801561001057600080fd5b50...',
    'ABI maps transfer(address,uint256) to a 4-byte selector.',
    'Deploy stores bytecode at an address. Wallets + ethers.js use the ABI to encode calls.',
  ]
  const [i, setI] = useState(-1)

  return (
    <div className="viz viz-lg">
      <div className="viz-label">Interactive · Source → bytecode → ABI → network</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={() => setI((v) => Math.min(4, v + 1))}>
          Step →
        </button>
        <button type="button" className="btn" onClick={() => setI(-1)}>
          Reset
        </button>
      </div>
      <div className="pipe-grid">
        {steps.map((s, idx) => (
          <motion.div
            key={s.t}
            animate={{ opacity: i >= idx ? 1 : 0.35, y: i === idx ? -4 : 0 }}
            className={`panel pipe-step ${i >= idx ? 'on' : ''}`}
          >
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </motion.div>
        ))}
      </div>
      <p className="viz-status gold">{i < 0 ? 'Click Step to walk the pipeline.' : msgs[i]}</p>
    </div>
  )
}

export function SandwichViz() {
  const captions = [
    'Victim wants to buy TOKEN with 10 ETH. Tx sits in the mempool with 1% slippage. Public intent.',
    'Searcher sees it, pays a higher tip, buys TOKEN first. Pool price rises before the victim lands.',
    'Victim still executes inside slippage. They get fewer TOKEN than the fair price. Tx succeeds anyway.',
    'Searcher sells TOKEN into the victim buy. Spread = MEV profit. Victim paid the sandwich tax.',
  ]
  const prices = [100, 118, 118, 104]
  const [step, setStep] = useState(0)

  return (
    <div className="viz viz-lg">
      <div className="viz-label">Interactive · Sandwich economics</div>
      <div className="controls">
        {[
          '0 Intent',
          '1 Front-run',
          '2 Victim',
          '3 Back-run',
        ].map((label, s) => (
          <button key={label} type="button" className={`btn ${step === s ? 'active' : ''}`} onClick={() => setStep(s)}>
            {label}
          </button>
        ))}
      </div>
      <div className="viz-2">
        <div className="panel viz-panel">
          <h3>Pool price (TOKEN per ETH)</h3>
          <div className="price-chart">
            {prices.map((p, i) => (
              <div key={i} className="price-col">
                <motion.div
                  className={`price-bar ${i <= step ? 'on' : ''}`}
                  animate={{ height: i <= step ? `${p}%` : '20%' }}
                />
                <span className="mono dim">{i}</span>
              </div>
            ))}
          </div>
          <p className="mono accent" style={{ marginTop: 12, fontSize: '1.2rem' }}>
            Spot now · {prices[step]}
          </p>
        </div>
        <div className="panel viz-panel">
          <h3>Who acts</h3>
          <div className="sand-list">
            <div className={`sand-item ${step >= 0 ? 'on' : ''}`}>
              <strong>Victim</strong>
              <span>Broadcasts large swap. Visible in mempool.</span>
            </div>
            <div className={`sand-item bad ${step >= 1 ? 'on' : ''}`}>
              <strong>Searcher front-run</strong>
              <span>Buys first with higher fee. Moves price.</span>
            </div>
            <div className={`sand-item ${step >= 2 ? 'on' : ''}`}>
              <strong>Victim fills</strong>
              <span>Worse rate, still within slippage.</span>
            </div>
            <div className={`sand-item bad ${step >= 3 ? 'on' : ''}`}>
              <strong>Searcher back-run</strong>
              <span>Sells into victim. Extracts spread.</span>
            </div>
          </div>
        </div>
      </div>
      <p className="callout">{captions[step]}</p>
    </div>
  )
}

type BlockDetail = {
  height: number
  hash: string
  prev: string
  txs: number
  miner: string
}

export function ChainGrowViz() {
  const [blocks, setBlocks] = useState<BlockDetail[]>([
    { height: 1, hash: '0x9a1c', prev: '0x0000', txs: 3, miner: 'genesis' },
    { height: 2, hash: '0x4fe2', prev: '0x9a1c', txs: 5, miner: 'Miner B' },
    { height: 3, hash: '0xb77d', prev: '0x4fe2', txs: 4, miner: 'Miner A' },
  ])
  const [selected, setSelected] = useState(2)
  const [tampered, setTampered] = useState(false)
  const [status, setStatus] = useState('Click a block to inspect. Add blocks to grow the chain. Try Tamper on an old block.')

  function addBlock() {
    if (blocks.length >= 7) return
    const tip = blocks[blocks.length - 1]
    const height = tip.height + 1
    const hash = `0x${((height * 7919) % 0xffff).toString(16).padStart(4, '0')}`
    setBlocks((b) => [
      ...b,
      {
        height,
        hash,
        prev: tip.hash,
        txs: 2 + (height % 4),
        miner: ['Miner A', 'Miner B', 'Miner C'][height % 3],
      },
    ])
    setSelected(blocks.length)
    setTampered(false)
    setStatus(`Block ${height} linked to ${tip.hash}. Changing any earlier hash would break this link.`)
  }

  function tamper() {
    if (blocks.length < 2) return
    const idx = Math.max(0, selected)
    setBlocks((b) =>
      b.map((blk, i) => (i === idx ? { ...blk, hash: '0xBAD!', txs: blk.txs + 99 } : blk)),
    )
    setTampered(true)
    setStatus(`Tampered Block ${blocks[idx].height}. Later blocks still point at the old hash. Chain integrity fails.`)
  }

  function reset() {
    setBlocks([
      { height: 1, hash: '0x9a1c', prev: '0x0000', txs: 3, miner: 'genesis' },
      { height: 2, hash: '0x4fe2', prev: '0x9a1c', txs: 5, miner: 'Miner B' },
      { height: 3, hash: '0xb77d', prev: '0x4fe2', txs: 4, miner: 'Miner A' },
    ])
    setSelected(2)
    setTampered(false)
    setStatus('Click a block to inspect. Add blocks to grow the chain. Try Tamper on an old block.')
  }

  const active = blocks[selected] ?? blocks[blocks.length - 1]

  return (
    <div className="viz viz-lg">
      <div className="viz-label">Interactive · How blocks lock into a chain</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={addBlock}>
          Add block
        </button>
        <button type="button" className="btn" onClick={tamper}>
          Tamper selected
        </button>
        <button type="button" className="btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="chain-row">
        {blocks.map((b, i) => (
          <div key={`${b.height}-${b.hash}`} className="chain-item">
            <motion.button
              type="button"
              className={`block-card ${selected === i ? 'selected' : ''} ${tampered && i === selected ? 'bad' : ''}`}
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -4 }}
            >
              <div className="block-h">Block {b.height}</div>
              <div className="mono tiny">hash {b.hash}</div>
              <div className="mono tiny dim">prev {b.prev}</div>
              <div className="mono tiny">{b.txs} txs · {b.miner}</div>
            </motion.button>
            {i < blocks.length - 1 && (
              <div className={`chain-link ${tampered && i >= selected ? 'broken' : ''}`}>→</div>
            )}
          </div>
        ))}
      </div>

      <div className="panel viz-panel inspect">
        <h3>Inspector · Block {active.height}</h3>
        <div className="inspect-grid">
          <div>
            <span className="dim">Hash</span>
            <strong className="mono">{active.hash}</strong>
          </div>
          <div>
            <span className="dim">Previous</span>
            <strong className="mono">{active.prev}</strong>
          </div>
          <div>
            <span className="dim">Transactions</span>
            <strong>{active.txs}</strong>
          </div>
          <div>
            <span className="dim">Proposed by</span>
            <strong>{active.miner}</strong>
          </div>
        </div>
        {tampered && (
          <p className="callout tight danger-text">
            Broken link: a later block expected the old hash. This is why rewriting history is hard.
          </p>
        )}
      </div>
      <p className="viz-status">{status}</p>
    </div>
  )
}
