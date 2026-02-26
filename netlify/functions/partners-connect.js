// ─── POST /partners-connect ───────────────────────────────────────────────────
// Initiates OAuth connection to a partner app.
// Production: redirect to partner OAuth URL, handle callback, store tokens.
//
// Partner OAuth reference:
//   Uber:    https://developer.uber.com/docs/riders/guides/authentication/introduction
//   Peloton: https://api.onepeloton.com/auth/login  (username/password + session cookie)
//   Lyft:    https://developer.lyft.com/docs/authentication
//   Snap:    https://developers.snap.com/api/lens-studio/lens-studio-reference/toolkit/classes/SnapKitOAuthManager

export const handler = async (event) => {
  const headers = cors()
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers }
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }

  try {
    const { partnerId } = JSON.parse(event.body || '{}')
    if (!partnerId) return { statusCode: 400, headers, body: JSON.stringify({ error: 'partnerId required' }) }

    // ─── TODO: Initiate real OAuth flow ──────────────────────────────────
    // const partner = PARTNER_CONFIGS[partnerId]
    // if (!partner) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Unknown partner' }) }
    //
    // const state = crypto.randomBytes(16).toString('hex')
    // await db.oauthState.save({ state, partnerId, userId })
    //
    // const authUrl = `${partner.authEndpoint}?
    //   client_id=${partner.clientId}
    //   &redirect_uri=${encodeURIComponent(process.env.OAUTH_REDIRECT_URI)}
    //   &response_type=code
    //   &scope=${partner.scopes.join(',')}
    //   &state=${state}`
    //
    // return { statusCode: 200, headers, body: JSON.stringify({ authUrl }) }
    // ─────────────────────────────────────────────────────────────────────

    // MVP: simulate successful connection
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        partnerId,
        message: `Successfully connected ${partnerId} (mock)`,
        connectedAt: new Date().toISOString(),
      }),
    }
  } catch (err) {
    console.error('[partners-connect]', err)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error.' }) }
  }
}

function cors() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }
}
