// ─── POST /auth-register ─────────────────────────────────────────────────────
// Creates a new user account.
// For MVP: stores in-memory / returns a mock JWT.
// Production: replace with real DB (Supabase, Postgres) + bcrypt + real JWT.

exports.handler = async (event) => {
  const headers = cors()

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers }
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }

  try {
    const { firstName, lastName, email, password } = JSON.parse(event.body || '{}')

    if (!firstName || !lastName || !email || !password) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'All fields are required.' }) }
    }

    if (password.length < 8) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Password must be at least 8 characters.' }) }
    }

    // ─── TODO: Replace with real DB insert + bcrypt hash ─────────────────
    // const hashedPw = await bcrypt.hash(password, 12)
    // const user = await db.users.create({ firstName, lastName, email, password: hashedPw })
    // ─────────────────────────────────────────────────────────────────────

    const user = {
      id:         `usr_${Date.now()}`,
      firstName,
      lastName,
      email,
      createdAt:  new Date().toISOString(),
      onboarded:  false,
    }

    // ─── TODO: Replace with real JWT signing ─────────────────────────────
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    const token = `mock_token_${user.id}`
    // ─────────────────────────────────────────────────────────────────────

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ user, token }),
    }
  } catch (err) {
    console.error('[auth-register]', err)
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
