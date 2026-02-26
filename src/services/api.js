// ─── API Client ───────────────────────────────────────────────────────────────
// Calls Netlify Functions in production; falls back to mock data in dev if needed.

const BASE = import.meta.env.VITE_API_BASE || '/.netlify/functions'

async function request(path, options = {}) {
  const token = localStorage.getItem('asyou_token')
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return res.json()
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const auth = {
  register: (data) => request('/auth-register', { method: 'POST', body: JSON.stringify(data) }),
  login:    (data) => request('/auth-login',    { method: 'POST', body: JSON.stringify(data) }),
  me:       ()     => request('/auth-me'),
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export const portfolio = {
  get:      ()     => request('/portfolio'),
  history:  ()     => request('/portfolio-history'),
}

// ─── Partners ─────────────────────────────────────────────────────────────────
export const partners = {
  list:       ()         => request('/partners'),
  connect:    (id, data) => request(`/partners-connect`, { method: 'POST', body: JSON.stringify({ partnerId: id, ...data }) }),
  disconnect: (id)       => request(`/partners-disconnect`, { method: 'POST', body: JSON.stringify({ partnerId: id }) }),
}

// ─── Rewards / Activity ───────────────────────────────────────────────────────
export const rewards = {
  activity: (limit = 20) => request(`/rewards-activity?limit=${limit}`),
  sync:     (partnerId)  => request('/rewards-sync', { method: 'POST', body: JSON.stringify({ partnerId }) }),
}

export default { auth, portfolio, partners, rewards }
