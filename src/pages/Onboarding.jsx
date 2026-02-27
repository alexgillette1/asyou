import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import PartnerCard from '../components/PartnerCard.jsx'
import { ArrowRight, TrendingUp, ChevronRight } from 'lucide-react'

const MAX_PARTNERS = 8

// Curated top ~24 consumer brands for onboarding (most recognizable)
const TOP_BRAND_IDS = [
  'uber', 'lyft', 'amazon', 'netflix', 'apple', 'starbucks',
  'peloton', 'walmart', 'target', 'nike', 'spotify', 'doordash',
  'tesla', 'google', 'meta', 'lululemon', 'tmobile', 'snap',
  'delta', 'ulta', 'airbnb', 'stitch-fix', 'chipotle', 'instacart',
]

const TOP_BRANDS = TOP_BRAND_IDS
  .map(id => PARTNERS.find(p => p.id === id))
  .filter(Boolean)

export default function Onboarding() {
  const navigate                    = useNavigate()
  const { connectPartner }          = usePortfolio()
  const [selected, setSelected]     = useState([])
  const [submitting, setSubmitting] = useState(false)

  function toggle(id) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX_PARTNERS ? [...prev, id] : prev
    )
  }

  async function handleContinue(skip = false) {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 600))
    if (!skip) selected.forEach(id => connectPartner(id))
    navigate('/dashboard')
  }

  const selectedCount = selected.length
  const progressPct   = Math.round((selectedCount / MAX_PARTNERS) * 100)

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col px-4 py-12">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl">asyou</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full page-enter">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-1.5 flex-1 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progressPct, 5)}%` }}
            />
          </div>
          <span className="text-slate-500 text-xs tabular-nums">
            {selectedCount}/{MAX_PARTNERS}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Which brands do you use?</h1>
        <p className="text-slate-400 mb-2">
          Select up to <span className="text-white font-semibold">{MAX_PARTNERS} brands</span> you already engage with.
          You'll earn fractional shares each time you use them.
        </p>
        <div className="flex items-center gap-2 mb-8">
          <p className="text-slate-500 text-sm">
            {selectedCount === 0
              ? 'Pick brands to get started'
              : `${selectedCount} of ${MAX_PARTNERS} selected`}
          </p>
          {selectedCount === MAX_PARTNERS && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Max selected
            </span>
          )}
        </div>

        {/* Brand grid — curated top brands */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {TOP_BRANDS.map(p => (
            <PartnerCard
              key={p.id}
              partner={p}
              compact
              selectable
              selected={selected.includes(p.id)}
              onSelect={toggle}
            />
          ))}
        </div>

        <p className="text-slate-600 text-xs text-center mb-24">
          300+ more brands available in the Connect tab after setup
        </p>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-gradient-to-t from-navy-900 via-navy-900/95 to-transparent">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-3 glass-card rounded-2xl p-4 border border-white/10">
              <div>
                <p className="text-white font-semibold">
                  {selectedCount > 0
                    ? `${selectedCount} brand${selectedCount > 1 ? 's' : ''} selected`
                    : 'Select brands to get started'}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">Add or remove any time from Connect</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedCount === 0 && (
                  <button
                    onClick={() => handleContinue(true)}
                    disabled={submitting}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors whitespace-nowrap"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    Skip
                  </button>
                )}
                <button
                  onClick={() => handleContinue(false)}
                  disabled={selectedCount === 0 || submitting}
                  className="btn-primary flex items-center gap-2 py-2.5 disabled:opacity-40 whitespace-nowrap"
                >
                  {submitting && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {submitting ? 'Connecting…' : 'Continue'}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
