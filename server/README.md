# Backend — Coding Challenge Platform

Node.js + Express + MongoDB (Mongoose) + JWT auth + JDoodle-based code execution.

## Setup

```bash
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your MongoDB instance, JWT_SECRET to a random string,
# and JDOODLE_CLIENT_ID / JDOODLE_CLIENT_SECRET (see below)

npm run seed   # loads 2 sample problems + an admin user (admin@example.com / changeme123)
npm run dev    # starts on http://localhost:4000
```

## Code execution — JDoodle (free, no Docker, no card)

Tried, in order: Judge0 (RapidAPI free tier turned out to require payment) → self-hosted
Judge0 (needs Docker) → glot.io (its `run.glot.io` API endpoint is dead, DNS doesn't resolve
anymore) → **JDoodle**, which actually works: free tier, 200 API credits/day, no credit card.

1. Sign up at https://www.jdoodle.com
2. Go to https://www.jdoodle.com/compiler-api and grab your **Client ID** and **Client Secret**
3. Set `JDOODLE_CLIENT_ID` and `JDOODLE_CLIENT_SECRET` in `server/.env`

Trade-offs vs Judge0: no polling (JDoodle responds synchronously, which is actually simpler),
200 requests/day cap on the free tier (each Run or Submit uses 1 request per test case, so a
4-test-case Submit costs 4 credits — plan accordingly if you're demoing this a lot in one day),
and language version indices (`versionIndex` in `judge/jdoodle.js`) may need adjusting if
JDoodle changes their compiler lineup — check your dashboard if you get a "language/version
not supported" error.

## Folder structure

```
config/       — DB connection
models/       — Mongoose schemas (User, Problem, Submission, Contest, Comment, HintReveal)
controllers/  — request handlers
routes/       — route definitions, mounted in server.js
middleware/   — JWT auth guard, admin gate, error handler
judge/        — JDoodle API client + test-case runner
services/     — scoring/streak logic shared across controllers
scripts/      — seed.js for local dev data
```

## API overview

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/register` | POST | — | Create account |
| `/api/auth/login` | POST | — | Get JWT |
| `/api/auth/me` | GET | user | Current user |
| `/api/problems` | GET | — | List/filter problems |
| `/api/problems/:id` | GET | — | Problem detail (hidden test cases stripped) |
| `/api/problems` | POST/PUT/DELETE | admin | CRUD |
| `/api/submissions/run` | POST | user | Run against sample cases (no scoring) |
| `/api/submissions/submit` | POST | user | Full test suite via JDoodle, updates score/streak |
| `/api/submissions/mine` | GET | user | Submission history |
| `/api/hints/reveal` | POST | user | Reveal a hint (-2 pts, once per hint) |
| `/api/leaderboard` | GET | — | Top users by score |
| `/api/users` | GET | admin | List all users |
| `/api/users/:id/ban` | POST | admin | Toggle ban |
| `/api/contests` | GET/POST | — / admin | List / create |
| `/api/contests/:id` | GET | — | Detail |
| `/api/contests/:id/leaderboard` | GET | — | Polled every ~15-20s by the client |
| `/api/problems/:problemId/comments` | GET/POST | — / user | Discussion threads |

## Notes

- JDoodle test cases use the stdin/stdout contract (code reads input, prints output) —
  different from the earlier frontend-only mock judge, which called a named function directly.
  Starter code in the seed data reflects this; you'll want to rewrite problem statements/starter
  code accordingly when migrating the rest of the mock problems.
- This was built and syntax-checked in a sandboxed environment without a live MongoDB or JDoodle
  connection available — verify against a real MongoDB instance and JDoodle credentials before deploying.
