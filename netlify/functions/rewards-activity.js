// ─── GET /rewards-activity ────────────────────────────────────────────────────
// Returns reward events for the authenticated user.
// Production: query your DB for user's activity log.
//
// Reward calculation engine (to be built):
//   1. Pull usage data from partner APIs on a daily cron
//   2. Apply reward rate per partner (e.g. $0.10 per Peloton ride)
//   3. Batch-purchase fractional shares via DriveWealth API
//   4. DriveWealth sends allocation instructions to clearing BD
//   5. Persist event to your activity DB

const MOCK_ACTIVITY = [
  { id: 1,  date: '2024-03-15', partnerId: 'uber',    type: 'ride',    description: 'Uber ride — Downtown',       earned: 0.51, shares: 0.0071, ticker: 'UBER' },
  { id: 2,  date: '2024-03-14', partnerId: 'peloton', type: 'workout', description: 'Peloton Cycling — 30 min',   earned: 0.10, shares: 0.0205, ticker: 'PTON' },
  { id: 3,  date: '2024-03-13', partnerId: 'uber',    type: 'eats',    description: 'Uber Eats — Chipotle',       earned: 0.87, shares: 0.0122, ticker: 'UBER' },
  { id: 4,  date: '2024-03-13', partnerId: 'lyft',    type: 'ride',    description: 'Lyft ride — Airport',        earned: 1.23, shares: 0.0705, ticker: 'LYFT' },
  { id: 5,  date: '2024-03-12', partnerId: 'peloton', type: 'workout', description: 'Peloton Strength — 20 min',  earned: 0.10, shares: 0.0205, ticker: 'PTON' },
  { id: 6,  date: '2024-03-11', partnerId: 'uber',    type: 'ride',    description: 'Uber ride — Office',         earned: 0.42, shares: 0.0059, ticker: 'UBER' },
  { id: 7,  date: '2024-03-10', partnerId: 'lyft',    type: 'ride',    description: 'Lyft ride — Restaurant',     earned: 0.65, shares: 0.0373, ticker: 'LYFT' },
]

exports.handler = async (event) => {
  const headers = cors()
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers }

  const limit = parseInt(event.queryStringParameters?.limit || '20', 10)

  // ─── TODO: Replace with real DB query ────────────────────────────────
  // const activity = await db.rewardEvents
  //   .where({ userId })
  //   .orderBy('createdAt', 'desc')
  //   .limit(limit)
  // ─────────────────────────────────────────────────────────────────────

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ activity: MOCK_ACTIVITY.slice(0, limit) }),
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
