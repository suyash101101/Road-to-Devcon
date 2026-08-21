import { session1Slides } from './slides-session1'
import { session2Slides } from './slides-session2'
import { session3Slides } from './slides-session3'

export type { Slide } from './slides-session1'

export type SessionNum = 1 | 2 | 3

export function getSessionFromLocation(): SessionNum {
  const params = new URLSearchParams(window.location.search)
  const session = params.get('session')
  if (session === '2') return 2
  if (session === '3') return 3
  return 1
}

export function getSlides(session: SessionNum = getSessionFromLocation()) {
  if (session === 2) return session2Slides
  if (session === 3) return session3Slides
  return session1Slides
}

export function getSessionLabel(session: SessionNum) {
  if (session === 2) return 'Session 2 · ZK Intuition'
  if (session === 3) return 'Session 3 · RAILGUN Live Demo'
  return 'Session 1 · Mempool & MEV'
}
