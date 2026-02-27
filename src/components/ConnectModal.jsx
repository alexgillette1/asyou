import { useState } from 'react'
import { X, CheckCircle, Lock } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useToast } from './Toast.jsx'

function ModalLogo({ partner }) {
  const [err1, setErr1] = useState(false)
  const [err2, setErr2] = useState(false)
  return (
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
         style={{ background: `${partner.color}25` }}>
      {!err1 ? (
        <img src={partner.logo} alt={partner.name} className="w-9 h-9 object-contain rounded" onError={() => setErr1(true)} />
      ) : !err2 ? (
        <img src={partner.logoFallback} alt={partner.name} className="w-9 h-9 object-contain rounded" onError={() => setErr2(true)} />
      ) : (
        <span className="text-2xl font-bold" style={{ color: partner.color }}>{partner.name[0]}</span>
      )}
    </div>
  )
}

export default function ConnectModal({ partner, onClose }) {
  const { connectPartner } = usePortfolio()
  const { show }           = useToast()
  const [step, setStep]    = useState('consent')

  async function handleConnect() {
    setStep('connecting')
    await new Promise(r => setTimeout(r, 1200))
    connectPartner(partner.id)
    setStep('done')
  }

  function handleDone() {
    show(`Connected to ${partner.name}! You're now earning $${partner.ticker} rewards.`, 'success')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={step !== 'connecting' ? onClose : undefined} />
      <div className="relative glass-card rounded-2xl p-6 w-full max-w-md animate-slide-up shadow-2xl">
        <button onClick={step !== 'connecting' ? onClose : undefined} className="absolute top-4 right-4 text-slate-400 hover:text-white disabled:opacity-30">
          <X className="w-5 h-5" />
        </button>

        {step === 'consent' && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <ModalLogo partner={partner} />
              <div>
                <h2 className="text-white text-xl font-bold">Connect {partner.name}</h2>
                <p className="text-slate-400 text-sm">${partner.ticker} · {partner.category}</p>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-5">
              <p className="text-emerald-400 font-semibold text-sm">You'll earn:</p>
              <p className="text-white font-bold mt-0.5">{partner.rewardLabel}</p>
            </div>

            <div className="space-y-2.5 mb-5">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">AsYou will:</p>
              {['Read your usage and transaction data', 'Never access your passwords or payment methods', 'Calculate rewards daily and allocate fractional shares'].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  </div>
                  <p className="text-slate-300 text-sm">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs mb-5">
              <Lock className="w-3.5 h-3.5" />
              <span>256-bit encryption · OAuth 2.0 · Read-only access</span>
            </div>

            <button onClick={handleConnect} className="btn-primary w-full">
              Authorize {partner.name} Access
            </button>
          </>
        )}

        {step === 'connecting' && (
          <div className="flex flex-col items-center py-10">
            <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white font-semibold">Connecting {partner.name}…</p>
            <p className="text-slate-400 text-sm mt-1">Establishing secure connection</p>
          </div>
        )}

        {step === 'done' && (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-1">{partner.name} connected!</h3>
            <p className="text-slate-400 text-sm mb-0.5">You'll earn <span className="text-emerald-400 font-semibold">${partner.ticker}</span> rewards</p>
            <p className="text-slate-500 text-xs mb-6">Allocated daily from your usage</p>
            <button onClick={handleDone} className="btn-primary w-full">Done</button>
          </div>
        )}
      </div>
    </div>
  )
}
