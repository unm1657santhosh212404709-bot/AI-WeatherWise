# AI WeatherWise
Node.js + Express + MongoDB backend with OpenWeatherMap weather and Google Gemini insights (MVC).

## Setup (Node 18+)
1. `npm install`
2. Edit `.env` (MONGO_URI, JWT_SECRET). GEMINI_API_KEY and OPENWEATHER_API_KEY are optional; fallback mode works without them.
3. `npm start` (or `npm run dev`)

## Endpoints
| Method | Route | Auth |
|---|---|---|
| POST | /api/auth/register {name,email,password} | - |
| POST | /api/auth/login {email,password} | - |
| GET/PUT | /api/auth/profile | Bearer |
| POST/GET | /api/locations {city,country} | Bearer |
| PUT/DELETE | /api/locations/:id | Bearer |
| GET | /api/weather/:city | public |
| GET | /api/ai/summary/:city | Bearer |
| GET | /api/ai/recommendations/:city | Bearer |
| GET | /api/admin/users, /api/admin/stats | Admin |
| PUT | /api/admin/users/:id/suspend {suspended:true} | Admin |
| DELETE | /api/admin/users/:id | Admin |
| GET | /api/health | - |

To make an admin, set `role: "admin"` on the user document in MongoDB.
