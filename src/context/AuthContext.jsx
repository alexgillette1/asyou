import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)
const STORAGE_KEY   = 'asyou_user'
const TOKEN_KEY     = 'asyou_token'
const USERS_KEY     = 'asyou_users_db'
export const DEMO_PARTNERS = ['uber', 'peloton', 'lyft'] // partners to pre-connect for demo

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate              = useNavigate()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch { localStorage.removeItem(STORAGE_KEY) }
    finally { setLoading(false) }
  }, [])

  const register = useCallback(async ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password)
      return { ok: false, error: 'All fields are required.' }
    if (password.length < 8)
      return { ok: false, error: 'Password must be at least 8 characters.' }
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, error: 'An account with this email already exists.' }
    const newUser = {
      id: `usr_${Date.now()}`,
      firstName, lastName, email, _pw: password,
      createdAt: new Date().toISOString(),
      onboarded: false,
    }
    saveUsers([...users, newUser])
    const { _pw, ...safe } = newUser
    _persist(safe)
    return { ok: true }
  }, [])

  const login = useCallback(async (email, password) => {
    const users = getUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (found) {
      if (found._pw !== password) return { ok: false, error: 'Incorrect password.' }
      const { _pw, ...safe } = found
      _persist(safe)
      return { ok: true }
    }
    // Fallback to Netlify function with 5s timeout
    try {
      const ctrl  = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 5000)
      const res   = await fetch('/.netlify/functions/auth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: ctrl.signal,
      })
      clearTimeout(timer)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      _persist(data.user, data.token)
      return { ok: true }
    } catch (err) {
      if (err.name === 'AbortError')
        return { ok: false, error: 'Request timed out. Please try again.' }
      return { ok: false, error: 'No account found with that email. Please sign up first.' }
    }
  }, [])

  const loginAsDemo = useCallback(() => {
    const demoUser = {
      id: 'usr_demo',
      firstName: 'Alex',
      lastName: 'Demo',
      email: 'demo@asyou.app',
      createdAt: new Date().toISOString(),
      onboarded: true,
      isDemo: true,
    }
    _persist(demoUser)
    // Pre-connect demo partners so the dashboard is populated
    localStorage.setItem('asyou_connected_partners', JSON.stringify(DEMO_PARTNERS))
    navigate('/dashboard')
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('asyou_connected_partners')
    setUser(null)
    navigate('/')
  }, [navigate])

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  function _persist(userData, token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    if (token) localStorage.setItem(TOKEN_KEY, token)
    setUser(userData)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
