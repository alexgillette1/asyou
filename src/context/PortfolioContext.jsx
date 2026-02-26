import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { MOCK_HOLDINGS, MOCK_ACTIVITY, PORTFOLIO_CHART_DATA, PARTNERS } from '../services/mockData.js'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [holdings, setHoldings]           = useState([])
  const [activity, setActivity]           = useState([])
  const [chartData, setChartData]         = useState([])
  const [connectedPartners, setConnected] = useState([])
  const [loading, setLoading]             = useState(true)

  useEffect(() => {
    // Load connected partners from localStorage
    try {
      const stored = localStorage.getItem('asyou_connected_partners')
      if (stored) setConnected(JSON.parse(stored))
    } catch (_) {}

    // Simulate API fetch with a brief delay
    setTimeout(() => {
      setHoldings(MOCK_HOLDINGS)
      setActivity(MOCK_ACTIVITY)
      setChartData(PORTFOLIO_CHART_DATA)
      setLoading(false)
    }, 600)
  }, [])

  const connectPartner = useCallback((partnerId) => {
    setConnected(prev => {
      if (prev.includes(partnerId)) return prev
      const next = [...prev, partnerId]
      localStorage.setItem('asyou_connected_partners', JSON.stringify(next))
      return next
    })
  }, [])

  const disconnectPartner = useCallback((partnerId) => {
    setConnected(prev => {
      const next = prev.filter(id => id !== partnerId)
      localStorage.setItem('asyou_connected_partners', JSON.stringify(next))
      return next
    })
  }, [])

  // Derived values
  const totalValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0)
  const totalCost  = holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0)
  const totalGain  = totalValue - totalCost
  const totalGainPct = totalCost > 0 ? (totalGain / totalCost) * 100 : 0
  const totalEarned = holdings.reduce((sum, h) => sum + h.totalEarned, 0)

  const availablePartners = PARTNERS.filter(p => !connectedPartners.includes(p.id))

  return (
    <PortfolioContext.Provider value={{
      holdings,
      activity,
      chartData,
      connectedPartners,
      loading,
      totalValue,
      totalCost,
      totalGain,
      totalGainPct,
      totalEarned,
      availablePartners,
      connectPartner,
      disconnectPartner,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>')
  return ctx
}
