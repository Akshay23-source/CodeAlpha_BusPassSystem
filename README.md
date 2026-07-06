# CodeAlpha_BusPassSystem

## Overview
A full-stack bus pass management system with a Flask backend for authentication and pass handling, and a modern React frontend for signup, login, dashboard access, and pass application.

## What’s included
- User registration and login with JWT-based authentication
- Bus pass application flow with route selection
- Personalized dashboard with pass summary and travel insights
- Polished modern UI for a stronger user experience
- Backend APIs for auth and pass management

## Current frontend features
- Smart sign-up and login experience
- Travel dashboard with pass cards and stats
- Route-based pass application
- Responsive UI for desktop and mobile

## Run locally

### Backend
```bash
cd /c/Users/Student/Documents/GitHub/CodeAlpha_BusPassSystem/backend
python -m pip install -r requirements.txt
python app.py
```

Backend URL:
- http://127.0.0.1:5000

### Frontend
```bash
cd /c/Users/Student/Documents/GitHub/CodeAlpha_BusPassSystem/frontend
npm install
npm start
```

Frontend URL:
- http://localhost:3000

## API endpoints
- POST /api/auth/register {name, email, password}
- POST /api/auth/login {email, password} → token
- POST /api/pass/apply {route} (requires JWT)
- GET /api/pass/my (requires JWT)

## Tech stack
- Backend: Flask, Flask-CORS, Flask-JWT-Extended, Flask-SQLAlchemy
- Frontend: React, React Router, CSS-based UI, Fetch API
- Database: SQLAlchemy-compatible backend setup

## Verification
The app has been verified with:
- Frontend tests: `CI=true npm test -- --watch=false`
- Frontend build: `npm run build`
- Backend auth flow: registration and login requests succeeded

Enjoy your BusPassSystem! 🚀
