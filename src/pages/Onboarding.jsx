import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { PARTNERS } from '../services/mockData.js'
import PartnerCard from '../components/PartnerCard.jsx'
import { ArrowRight, TrendingUp } from 'lucide-react'

const MAX_PARTNERS = 5

export default function Onboarding() {
  const navigate              = useNavigate()
  const { connectPartner }    = usePortfolio()
  const [selected, setSelected] = useState([])
  const [step, setStep]       = useState(1) // 1 = select, 2 = done
  const [submitting, setSubmitting] = useState(false)

  const available = PARTNERS.filter(p => p.apiStatus === 'available')

  function toggle(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
        : prev.length < MAX_PARTNERS ? [...prev, id] : prev
    )
  }

  async function handleContinue() {
    setSubmitting(true)
    // Small simulated delay
    await new Promise(r => setTimeout(r, 800))
    selected.forEach(id => connectPartner(id))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col px-4 py-12">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl">asyou</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-1 flex-1 bg-emerald-500 rounded-full" />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-white/10'}`} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Choose your brands</h1>
        <p className="text-slate-400 mb-2">
          Select up to <span className="text-white font-semibold">{MAX_PARTNERS} companies</span> you already use.
          You'll earn fractional shares each time you engage with them.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          {selected.length} of {MAX_PARTNERS} selected
          {selected.length === MAX_PARTNERS && <span className="text-emerald-400 ml-2">· Max reached</span>}
        </p>

        {/* Partner grid */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
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

        {/* Coming soon partners */}
        <div className="mb-8">
          <p className="text-slate-500 text-xs font-medium mb-3 uppercase tracking-wider">Coming soon</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {PARTNERS.filter(p => p.apiStatus === 'coming_soon').map(p => (
              <PartnerCard key={p.id} partner={p} compact />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between sticky bottom-4 bg-navy-900/95 backdrop-blur-sm rounded-2xl p-4 border border-white/8">
          <div>
            <p className="text-white font-semibold">{selected.length} brands selected</p>
            <p className="text-slate-400 text-sm">You can add more later</p>
          </div>
          <button
            onClick={handleContinue}
            disabled={selected.length === 0 || submitting}
            className="btn-primary flex items-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
