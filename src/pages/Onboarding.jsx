import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import PartnerCard from '../components/PartnerCard.jsx'
import { ArrowRight, TrendingUp, ChevronRight } from 'lucide-react'

const MAX_PARTNERS = 5

export default function Onboarding() {
  const navigate                    = useNavigate()
  const { connectPartner }          = usePortfolio()
  const [selected, setSelected]     = useState([])
  const [submitting, setSubmitting] = useState(false)

  const available = PARTNERS.filter(p => p.apiStatus === 'available')

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
        <div className="flex items-center gap-2 mb-10">
          <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
          <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${selectedCount > 0 ? 'bg-emerald-500' : 'bg-white/10'}`} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Choose your brands</h1>
        <p className="text-slate-400 mb-2">
          Select up to <span className="text-white font-semibold">{MAX_PARTNERS} companies</span> you already use.
          You'll earn fractional shares each time you engage with them.
        </p>
        <div className="flex items-center gap-2 mb-8">
          <p className="text-slate-500 text-sm">
            {selectedCount} of {MAX_PARTNERS} selected
          </p>
          {selectedCount === MAX_PARTNERS && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Max reached
            </span>
          )}
        </div>

        {/* Partner grid */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {available.map(p => (
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

        {/* Coming soon */}
        <div className="mb-24">
          <p className="text-slate-600 text-xs font-medium mb-3 uppercase tracking-widest">Coming soon</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {PARTNERS.filter(p => p.apiStatus === 'coming_soon').map(p => (
              <PartnerCard key={p.id} partner={p} compact />
            ))}
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-gradient-to-t from-navy-900 via-navy-900/95 to-transparent">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-3 glass-card rounded-2xl p-4 border border-white/10">
              <div>
                <p className="text-white font-semibold">
                  {selectedCount > 0 ? `${selectedCount} brand${selectedCount > 1 ? 's' : ''} selected` : 'Select brands to get started'}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">You can add or remove brands any time</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedCount === 0 && (
                  <button
                    onClick={() => handleContinue(true)}
                    disabled={submitting}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    Skip
                  </button>
                )}
                <button
                  onClick={() => handleContinue(false)}
                  disabled={selectedCount === 0 || submitting}
                  className="btn-primary flex items-center gap-2 py-2.5 disabled:opacity-40"
                >
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : null}
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
