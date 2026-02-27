import { Check, Plus, Clock } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

function BrandLogo({ partner, size = 'md' }) {
  const [imgError, setImgError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  const sizeMap = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-14 h-14 text-2xl',
  }
  const imgSizeMap = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  }

  const letter = partner.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <div
      className={clsx('rounded-xl flex items-center justify-center flex-shrink-0', sizeMap[size])}
      style={{ background: `${partner.color}22` }}
    >
      {!imgError ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className={clsx('object-contain rounded', imgSizeMap[size])}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : !fallbackError ? (
        <img
          src={partner.logoFallback}
          alt={partner.name}
          className={clsx('object-contain rounded', imgSizeMap[size])}
          onError={() => setFallbackError(true)}
          loading="lazy"
        />
      ) : (
        <span
          className="font-bold text-white/80"
          style={{ color: partner.color }}
        >
          {letter}
        </span>
      )}
    </div>
  )
}

export default function PartnerCard({ partner, connected, onConnect, onDisconnect, selectable, selected, onSelect, compact }) {
  const isComingSoon = partner.apiStatus === 'coming_soon'

  if (compact) {
    return (
      <div
        onClick={() => selectable && !isComingSoon && onSelect?.(partner.id)}
        className={clsx(
          'glass-card rounded-xl p-4 transition-all duration-200',
          selectable && !isComingSoon && 'hover:border-emerald-500/40 cursor-pointer',
          selected && 'border-emerald-500/60 bg-emerald-500/5',
          isComingSoon && 'opacity-50 cursor-not-allowed',
          !selectable && 'cursor-default',
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo partner={partner} size="sm" />
            <div>
              <p className="text-white font-semibold text-sm">{partner.name}</p>
              <p className="text-slate-400 text-xs">${partner.ticker}</p>
            </div>
          </div>
          {selectable && !isComingSoon && (
            <div className={clsx(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
              selected ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
            )}>
              {selected && <Check className="w-3 h-3 text-white" />}
            </div>
          )}
          {isComingSoon && (
            <span className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded-full flex-shrink-0">Soon</span>
          )}
        </div>
        <p className="text-slate-400 text-xs mt-2 line-clamp-2">{partner.rewardLabel}</p>
      </div>
    )
  }

  return (
    <div className={clsx(
      'glass-card rounded-2xl p-6 transition-all duration-200 flex flex-col',
      !isComingSoon && 'glass-card-hover',
      connected && 'border-emerald-500/30',
      isComingSoon && 'opacity-60',
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <BrandLogo partner={partner} size="md" />
          <div>
            <h3 className="text-white font-semibold leading-tight">{partner.name}</h3>
            <p className="text-slate-400 text-sm">${partner.ticker}</p>
          </div>
        </div>

        {connected ? (
          <span className="flex items-center gap-1 text-xs bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 flex-shrink-0">
            <Check className="w-3 h-3" />
            Connected
          </span>
        ) : isComingSoon ? (
          <span className="flex items-center gap-1 text-xs bg-white/5 text-slate-400 px-2.5 py-1 rounded-full flex-shrink-0">
            <Clock className="w-3 h-3" />
            Coming Soon
          </span>
        ) : null}
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">{partner.description}</p>

      {/* Reward rate */}
      <div className="flex items-center gap-2 mb-5 p-3 bg-white/3 rounded-lg border border-white/5">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-soft flex-shrink-0" />
        <span className="text-emerald-400 text-sm font-medium">{partner.rewardLabel}</span>
      </div>

      {/* Footer */}
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
