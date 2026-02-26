import { usePortfolio } from '../context/PortfolioContext.jsx'
import Navbar from '../components/Navbar.jsx'
import ActivityFeed from '../components/ActivityFeed.jsx'
import { Zap, DollarSign, TrendingUp } from 'lucide-react'

export default function Activity() {
  const { activity, totalEarned, loading } = usePortfolio()

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading activity…</p>
        </div>
      </div>
    )
  }

  const totalShares = activity.reduce((sum, a) => sum + a.shares, 0)

  return (
    <div className="min-h-screen bg-navy-900 pb-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 page-enter">

        <h1 className="text-2xl font-bold text-white mb-1">Activity</h1>
        <p className="text-slate-400 text-sm mb-8">Every reward event from your connected brands.</p>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-white font-bold text-lg">${totalEarned.toFixed(2)}</p>
            <p className="text-slate-400 text-xs mt-0.5">Total earned</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-white font-bold text-lg">{activity.length}</p>
            <p className="text-slate-400 text-xs mt-0.5">Reward events</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-white font-bold text-lg">{totalShares.toFixed(3)}</p>
            <p className="text-slate-400 text-xs mt-0.5">Shares earned</p>
          </div>
        </div>

        {/* Feed */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-white font-bold">All transactions</h2>
          </div>
          <div className="p-2">
            <ActivityFeed items={activity} />
          </div>
        </div>
      </div>
    </div>
  )
}
