# CodeAlpha_BusPassSystem

## Overview
Full-stack Bus Pass Management System with Flask backend (auth, passes CRUD), React frontend (login/register/dashboard/apply pass/3D viz), Postgres DB, Docker.

## Features
- User registration/login (JWT)
- Apply/view bus passes (daily/monthly)
- Dashboard with pass list
- 3D bus visualizer (React Three Fiber)
- API: /api/register, /api/login, /api/passes (GET/POST)

## Quick Start (Docker)

```bash
# Clone & cd
git clone <repo> && cd CodeAlpha_BusPassSystem

# Start all services
docker compose up --build
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- DB: localhost:5432 (user/pass/buspass_db)

## Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
# Windows: venv\\Scripts\\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
# Set env: export DATABASE_URL=postgresql://user:pass@localhost/buspass_db
flask --app app run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

## API Docs
- POST /api/register {email, password}
- POST /api/login {email, password} → token
- GET /api/passes (auth header)
- POST /api/passes {pass_type: 'daily'|'monthly'}

## Tech Stack
- Backend: Flask, SQLAlchemy, JWT, Postgres
- Frontend: React 18, Vite, React Router, Axios, Three.js
- DevOps: Docker Compose

## Testing
1. Register/login at frontend
2. Apply pass → see in dashboard
3. Rotate 3D bus scene

Enjoy your BusPassSystem! 🚀
