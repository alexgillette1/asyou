import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import Navbar from '../components/Navbar.jsx'
import PartnerCard from '../components/PartnerCard.jsx'
import ConnectModal from '../components/ConnectModal.jsx'
import { Search, Zap } from 'lucide-react'

const CATEGORIES = ['All', 'Transportation', 'Fitness', 'Entertainment', 'Social', 'Retail', 'Telecom', 'Technology']

export default function Connect() {
  const { connectedPartners, disconnectPartner } = usePortfolio()
  const [selectedPartner, setSelectedPartner]   = useState(null)
  const [query, setQuery]                       = useState('')
  const [category, setCategory]                 = useState('All')

  const filtered = PARTNERS.filter(p => {
    const matchQ = p.name.toLowerCase().includes(query.toLowerCase()) ||
                   p.ticker.toLowerCase().includes(query.toLowerCase())
    const matchC = category === 'All' || p.category === category
    return matchQ && matchC
  })

  const connected   = filtered.filter(p => connectedPartners.includes(p.id))
  const unconnected = filtered.filter(p => !connectedPartners.includes(p.id))
  const available   = unconnected.filter(p => p.apiStatus === 'available')
  const comingSoon  = unconnected.filter(p => p.apiStatus === 'coming_soon')

  return (
    <div className="min-h-screen bg-navy-900 pb-16">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 page-enter">

        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-bold text-white">Connect</h1>
          {connectedPartners.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium mt-1">
              <Zap className="w-3 h-3" />
              {connectedPartners.length} active
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm mb-8">
          Connect the apps you already use to start earning fractional shares daily.
        </p>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              className="input-field pl-10"
              placeholder="Search brands or tickers…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  category === c
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Connected brands */}
        {connected.length > 0 && (
          <section className="mb-10">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-soft" />
              Connected brands
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connected.map(p => (
                <PartnerCard key={p.id} partner={p} connected onDisconnect={disconnectPartner} />
              ))}
            </div>
          </section>
        )}

        {/* Available to connect */}
        {available.length > 0 && (
          <section className="mb-10">
            <h2 className="text-white font-bold mb-4">Available to connect</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {available.map(p => (
                <PartnerCard key={p.id} partner={p} onConnect={() => setSelectedPartner(p)} />
              ))}
            </div>
          </section>
        )}

        {/* Coming soon */}
        {comingSoon.length > 0 && (
          <section>
            <h2 className="text-slate-500 font-medium mb-4 text-xs uppercase tracking-widest">Coming soon</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoon.map(p => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400">No brands match your search.</p>
            <button onClick={() => { setQuery(''); setCategory('All') }}
              className="text-emerald-400 text-sm hover:underline mt-2">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {selectedPartner && (
        <ConnectModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />
      )}
    </div>
  )
}
