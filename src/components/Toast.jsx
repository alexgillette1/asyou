import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let id = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, type = 'success', duration = 3500) => {
    const tid = ++id
    setToasts(t => [...t, { id: tid, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== tid)), duration)
  }, [])

  const dismiss = useCallback((tid) => setToasts(t => t.filter(x => x.id !== tid)), [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 glass-card rounded-xl px-4 py-3 shadow-xl min-w-[260px] max-w-sm animate-slide-up"
          >
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'error'   && <XCircle     className="w-4 h-4 text-red-400 flex-shrink-0" />}
            {toast.type === 'info'    && <Info        className="w-4 h-4 text-blue-400 flex-shrink-0" />}
            <p className="text-white text-sm flex-1">{toast.message}</p>
            <button onClick={() => dismiss(toast.id)} className="text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>')
  return ctx
}
