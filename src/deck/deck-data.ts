import { session1Slides } from './slides-session1'
import { session2Slides } from './slides-session2'

export type { Slide } from './slides-session1'

export function getSessionFromLocation(): 1 | 2 {
  const params = new URLSearchParams(window.location.search)
  const session = params.get('session')
  if (session === '2') return 2
  return 1
}

export function getSlides(session: 1 | 2 = getSessionFromLocation()) {
  return session === 2 ? session2Slides : session1Slides
}

export function getSessionLabel(session: 1 | 2) {
  return session === 2 ? 'Session 2 · ZK Intuition' : 'Session 1 · Mempool & MEV'
}
