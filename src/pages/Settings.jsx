import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import { useToast } from '../components/Toast.jsx'
import Navbar from '../components/Navbar.jsx'
import { User, Shield, Bell, LogOut, Check, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Settings() {
  const { user, logout, updateUser }              = useAuth()
  const { connectedPartners, disconnectPartner }  = usePortfolio()
  const { show }                                  = useToast()
  const [saving, setSaving]                       = useState(false)
  const [form, setForm]                           = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    email:     user?.email     || '',
  })

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 400)) // simulate save
    updateUser(form)
    show('Profile saved!', 'success')
    setSaving(false)
  }

  function handleDisconnect(id) {
    const partner = PARTNERS.find(p => p.id === id)
    disconnectPartner(id)
    show(`Disconnected from ${partner?.name || 'brand'}.`, 'info')
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-16">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 page-enter">

        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400 text-sm mb-8">Manage your account and connected brands.</p>

        {user?.isDemo && (
          <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-6 text-sm">
            <span className="text-amber-400">⚠</span>
            <p className="text-amber-300">
              You're in demo mode — changes won't persist.{' '}
              <Link to="/signup" className="underline hover:text-amber-200">Create a free account</Link> to save settings.
            </p>
          </div>
        )}

        {/* Profile */}
        <section className="glass-card rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-white font-bold">Profile</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">First name</label>
                <input className="input-field" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-medium mb-1.5 block">Last name</label>
                <input className="input-field" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Email</label>
              <input type="email" className="input-field" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <button type="submit" disabled={saving} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : <Check className="w-4 h-4" />}
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </section>

        {/* Connected brands */}
        <section className="glass-card rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-white font-bold">Connected brands</h2>
            <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-full ml-auto border border-white/8">
              {connectedPartners.length} active
            </span>
          </div>

          {connectedPartners.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-slate-400 text-sm mb-2">No brands connected yet.</p>
              <Link to="/connect" className="flex items-center gap-1.5 text-emerald-400 text-sm hover:underline justify-center">
                <Link2 className="w-3.5 h-3.5" />
                Connect your first brand
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {connectedPartners.map(id => {
                const partner = PARTNERS.find(p => p.id === id)
                if (!partner) return null
                return (
                  <div key={id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{partner.logo}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{partner.name}</p>
                        <p className="text-slate-500 text-xs">${partner.ticker} · {partner.rewardLabel}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDisconnect(id)}
                      className="text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/8 hover:border-red-400/30"
                    >
                      Disconnect
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Notifications */}
        <section className="glass-card rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-white font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Daily reward summary', sub: 'Get a summary of shares earned each day' },
              { label: 'New partner announcements', sub: 'Know when new brands join AsYou' },
              { label: 'Portfolio milestone alerts', sub: 'Celebrate when you hit a new value milestone' },
            ].map(({ label, sub }) => (
              <label key={label} className="flex items-start justify-between gap-4 cursor-pointer group">
                <div>
                  <p className="text-slate-200 text-sm group-hover:text-white transition-colors">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 mt-0.5 flex-shrink-0" />
              </label>
            ))}
          </div>
        </section>

        {/* Account / sign out */}
        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Account</h2>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors py-1"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </section>
      </div>
    </div>
  )
}
