import { usePortfolio } from '../context/PortfolioContext.jsx'
import Navbar from '../components/Navbar.jsx'
import ActivityFeed from '../components/ActivityFeed.jsx'
import { Zap, DollarSign, TrendingUp } from 'lucide-react'

export default function Activity() {
  const { activity, totalEarned, loading } = usePortfolio()

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const totalShares = activity.reduce((sum, a) => sum + a.shares, 0)

  return (
    <div className="min-h-screen bg-navy-900 pb-12">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24">

        <h1 className="text-2xl font-bold text-white mb-1">Activity</h1>
        <p className="text-slate-400 text-sm mb-8">Every reward event from your connected brands.</p>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-white font-bold">${totalEarned.toFixed(2)}</p>
            <p className="text-slate-400 text-xs">Total earned</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Zap className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-white font-bold">{activity.length}</p>
            <p className="text-slate-400 text-xs">Reward events</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-white font-bold">{totalShares.toFixed(3)}</p>
            <p className="text-slate-400 text-xs">Shares earned</p>
          </div>
        </div>

        {/* Feed */}
        <div className="glass-card rounded-2xl p-2">
          <ActivityFeed items={activity} />
        </div>
      </div>
    </div>
  )
}
