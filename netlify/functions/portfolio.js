// ─── GET /portfolio ───────────────────────────────────────────────────────────
// Returns current portfolio holdings for authenticated user.
// Production: replace with DriveWealth API calls or internal DB.

const MOCK_HOLDINGS = [
  { partnerId: 'uber',    ticker: 'UBER', shares: 0.4821, avgCost: 68.42, currentPrice: 71.30, totalEarned: 34.56 },
  { partnerId: 'peloton', ticker: 'PTON', shares: 1.2340, avgCost: 5.10,  currentPrice: 4.87,  totalEarned: 6.03  },
  { partnerId: 'lyft',    ticker: 'LYFT', shares: 0.7654, avgCost: 16.20, currentPrice: 17.44, totalEarned: 13.34 },
]

exports.handler = async (event) => {
  const headers = cors()
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers }

  // ─── TODO: Verify JWT ─────────────────────────────────────────────────
  // const token = event.headers.authorization?.replace('Bearer ', '')
  // const payload = jwt.verify(token, process.env.JWT_SECRET)
  // const userId = payload.userId
  // ─────────────────────────────────────────────────────────────────────

  // ─── TODO: Fetch from DriveWealth ────────────────────────────────────
  // const dwHoldings = await driveWealth.getPortfolio(userId)
  // return { statusCode: 200, headers, body: JSON.stringify({ holdings: dwHoldings }) }
  // ─────────────────────────────────────────────────────────────────────

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ holdings: MOCK_HOLDINGS }),
  }
}

function cors() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  }
}
