import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import Navbar from '../components/Navbar.jsx'
import PartnerCard from '../components/PartnerCard.jsx'
import ConnectModal from '../components/ConnectModal.jsx'
import { Search } from 'lucide-react'

const CATEGORIES = ['All', 'Transportation', 'Fitness', 'Entertainment', 'Social', 'Retail', 'Telecom', 'Technology']

export default function Connect() {
  const { connectedPartners, disconnectPartner } = usePortfolio()
  const [selectedPartner, setSelectedPartner]   = useState(null) // for modal
  const [query, setQuery]                       = useState('')
  const [category, setCategory]                 = useState('All')

  const filtered = PARTNERS.filter(p => {
    const matchQ = p.name.toLowerCase().includes(query.toLowerCase()) || p.ticker.toLowerCase().includes(query.toLowerCase())
    const matchC = category === 'All' || p.category === category
    return matchQ && matchC
  })

  const connected   = filtered.filter(p => connectedPartners.includes(p.id))
  const unconnected = filtered.filter(p => !connectedPartners.includes(p.id))

  return (
    <div className="min-h-screen bg-navy-900 pb-12">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24">

        <h1 className="text-2xl font-bold text-white mb-1">Connect</h1>
        <p className="text-slate-400 text-sm mb-8">
          Connect the apps you already use to start earning fractional shares.
          {connectedPartners.length > 0 && (
            <span className="text-emerald-400 ml-2">{connectedPartners.length} connected</span>
          )}
        </p>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                  category === c
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Connected */}
        {connected.length > 0 && (
          <section className="mb-8">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Connected brands
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connected.map(p => (
                <PartnerCard
                  key={p.id}
                  partner={p}
                  connected
                  onDisconnect={disconnectPartner}
                />
              ))}
            </div>
          </section>
        )}

        {/* Available */}
        {unconnected.filter(p => p.apiStatus === 'available').length > 0 && (
          <section className="mb-8">
            <h2 className="text-white font-bold mb-4">Available to connect</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unconnected.filter(p => p.apiStatus === 'available').map(p => (
                <PartnerCard
                  key={p.id}
                  partner={p}
                  onConnect={() => setSelectedPartner(p)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Coming soon */}
        {unconnected.filter(p => p.apiStatus === 'coming_soon').length > 0 && (
          <section>
            <h2 className="text-slate-400 font-medium mb-4 text-sm uppercase tracking-wider">Coming soon</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unconnected.filter(p => p.apiStatus === 'coming_soon').map(p => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">No brands match your search.</p>
          </div>
        )}
      </div>

      {/* Connect modal */}
      {selectedPartner && (
        <ConnectModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </div>
  )
}
