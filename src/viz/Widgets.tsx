import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function MiningViz() {
  const miners = ['Miner A', 'Miner B', 'Miner C']
  const [waiting, setWaiting] = useState([
    { id: 1, label: 'Alice → Bob', hot: false },
    { id: 2, label: 'Carol swap', hot: true },
    { id: 3, label: 'Dev → Eve', hot: false },
  ])
  const [racing, setRacing] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [block, setBlock] = useState(0)
  const [status, setStatus] = useState('Press Mine. Computers race. Winner writes the next page.')

  async function mine() {
    if (racing) return
    setRacing(true)
    setWinner(null)
    setStatus('Racing on the puzzle...')
    await new Promise((r) => setTimeout(r, 900))
    const w = miners[Math.floor(Math.random() * miners.length)]
    setWinner(w)
    setBlock((b) => b + 1)
    const n = waiting.length
    setWaiting([])
    setStatus(`${w} won. ${n} pending txs became Block #${block + 1}. Everyone copies that page.`)
    setRacing(false)
  }

  function reset() {
    setWaiting([
      { id: 1, label: 'Alice → Bob', hot: false },
      { id: 2, label: 'Carol swap', hot: true },
      { id: 3, label: 'Dev → Eve', hot: false },
    ])
    setWinner(null)
    setBlock(0)
    setStatus('Press Mine. Computers race. Winner writes the next page.')
  }

  return (
    <div className="viz">
      <div className="viz-label">Interactive · Proof of Work race</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={mine}>
          Mine next block
        </button>
        <button type="button" className="btn" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="grid-2">
        <div className="panel">
          <h3>Waiting room (mempool)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {waiting.length === 0 && <span className="mono" style={{ color: 'var(--muted)' }}>empty</span>}
            {waiting.map((t) => (
              <span
                key={t.id}
                className="mono"
                style={{
                  border: `1px solid ${t.hot ? 'var(--gold)' : 'var(--line)'}`,
                  color: t.hot ? 'var(--gold)' : 'var(--fg)',
                  padding: '4px 8px',
                  fontSize: '0.95rem',
                }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Miners</h3>
          <div style={{ display: 'grid', gap: 6, marginTop: 8 }}>
            {miners.map((m) => (
              <div
                key={m}
                className="mono"
                style={{
                  padding: '8px 10px',
                  border: `1px solid ${winner === m ? 'var(--cyan)' : racing ? 'var(--gold)' : 'var(--line)'}`,
                  color: winner === m ? 'var(--cyan)' : racing ? 'var(--gold)' : 'var(--muted)',
                  background: winner === m ? 'rgba(94,242,208,0.08)' : 'transparent',
                }}
              >
                {m}
                {winner === m ? ' · WIN' : racing ? ' · hashing...' : ''}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 10, color: 'var(--muted)' }}>Chain tip: Block #{block || 0}</p>
        </div>
      </div>
      <p className="mono" style={{ marginTop: 10, color: 'var(--muted)', fontSize: '1.05rem' }}>
        {status}
      </p>
    </div>
  )
}

export function MempoolViz() {
  type Tx = { id: number; from: string; to: string; value: string; fee: number }
  const [pool, setPool] = useState<Tx[]>([])
  const [blocks, setBlocks] = useState(0)
  const [last, setLast] = useState<Tx[]>([])
  const [log, setLog] = useState('Spawn pending txs. Then build a block. Highest fees go first.')
  const [id, setId] = useState(1)

  const sorted = useMemo(() => [...pool].sort((a, b) => b.fee - a.fee), [pool])

  function spawn() {
    const froms = ['0xA1…', '0xB7…', '0xC3…', '0xD9…']
    const tos = ['Uniswap', 'Alice', 'NFT mint', 'Bob', 'Bridge']
    const n = 3 + Math.floor(Math.random() * 3)
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
    setPool((p) => [...p, ...next])
    setLog(`Added ${n} pending messages. Sorted by fee. Anyone watching can read them.`)
  }

  function mine() {
    if (!pool.length) {
      setLog('Mempool empty. Spawn first.')
      return
    }
    const take = [...pool].sort((a, b) => b.fee - a.fee).slice(0, 4)
    const ids = new Set(take.map((t) => t.id))
    setPool((p) => p.filter((t) => !ids.has(t.id)))
    setLast(take)
    setBlocks((b) => b + 1)
    setLog(`Block #${blocks + 1} packed highest fees first. Low bids keep waiting.`)
  }

  return (
    <div className="viz">
      <div className="viz-label">Interactive · Mempool simulator</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={spawn}>
          Spawn pending txs
        </button>
        <button type="button" className="btn" onClick={mine}>
          Build next block
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPool([])
            setLast([])
            setBlocks(0)
            setLog('Spawn pending txs. Then build a block. Highest fees go first.')
          }}
        >
          Clear
        </button>
      </div>
      <div className="grid-2">
        <div className="panel">
          <h3>Pending ({pool.length})</h3>
          <div style={{ maxHeight: 220, overflow: 'auto', marginTop: 8 }}>
            <AnimatePresence initial={false}>
              {sorted.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mono"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: 8,
                    padding: '8px 10px',
                    border: '1px solid var(--line)',
                    marginBottom: 6,
                    fontSize: '0.95rem',
                  }}
                >
                  <span>
                    {t.from} → {t.to}
                  </span>
                  <span style={{ color: 'var(--cyan)' }}>{t.value}</span>
                  <span style={{ color: 'var(--gold)' }}>{t.fee} gwei</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {!sorted.length && <p style={{ color: 'var(--muted)' }}>No pending txs</p>}
          </div>
        </div>
        <div className="panel">
          <h3>Last block #{blocks || 0}</h3>
          <div className="mono" style={{ marginTop: 8, color: 'var(--muted)', lineHeight: 1.5, fontSize: '1rem' }}>
            {last.length
              ? last.map((t, i) => (
                  <div key={t.id}>
                    {i + 1}. {t.from}→{t.to} @ {t.fee} gwei
                  </div>
                ))
              : 'Nothing mined yet'}
          </div>
        </div>
      </div>
      <p className="mono" style={{ marginTop: 10, color: 'var(--muted)', fontSize: '1.05rem' }}>
        {log}
      </p>
    </div>
  )
}

export function NodeNetworkViz() {
  const nodes = ['Bangalore', 'Berlin', 'Lagos', 'Tokyo', 'São Paulo', 'Your laptop']
  const [counts, setCounts] = useState(nodes.map(() => 0))
  const [flash, setFlash] = useState(-1)
  const [log, setLog] = useState('Each box is a full node. Each runs the same EVM rules on the same state.')

  async function run() {
    setLog('Transaction arrives. Every node re-runs the code...')
    const next = [...counts]
    for (let i = 0; i < nodes.length; i++) {
      await new Promise((r) => setTimeout(r, 160))
      next[i] += 1
      setCounts([...next])
      setFlash(i)
    }
    setFlash(-1)
    setLog(`All nodes agree: count = ${next[0]}. Agreement across the world is the chain.`)
  }

  return (
    <div className="viz">
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
            setLog('Each box is a full node. Each runs the same EVM rules on the same state.')
          }}
        >
          Reset
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {nodes.map((n, i) => (
          <motion.div
            key={n}
            animate={{ borderColor: flash === i ? 'var(--cyan)' : 'rgba(196,181,253,0.28)' }}
            className="panel"
            style={{ textAlign: 'center', padding: '0.85rem' }}
          >
            <div className="mono" style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Node · {n}
            </div>
            <div style={{ color: 'var(--cyan)', fontWeight: 700, margin: '6px 0', fontSize: '1.2rem' }}>EVM</div>
            <div className="mono" style={{ color: 'var(--pink)' }}>
              count = {counts[i]}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mono" style={{ marginTop: 10, color: 'var(--muted)', fontSize: '1.05rem' }}>
        {log}
      </p>
    </div>
  )
}

export function BytecodePipeViz() {
  const steps = [
    { t: 'Solidity', d: 'Human-readable program' },
    { t: 'Compiler', d: 'solc checks and builds' },
    { t: 'Bytecode', d: 'Hex the EVM executes' },
    { t: 'Every node', d: 'Stores and re-runs it' },
  ]
  const msgs = [
    'You write logic people can read.',
    'Compiler turns it into machine instructions.',
    'Example: 0x608060405234801561001057600080fd5b50...',
    'Deploy uploads bytecode. Wallets use the ABI menu to call functions.',
  ]
  const [i, setI] = useState(-1)

  return (
    <div className="viz">
      <div className="viz-label">Interactive · From source to chain</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={() => setI((v) => Math.min(3, v + 1))}>
          Step →
        </button>
        <button type="button" className="btn" onClick={() => setI(-1)}>
          Reset
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {steps.map((s, idx) => (
          <div
            key={s.t}
            className="panel"
            style={{
              opacity: i >= idx ? 1 : 0.35,
              borderColor: i >= idx ? 'var(--cyan)' : 'var(--line)',
            }}
          >
            <h3 style={{ fontSize: '1.15rem' }}>{s.t}</h3>
            <p style={{ fontSize: '1.05rem' }}>{s.d}</p>
          </div>
        ))}
      </div>
      <p className="mono" style={{ marginTop: 10, color: 'var(--gold)', fontSize: '1.05rem' }}>
        {i < 0 ? 'Click Step to walk the pipeline.' : msgs[i]}
      </p>
    </div>
  )
}

export function SandwichViz() {
  const captions = [
    'Victim swap sits in the mempool. Intent is public.',
    'Searcher front-runs with a higher fee. Price moves against the victim.',
    'Victim still fills inside slippage. Worse price, but the tx succeeds.',
    'Searcher back-runs (sells). The spread is MEV profit.',
  ]
  const [step, setStep] = useState(0)
  const cards = [
    { title: 'Front-run', body: 'Searcher buys first.', kind: 'searcher', show: [1, 2, 3] },
    { title: 'Victim swap', body: 'Large buy / sell lands.', kind: 'victim', show: [0, 1, 2, 3] },
    { title: 'Back-run', body: 'Searcher sells into it.', kind: 'searcher', show: [3] },
  ]

  return (
    <div className="viz">
      <div className="viz-label">Interactive · Sandwich steps</div>
      <div className="controls">
        {[0, 1, 2, 3].map((s) => (
          <button key={s} type="button" className={`btn ${step === s ? 'active' : ''}`} onClick={() => setStep(s)}>
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {cards.map((c) => (
          <div
            key={c.title}
            className="panel"
            style={{
              opacity: c.show.includes(step) ? 1 : 0.25,
              borderTop: `3px solid ${c.kind === 'victim' ? 'var(--gold)' : 'var(--danger)'}`,
            }}
          >
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
      <p className="callout">{captions[step]}</p>
    </div>
  )
}

export function ChainGrowViz() {
  const [n, setN] = useState(3)
  return (
    <div className="viz">
      <div className="viz-label">Interactive · Blocks link into a chain</div>
      <div className="controls">
        <button type="button" className="btn primary" onClick={() => setN((x) => Math.min(8, x + 1))}>
          Add block
        </button>
        <button type="button" className="btn" onClick={() => setN(3)}>
          Reset
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="panel"
              style={{ minWidth: 110, textAlign: 'center' }}
            >
              <div className="mono" style={{ color: 'var(--cyan)' }}>
                Block {i + 1}
              </div>
              <div className="mono" style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>
                hash…{((i + 1) * 17).toString(16)}
              </div>
            </motion.div>
            {i < n - 1 && <span style={{ color: 'var(--pink)', fontSize: '1.4rem' }}>→</span>}
          </div>
        ))}
      </div>
      <p className="sub" style={{ maxWidth: 'none' }}>
        Each block points at the previous hash. Change an old page and every later link breaks.
      </p>
    </div>
  )
}
