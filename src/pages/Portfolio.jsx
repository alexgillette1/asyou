import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import Navbar from '../components/Navbar.jsx'
import PortfolioChart from '../components/PortfolioChart.jsx'
import { TrendingUp, TrendingDown, Award, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Portfolio() {
  const { holdings, chartData, totalValue, totalGain, totalGainPct, totalEarned, loading } = usePortfolio()
  const isUp = totalGain >= 0

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading portfolio…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-16">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 page-enter">

        <h1 className="text-2xl font-bold text-white mb-1">Portfolio</h1>
        <p className="text-slate-400 text-sm mb-8">Your fractional share holdings from everyday app usage.</p>

        {/* Summary card */}
        <div className="glass-card rounded-2xl p-8 mb-5">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Total value</p>
          <div className="flex items-end gap-4 mb-1">
            <p className="text-5xl font-bold text-white">${totalValue.toFixed(2)}</p>
            <div className={`flex items-center gap-1.5 pb-1 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span className="font-semibold text-lg">
                {isUp ? '+' : ''}${Math.abs(totalGain).toFixed(2)} ({isUp ? '+' : ''}{totalGainPct.toFixed(1)}%)
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mb-6">All time return</p>
          <PortfolioChart data={chartData} />
        </div>

        {/* Rewards earned banner */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-4 mb-5">
          <div className="w-9 h-9 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">${totalEarned.toFixed(2)} earned in rewards</p>
            <p className="text-slate-400 text-sm">Fractional shares deposited automatically from app usage</p>
          </div>
          <Link to="/activity" className="text-emerald-400 text-sm hover:underline flex items-center gap-1 flex-shrink-0">
            View activity <TrendingUp className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Holdings table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-white font-bold">Holdings</h2>
            <Link to="/connect" className="flex items-center gap-1.5 text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
              <Link2 className="w-3.5 h-3.5" />
              Connect more
            </Link>
          </div>

          {/* Header row */}
          <div className="hidden sm:grid grid-cols-5 px-6 py-2.5 text-xs text-slate-500 font-medium uppercase tracking-wider border-b border-white/5 bg-white/2">
            <span className="col-span-2">Asset</span>
            <span className="text-right">Shares</span>
            <span className="text-right">Value</span>
            <span className="text-right">Return</span>
          </div>

          {holdings.map(h => {
            const partner = PARTNERS.find(p => p.id === h.partnerId)
            const value   = h.shares * h.currentPrice
            const gain    = value - h.shares * h.avgCost
            const gainPct = (h.currentPrice - h.avgCost) / h.avgCost * 100
            const up      = gain >= 0

            return (
              <div key={h.ticker} className="grid grid-cols-2 sm:grid-cols-5 items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                {/* Asset */}
                <div className="col-span-1 sm:col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                       style={{ background: `${partner?.color || '#333'}20` }}>
                    {partner?.logo
                      ? <img src={partner.logo} alt={partner?.name} className="w-7 h-7 object-contain" onError={e => { e.target.style.display='none' }} />
                      : <span className="text-sm font-bold" style={{ color: partner?.color || '#888' }}>{h.ticker[0]}</span>}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{partner?.name}</p>
                    <p className="text-slate-400 text-xs">${h.ticker} · {partner?.category}</p>
                  </div>
                </div>

                {/* Shares */}
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-medium">{h.shares.toFixed(4)}</p>
                  <p className="text-slate-500 text-xs">@${h.currentPrice.toFixed(2)}</p>
                </div>

                {/* Value */}
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-semibold">${value.toFixed(2)}</p>
                  <p className="text-slate-500 text-xs">cost ${(h.shares * h.avgCost).toFixed(2)}</p>
                </div>

                {/* Return — always visible, right-side on mobile */}
                <div className="text-right col-span-1">
                  <p className={`text-sm font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {up ? '+' : ''}{gainPct.toFixed(1)}%
                  </p>
                  <p className={`text-xs ${up ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                    {up ? '+' : ''}${gain.toFixed(2)}
                  </p>
                </div>
              </div>
            )
          })}

          {holdings.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-slate-400 mb-2">No holdings yet.</p>
              <Link to="/connect" className="text-emerald-400 hover:underline text-sm">
                Connect a partner to start earning →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
