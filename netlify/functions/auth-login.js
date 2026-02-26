// ─── POST /auth-login ─────────────────────────────────────────────────────────
// Authenticates a user by email + password.
// For MVP: accepts any well-formed email + password (no real DB check).
// Production: replace with DB lookup + bcrypt.compare + real JWT.

export const handler = async (event) => {
  const headers = cors()

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers }
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }

  try {
    const { email, password } = JSON.parse(event.body || '{}')

    if (!email || !password) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email and password are required.' }) }
    }

    // ─── TODO: Replace with real DB lookup + bcrypt.compare ──────────────
    // const user = await db.users.findByEmail(email)
    // if (!user) return { statusCode: 401, ...json({ error: 'Invalid credentials.' }) }
    // const valid = await bcrypt.compare(password, user.password)
    // if (!valid) return { statusCode: 401, ...json({ error: 'Invalid credentials.' }) }
    // ─────────────────────────────────────────────────────────────────────

    // MVP: simulate successful login for any credentials
    if (password.length < 1) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials.' }) }
    }

    const namePart = email.split('@')[0]
    const user = {
      id:        `usr_demo_${Date.now()}`,
      firstName: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      lastName:  'User',
      email,
      createdAt: new Date().toISOString(),
      onboarded: true,
    }

    // ─── TODO: Replace with real JWT signing ─────────────────────────────
    const token = `mock_token_${user.id}`
    // ─────────────────────────────────────────────────────────────────────

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ user, token }),
    }
  } catch (err) {
    console.error('[auth-login]', err)
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
