import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import Navbar from '../components/Navbar.jsx'
import { User, Shield, Bell, LogOut, ChevronRight } from 'lucide-react'

export default function Settings() {
  const { user, logout, updateUser }          = useAuth()
  const { connectedPartners, disconnectPartner } = usePortfolio()
  const [saved, setSaved]                     = useState(false)
  const [form, setForm]                       = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' })

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function handleSave(e) {
    e.preventDefault()
    updateUser(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-12">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24">

        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400 text-sm mb-8">Manage your account and connected brands.</p>

        {/* Profile */}
        <section className="glass-card rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <User className="w-5 h-5 text-emerald-400" />
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
            <div className="flex items-center gap-3">
              <button type="submit" className="btn-primary text-sm py-2">
                {saved ? '✓ Saved!' : 'Save changes'}
              </button>
            </div>
          </form>
        </section>

        {/* Connected brands */}
        <section className="glass-card rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-bold">Connected brands</h2>
            <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full ml-auto">{connectedPartners.length} active</span>
          </div>

          {connectedPartners.length === 0 && (
            <p className="text-slate-400 text-sm">No brands connected yet.</p>
          )}

          <div className="space-y-2">
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
                    onClick={() => disconnectPartner(id)}
                    className="text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/8 hover:border-red-400/20"
                  >
                    Disconnect
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Notifications placeholder */}
        <section className="glass-card rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-bold">Notifications</h2>
          </div>
          <div className="space-y-3">
            {['Daily reward summary', 'New partner announcements', 'Portfolio milestone alerts'].map(label => (
              <label key={label} className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300 text-sm">{label}</span>
                <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
              </label>
            ))}
          </div>
        </section>

        {/* Danger zone */}
        <section className="glass-card rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Account</h2>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </section>
      </div>
    </div>
  )
}
