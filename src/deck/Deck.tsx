import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { slides } from './slides'

export function Deck() {
  const [index, setIndex] = useState(() => {
    const n = Number(window.location.hash.replace('#', ''))
    if (!Number.isNaN(n) && n >= 1 && n <= slides.length) return n - 1
    return 0
  })
  const [notesOpen, setNotesOpen] = useState(false)

  const show = useCallback((i: number) => {
    const next = Math.max(0, Math.min(slides.length - 1, i))
    setIndex(next)
    history.replaceState(null, '', `#${next + 1}`)
  }, [])

  useEffect(() => {
    const onHash = () => {
      const n = Number(window.location.hash.replace('#', ''))
      if (!Number.isNaN(n) && n >= 1 && n <= slides.length) setIndex(n - 1)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.matches('input, textarea')) return
      if ((e.key === ' ' || e.key === 'Enter') && t.matches('button')) return
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        show(index + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        show(index - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        show(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        show(slides.length - 1)
      } else if (e.key === 'n' || e.key === 'N') {
        setNotesOpen((v) => !v)
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
        else document.exitFullscreen?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, show])

  const slide = slides[index]
  const pct = ((index + 1) / slides.length) * 100

  return (
    <div className="deck-root">
      <div className="bg-stage" aria-hidden>
        <motion.div
          className="bg-orb a"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-orb b"
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-orb c"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="bg-grid" />
      </div>

      <header className="topbar">
        <div className="brand">
          <span className="brand-gem" />
          Road to Devcon · NITK
        </div>
        <div className="pill">Session 1 / 3</div>
      </header>

      <main
        className="slide-stage"
        tabIndex={0}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button, a, .viz')) return
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="slide-card"
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.content}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bottombar">
        <button type="button" className="nav-btn" onClick={() => show(index - 1)} aria-label="Previous">
          ←
        </button>
        <div className="progress">
          <motion.span animate={{ width: `${pct}%` }} />
        </div>
        <div className="counter">
          {index + 1} / {slides.length}
        </div>
        <button type="button" className="nav-btn" onClick={() => show(index + 1)} aria-label="Next">
          →
        </button>
        <button
          type="button"
          className={`notes-btn ${notesOpen ? 'on' : ''}`}
          onClick={() => setNotesOpen((v) => !v)}
        >
          Notes
        </button>
      </footer>

      {notesOpen && (
        <aside className="notes-panel">
          <header>
            <span>Speaker notes</span>
            <button type="button" onClick={() => setNotesOpen(false)}>
              ✕
            </button>
          </header>
          <p>{slide.notes}</p>
        </aside>
      )}
    </div>
  )
}
