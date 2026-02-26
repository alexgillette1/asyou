import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, CheckCircle, Zap, Shield, BarChart3 } from 'lucide-react'

const BRANDS = [
  { name: 'Uber',     ticker: 'UBER', logo: '🚗', color: '#000' },
  { name: 'Peloton',  ticker: 'PTON', logo: '🚴', color: '#FC3E3E' },
  { name: 'Lyft',     ticker: 'LYFT', logo: '🩷', color: '#FF00BF' },
  { name: 'Snapchat', ticker: 'SNAP', logo: '👻', color: '#FFFC00' },
  { name: 'Netflix',  ticker: 'NFLX', logo: '🎬', color: '#E50914' },
  { name: 'Apple',    ticker: 'AAPL', logo: '🍎', color: '#888' },
]

const HOW_STEPS = [
  {
    num: '01',
    title: 'Open your account',
    body: 'Sign up for a self-directed brokerage account in under 2 minutes. No minimum balance required.',
    icon: '🏦',
  },
  {
    num: '02',
    title: 'Connect your apps',
    body: 'Select up to 5 apps you already use — Uber, Peloton, Lyft, and more. Authorize read-only access.',
    icon: '🔗',
  },
  {
    num: '03',
    title: 'Live your life',
    body: 'Use your apps as you normally would. AsYou tracks your usage and calculates your daily rewards.',
    icon: '⚡',
  },
  {
    num: '04',
    title: 'Watch shares grow',
    body: 'Fractional shares are automatically deposited into your account. Buy, sell, or hold — it\'s your portfolio.',
    icon: '📈',
  },
]

const FEATURES = [
  { icon: Zap,      title: 'Real-time rewards',  body: 'Shares allocated within 24 hours of qualifying activity. No waiting, no points to redeem.' },
  { icon: Shield,   title: 'Bank-grade security', body: 'OAuth 2.0 connections, read-only data access, and 256-bit encryption on every request.' },
  { icon: BarChart3,title: 'True ownership',      body: 'Fractional shares are real equity. Follow along as you build a portfolio from your everyday habits.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* ─── Header ───────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">asyou</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="nav-link hidden sm:block">Sign in</Link>
            <Link to="/signup" className="btn-primary text-sm py-2 px-4">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden bg-mesh">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Now in early access
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
            Earn stock in the
            <span className="block text-gradient">brands you use</span>
            every day.
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            AsYou is a rewards brokerage that turns your everyday app usage into fractional shares of your favorite companies.
            Take an Uber. Get $UBER. Ride a Peloton. Get $PTON. That simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
              Start earning free shares
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how" className="btn-secondary w-full sm:w-auto justify-center text-sm">
              See how it works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> No account minimum</div>
            <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Commission-free</div>
            <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> SIPC protected</div>
          </div>
        </div>

        {/* Mock portfolio card */}
        <div className="relative max-w-sm mx-auto mt-16">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <p className="text-slate-400 text-xs mb-1">Total portfolio value</p>
            <p className="text-4xl font-bold text-white">$53.93</p>
            <p className="text-emerald-400 text-sm font-medium mt-0.5">↑ $12.73 all time (+30.9%)</p>
            <div className="mt-4 space-y-2">
              {[
                { name: 'Uber', ticker: 'UBER', logo: '🚗', value: '$34.37', change: '+4.2%', positive: true },
                { name: 'Lyft', ticker: 'LYFT', logo: '🩷', value: '$13.34', change: '+7.7%', positive: true },
                { name: 'Peloton', ticker: 'PTON', logo: '🚴', value: '$6.03', change: '-4.5%', positive: false },
              ].map(h => (
                <div key={h.ticker} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{h.logo}</span>
                    <span className="text-white text-sm font-medium">{h.name}</span>
                    <span className="text-slate-500 text-xs">${h.ticker}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-semibold">{h.value}</p>
                    <p className={`text-xs ${h.positive ? 'text-emerald-400' : 'text-red-400'}`}>{h.change}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <p className="text-slate-500 text-xs">Earned from everyday app usage ✨</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partner Brands ──────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-slate-400 text-sm font-medium mb-8 tracking-widest uppercase">
            Earn fractional shares from
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {BRANDS.map(b => (
              <div key={b.ticker} className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover:border-white/15 transition-all">
                <span className="text-3xl">{b.logo}</span>
                <span className="text-white text-sm font-semibold">{b.name}</span>
                <span className="text-slate-500 text-xs">${b.ticker}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">+ more partners launching soon</p>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────── */}
      <section id="how" className="py-20 px-4 sm:px-6 bg-navy-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">How AsYou works</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Four simple steps to start building wealth from the apps you already love.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_STEPS.map(s => (
              <div key={s.num} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-slate-600 font-bold text-xl">{s.num}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">Built for real investors</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Not points. Not cashback. Real fractional equity in the companies that matter to you.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card rounded-2xl p-6">
                <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Research Quote ───────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-navy-800/20 border-t border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white text-xl sm:text-2xl font-medium italic leading-relaxed mb-6">
            "Stock ownership as a motivation of brand-loyal behaviors leads to positive, increased motivation to exhibit brand loyalty towards the company."
          </p>
          <p className="text-slate-400 text-sm">Jaakko Aspara — Helsinki School of Economics, 2009</p>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-heading mb-4">Start earning today</h2>
          <p className="text-slate-400 text-lg mb-8">
            Open a free account in 2 minutes and connect the apps you already use.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Create free account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-slate-500 text-xs mt-4">No minimum balance · Commission-free · SIPC protected</p>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold">asyou</span>
          </div>
          <p className="text-slate-500 text-xs text-center max-w-md">
            AsYou is not a registered broker-dealer. Brokerage services are provided through our clearing partner.
            Investing involves risk. Past performance is not indicative of future results.
          </p>
          <p className="text-slate-600 text-xs">© 2024 AsYou Inc.</p>
        </div>
      </footer>
    </div>
  )
}
