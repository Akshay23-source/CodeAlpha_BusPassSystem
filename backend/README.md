# Backend API

## Quick start

```bash
cd backend
python -m pip install -r requirements.txt
cp .env.example .env
python app.py
```

## Key endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/pass/apply
- GET /api/pass/my
- GET /api/qr/generate
- POST /api/payment/create-order
