import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import Navbar from '../components/Navbar.jsx'
import PortfolioChart from '../components/PortfolioChart.jsx'
import ActivityFeed from '../components/ActivityFeed.jsx'
import { TrendingUp, TrendingDown, Plus, Zap, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { user }                                          = useAuth()
  const { holdings, activity, chartData, connectedPartners,
          totalValue, totalGain, totalGainPct, totalEarned, loading } = usePortfolio()

  const isUp = totalGain >= 0

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Good {getGreeting()}, {user?.firstName || 'there'} 👋
          </h1>
          <p className="text-slate-400 mt-1">Here's how your portfolio is doing.</p>
        </div>

        {/* Top stat cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total portfolio value</p>
            <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
            <div className={`flex items-center gap-1.5 mt-1 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isUp ? '+' : ''}{totalGain.toFixed(2)} ({isUp ? '+' : ''}{totalGainPct.toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total rewards earned</p>
            <p className="text-3xl font-bold text-white">${totalEarned.toFixed(2)}</p>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              From {connectedPartners.length} connected {connectedPartners.length === 1 ? 'brand' : 'brands'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Holdings</p>
            <p className="text-3xl font-bold text-white">{holdings.length}</p>
            <Link to="/connect" className="flex items-center gap-1 text-emerald-400 text-sm mt-1 hover:underline">
              <Plus className="w-3.5 h-3.5" />
              Connect more brands
            </Link>
          </div>
        </div>

        {/* Chart + Holdings row */}
        <div className="grid lg:grid-cols-5 gap-6 mb-6">
          {/* Chart */}
          <div className="lg:col-span-3 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold">Portfolio performance</h2>
                <p className="text-slate-400 text-sm">30-day history</p>
              </div>
              <Link to="/portfolio" className="text-emerald-400 text-sm hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <PortfolioChart data={chartData} />
          </div>

          {/* Holdings */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Holdings</h2>
              <Link to="/portfolio" className="text-emerald-400 text-sm hover:underline flex items-center gap-1">
                All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-1">
              {holdings.map(h => {
                const partner = PARTNERS.find(p => p.id === h.partnerId)
                const value = h.shares * h.currentPrice
                const gain  = (h.currentPrice - h.avgCost) / h.avgCost * 100
                const up    = gain >= 0
                return (
                  <div key={h.ticker} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{partner?.logo || '📊'}</span>
                      <div>
                        <p className="text-white text-sm font-semibold">${h.ticker}</p>
                        <p className="text-slate-400 text-xs">{h.shares.toFixed(4)} shares</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-semibold">${value.toFixed(2)}</p>
                      <p className={`text-xs font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                        {up ? '+' : ''}{gain.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )
              })}

              {holdings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">No holdings yet.</p>
                  <Link to="/connect" className="text-emerald-400 text-sm hover:underline mt-1 block">
                    Connect your first brand →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">Recent activity</h2>
            <Link to="/activity" className="text-emerald-400 text-sm hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ActivityFeed items={activity} limit={5} />
        </div>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}
