import { Check, Plus, Clock, ExternalLink } from 'lucide-react'
import clsx from 'clsx'

export default function PartnerCard({ partner, connected, onConnect, onDisconnect, selectable, selected, onSelect, compact }) {
  const isComingSoon = partner.apiStatus === 'coming_soon'

  if (compact) {
    return (
      <div
        onClick={() => selectable && !isComingSoon && onSelect?.(partner.id)}
        className={clsx(
          'glass-card rounded-xl p-4 transition-all duration-200 cursor-pointer',
          selectable && !isComingSoon && 'hover:border-emerald-500/40 cursor-pointer',
          selected && 'border-emerald-500/60 bg-emerald-500/5',
          isComingSoon && 'opacity-50 cursor-not-allowed',
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{partner.logo}</span>
            <div>
              <p className="text-white font-semibold text-sm">{partner.name}</p>
              <p className="text-slate-400 text-xs">${partner.ticker}</p>
            </div>
          </div>
          {selectable && !isComingSoon && (
            <div className={clsx(
              'w-5 h-5 rounded-full border-2 transition-all',
              selected ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
            )}>
              {selected && <Check className="w-3 h-3 text-white m-0.5" />}
            </div>
          )}
          {isComingSoon && (
            <span className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded-full">Soon</span>
          )}
        </div>
        <p className="text-slate-400 text-xs mt-2">{partner.rewardLabel}</p>
      </div>
    )
  }

  return (
    <div className={clsx(
      'glass-card rounded-2xl p-6 transition-all duration-200',
      !isComingSoon && 'glass-card-hover',
      connected && 'border-emerald-500/30',
      isComingSoon && 'opacity-60',
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
               style={{ background: `${partner.color}20` }}>
            {partner.logo}
          </div>
          <div>
            <h3 className="text-white font-semibold">{partner.name}</h3>
            <p className="text-slate-400 text-sm">${partner.ticker}</p>
          </div>
        </div>

        {connected ? (
          <span className="flex items-center gap-1 text-xs bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <Check className="w-3 h-3" />
            Connected
          </span>
        ) : isComingSoon ? (
          <span className="flex items-center gap-1 text-xs bg-white/5 text-slate-400 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            Coming Soon
          </span>
        ) : null}
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{partner.description}</p>

      {/* Reward rate */}
      <div className="flex items-center gap-2 mb-5 p-3 bg-white/3 rounded-lg border border-white/5">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-soft" />
        <span className="text-emerald-400 text-sm font-medium">{partner.rewardLabel}</span>
      </div>

      {/* Category */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">{partner.category}</span>

        {!isComingSoon && (
          connected ? (
            <button
              onClick={() => onDisconnect?.(partner.id)}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-400/30"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => onConnect?.(partner.id)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3 h-3" />
              Connect
            </button>
          )
        )}
      </div>
    </div>
  )
}
