import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const RANGES = [
  { label: '1W', days: 7  },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: 'ALL', days: 999 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl px-3 py-2 text-sm shadow-xl">
      <p className="text-slate-400 text-xs mb-0.5">{label}</p>
      <p className="text-white font-semibold">${payload[0].value.toFixed(2)}</p>
    </div>
  )
}

export default function PortfolioChart({ data }) {
  const [range, setRange] = useState('1M')

  const days    = RANGES.find(r => r.label === range)?.days || 30
  const sliced  = data.slice(-Math.min(days, data.length))

  const first = sliced[0]?.value || 0
  const last  = sliced[sliced.length - 1]?.value || 0
  const isUp  = last >= first

  return (
    <div>
      {/* Range selector */}
      <div className="flex gap-1 mb-4">
        {RANGES.map(r => (
          <button
            key={r.label}
            onClick={() => setRange(r.label)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              range === r.label
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={sliced} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={isUp ? '#10B981' : '#EF4444'} stopOpacity={0.25} />
              <stop offset="95%" stopColor={isUp ? '#10B981' : '#EF4444'} stopOpacity={0.0}  />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={Math.floor(sliced.length / 5)}
          />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={isUp ? '#10B981' : '#EF4444'}
            strokeWidth={2}
            fill="url(#chartGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
