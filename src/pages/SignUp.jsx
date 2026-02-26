import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { TrendingUp, Eye, EyeOff } from 'lucide-react'

export default function SignUp() {
  const { register }        = useAuth()
  const navigate            = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)
  const [form, setForm]     = useState({
    firstName: '', lastName: '', email: '', password: '', agreed: false,
  })

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.agreed) { setError('Please agree to the terms to continue.'); return }
    setLoading(true); setError(null)
    const result = await register(form)
    if (result.ok) {
      navigate('/onboarding')
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-xl">asyou</span>
      </Link>

      <div className="glass-card rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
        <p className="text-slate-400 text-sm mb-7">Start earning fractional shares from the apps you use.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">First name</label>
              <input
                className="input-field"
                placeholder="Alex"
                value={form.firstName}
                onChange={e => set('firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Last name</label>
              <input
                className="input-field"
                placeholder="Smith"
                value={form.lastName}
                onChange={e => set('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Email address</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={e => set('agreed', e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-emerald-500 rounded"
            />
            <span className="text-slate-400 text-sm leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>,{' '}
              <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>, and{' '}
              <a href="#" className="text-emerald-400 hover:underline">Customer Agreement</a>.
            </span>
          </label>

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account…
              </span>
            ) : 'Create account'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-emerald-400 hover:underline font-medium">Sign in</Link>
        </p>
      </div>

      <p className="text-slate-600 text-xs text-center max-w-sm mt-6">
        AsYou is not a registered broker-dealer. Brokerage services provided through our clearing partner.
        Investing involves risk.
      </p>
    </div>
  )
}
