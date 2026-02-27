import { useState, useMemo } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS, CATEGORIES } from '../services/mockData.js'
import Navbar from '../components/Navbar.jsx'
import PartnerCard from '../components/PartnerCard.jsx'
import ConnectModal from '../components/ConnectModal.jsx'
import { Search, Zap, X, ChevronDown } from 'lucide-react'

const PAGE_SIZE = 24

export default function Connect() {
  const { connectedPartners, disconnectPartner } = usePortfolio()
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [query, setQuery]                     = useState('')
  const [category, setCategory]               = useState('All')
  const [showAllCats, setShowAllCats]         = useState(false)
  const [page, setPage]                       = useState(1)

  // Reset page when filters change
  const handleQuery    = (v) => { setQuery(v);    setPage(1) }
  const handleCategory = (c) => { setCategory(c); setPage(1) }
  const clearFilters   = () => { setQuery(''); setCategory('All'); setPage(1) }

  const filtered = useMemo(() => PARTNERS.filter(p => {
    const q = query.toLowerCase()
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.ticker.toLowerCase().includes(q)
    const matchC = category === 'All' || p.category === category
    return matchQ && matchC
  }), [query, category])

  const connected   = filtered.filter(p => connectedPartners.includes(p.id))
  const unconnected = filtered.filter(p => !connectedPartners.includes(p.id))
  const available   = unconnected.filter(p => p.apiStatus === 'active')
  const comingSoon  = unconnected.filter(p => p.apiStatus === 'coming_soon')

  // Paginate coming-soon brands
  const totalPages       = Math.ceil(comingSoon.length / PAGE_SIZE)
  const pagedComingSoon  = comingSoon.slice(0, page * PAGE_SIZE)
  const hasMore          = page < totalPages

  // Show first 8 categories + "More" toggle
  const SHOWN_CATS = showAllCats ? CATEGORIES : CATEGORIES.slice(0, 8)

  const hasFilters = query || category !== 'All'

  return (
    <div className="min-h-screen bg-navy-900 pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 page-enter">

        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-bold text-white">Connect Brands</h1>
          {connectedPartners.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium mt-1">
              <Zap className="w-3 h-3" />
              {connectedPartners.length} active
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm mb-8">
          {PARTNERS.length}+ brands from the S&amp;P 500, DJIA, and Russell 2000 — connect the apps you already use to earn fractional shares.
        </p>

        {/* Search + category bar */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              className="input-field pl-10 pr-10"
              placeholder="Search brands, tickers…"
              value={query}
              onChange={e => handleQuery(e.target.value)}
            />
            {query && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                onClick={() => handleQuery('')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            {SHOWN_CATS.map(c => (
              <button
                key={c}
                onClick={() => handleCategory(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  category === c
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => setShowAllCats(v => !v)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showAllCats ? 'Less' : `+${CATEGORIES.length - 8} more`}
              <ChevronDown className={`w-3 h-3 transition-transform ${showAllCats ? 'rotate-180' : ''}`} />
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors ml-auto"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results summary */}
        {hasFilters && filtered.length > 0 && (
          <p className="text-slate-500 text-xs mb-6">
            Showing {filtered.length} brand{filtered.length !== 1 ? 's' : ''}
            {category !== 'All' ? ` in ${category}` : ''}
            {query ? ` matching "${query}"` : ''}
          </p>
        )}

        {/* Connected brands */}
        {connected.length > 0 && (
          <section className="mb-10">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-soft" />
              Connected ({connected.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {connected.map(p => (
                <PartnerCard key={p.id} partner={p} connected onDisconnect={disconnectPartner} />
              ))}
            </div>
          </section>
        )}

        {/* Available to connect */}
        {available.length > 0 && (
          <section className="mb-10">
            <h2 className="text-white font-bold mb-4">
              Available to connect ({available.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {available.map(p => (
                <PartnerCard key={p.id} partner={p} onConnect={() => setSelectedPartner(p)} />
              ))}
            </div>
          </section>
        )}

        {/* Coming soon — paginated */}
        {comingSoon.length > 0 && (
          <section>
            <h2 className="text-slate-500 font-medium mb-4 text-xs uppercase tracking-widest flex items-center justify-between">
              Coming soon ({comingSoon.length})
              <span className="text-slate-600 normal-case text-xs font-normal">Showing {pagedComingSoon.length} of {comingSoon.length}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pagedComingSoon.map(p => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-sm rounded-xl border border-white/10 transition-all"
                >
                  Load more brands
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white font-semibold mb-1">No brands found</p>
            <p className="text-slate-400 text-sm mb-4">Try a different search or category.</p>
            <button
              onClick={clearFilters}
              className="text-emerald-400 text-sm hover:underline"
            >
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
