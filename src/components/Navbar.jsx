import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { LayoutDashboard, PieChart, Zap, Link2, Settings, LogOut, Menu, X, TrendingUp } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/portfolio', label: 'Portfolio',  icon: PieChart        },
  { to: '/activity',  label: 'Activity',   icon: Zap             },
  { to: '/connect',   label: 'Connect',    icon: Link2           },
]

export default function Navbar() {
  const { user, logout }          = useAuth()
  const { totalValue, totalGain } = usePortfolio()
  const [open, setOpen]           = useState(false)
  const navigate                  = useNavigate()

  if (!user) return null

  const gainPositive = totalGain >= 0
  const initial      = user.firstName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'A'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm shadow-emerald-500/30 group-hover:bg-emerald-600 transition-colors">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">asyou</span>
            {user.isDemo && (
              <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md font-medium">
                demo
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Portfolio mini-stat */}
            <div className="text-right">
              <p className="text-white text-sm font-semibold">${totalValue.toFixed(2)}</p>
              <p className={`text-xs ${gainPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {gainPositive ? '+' : ''}${Math.abs(totalGain).toFixed(2)} total
              </p>
            </div>

            {/* Avatar */}
            <button
              onClick={() => navigate('/settings')}
              className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold hover:bg-emerald-500/30 transition-colors ring-2 ring-transparent hover:ring-emerald-500/30"
              title="Settings"
            >
              {initial}
            </button>

            {/* Sign out */}
            <button
              onClick={logout}
              className="text-slate-500 hover:text-white transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-navy-900 px-4 py-3 animate-slide-up">
          {/* Mobile portfolio mini-stat */}
          <div className="flex items-center justify-between py-3 mb-2 border-b border-white/5">
            <div>
              <p className="text-slate-400 text-xs">Portfolio value</p>
              <p className="text-white font-semibold">${totalValue.toFixed(2)}</p>
            </div>
            <p className={`text-sm font-medium ${gainPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {gainPositive ? '+' : ''}${Math.abs(totalGain).toFixed(2)}
            </p>
          </div>

          <div className="space-y-0.5">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/settings"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors w-full mt-1"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
