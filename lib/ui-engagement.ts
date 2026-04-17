export type UiEngagementMetrics = {
  views: number
  copies: number
  lastViewedAt?: string
  lastCopiedAt?: string
}

export type UiEngagementSnapshot = Record<string, UiEngagementMetrics>

const STORAGE_KEY = 'multiverse_ui_engagement_v1'
export const UI_ENGAGEMENT_EVENT = 'multiverse-ui-engagement'

function isBrowser() {
  return typeof window !== 'undefined'
}

function safeParse(value: string | null): UiEngagementSnapshot {
  if (!value) return {}
  try {
    const parsed = JSON.parse(value) as UiEngagementSnapshot
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function getUiEngagementSnapshot(): UiEngagementSnapshot {
  if (!isBrowser()) return {}
  return safeParse(window.localStorage.getItem(STORAGE_KEY))
}

function writeSnapshot(snapshot: UiEngagementSnapshot) {
  if (!isBrowser()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  window.dispatchEvent(new CustomEvent(UI_ENGAGEMENT_EVENT))
}

function updateItem(id: string, patch: (current: UiEngagementMetrics) => UiEngagementMetrics) {
  const snapshot = getUiEngagementSnapshot()
  const current = snapshot[id] || { views: 0, copies: 0 }
  snapshot[id] = patch(current)
  writeSnapshot(snapshot)
}

export function trackUiView(id: string) {
  updateItem(id, current => ({
    ...current,
    views: current.views + 1,
    lastViewedAt: new Date().toISOString(),
  }))
}

export function trackUiCopy(id: string) {
  updateItem(id, current => ({
    ...current,
    copies: current.copies + 1,
    lastCopiedAt: new Date().toISOString(),
  }))
}
