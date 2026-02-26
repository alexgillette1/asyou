# AsYou

**Earn fractional shares of the brands you use every day.**

AsYou is a rewards-based brokerage platform that turns everyday app usage (Uber rides, Peloton workouts, Lyft trips) into fractional shares of those same companies.

---

## Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Netlify Functions (Node.js serverless)
- **Routing**: React Router v6
- **Charts**: Recharts
- **Deploy**: Netlify

---

## Getting started locally

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your keys
cp .env.example .env

# 3. Run with Netlify Dev (recommended — runs both frontend + functions)
npx netlify dev

# Or just the frontend
npm run dev
```

---

## Project structure

```
asyou/
├── src/
│   ├── pages/          # Route pages (Landing, Dashboard, Portfolio, etc.)
│   ├── components/     # Reusable UI components
│   ├── context/        # React context (auth, portfolio)
│   └── services/       # API client + mock data
├── netlify/
│   └── functions/      # Serverless backend endpoints
├── netlify.toml        # Build + redirect config
└── .env.example        # Required environment variables
```

---

## Deploying to Netlify

1. Push this repo to GitHub
2. Log in to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Select your repo
4. Build settings are pre-configured via `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add your environment variables under **Site settings → Environment variables**
6. Deploy!

---

## Wiring up real APIs

The app ships with mock data. Each Netlify Function has clearly marked `TODO` comments showing exactly where to plug in:

| Integration | Function | Notes |
|---|---|---|
| **Auth / DB** | `auth-register.js`, `auth-login.js` | Add Supabase / Postgres + bcrypt + real JWT |
| **Broker-dealer** | `portfolio.js` | DriveWealth API for real holdings + trade execution |
| **Partner OAuth** | `partners-connect.js` | Uber, Peloton, Lyft OAuth 2.0 flows |
| **Bank linking** | Add `plaid-link.js` | Plaid Link for account funding |
| **Rewards engine** | `rewards-activity.js` | Daily cron: pull usage → calc rewards → batch-allocate shares |

---

## Partner APIs

| Partner | API | Auth method | Data endpoint |
|---|---|---|---|
| Uber | [Rides API](https://developer.uber.com/docs) | OAuth 2.0 | `GET /v1.2/history` |
| Peloton | [Peloton API](https://api.onepeloton.com) | Username/password session | `GET /api/user/{id}/workouts` |
| Lyft | [Lyft API](https://developer.lyft.com) | OAuth 2.0 | `GET /v1/rides` |
| Snap | [Snap Kit](https://developers.snap.com) | OAuth 2.0 | Login Kit |

---

## Regulatory notes

- Must register a Broker-Dealer with FINRA
- Clearing through a CBD (e.g. DriveWealth, Apex Clearing)
- Customer agreements must include SIPC disclosures
- Review SEC Reg BI for investment recommendation obligations
