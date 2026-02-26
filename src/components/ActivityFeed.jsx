import { PARTNERS } from '../services/mockData.js'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function ActivityFeed({ items = [], limit }) {
  const displayed = limit ? items.slice(0, limit) : items

  return (
    <div className="space-y-1">
      {displayed.map(item => {
        const partner = PARTNERS.find(p => p.id === item.partnerId)
        return (
          <div
            key={item.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/3 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                   style={{ background: `${partner?.color || '#333'}20` }}>
                {partner?.logo || '📊'}
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-snug">{item.description}</p>
                <p className="text-slate-400 text-xs">{formatDate(item.date)} · {item.ticker}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <p className="text-emerald-400 text-sm font-semibold">+${item.earned.toFixed(2)}</p>
              <p className="text-slate-400 text-xs">+{item.shares.toFixed(4)} shares</p>
            </div>
          </div>
        )
      })}

      {displayed.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">No activity yet.</p>
          <p className="text-slate-500 text-xs mt-1">Connect a partner to start earning.</p>
        </div>
      )}
    </div>
  )
}
