# MotorDoctor.in - Backend API Server

Fast & reliable Node.js / Express backend powering MotorDoctor.in consultation audits, user authentication, and real-time visitor location tracking.

## 🚀 How to Run Backend

```bash
cd backend
npm install
npm run dev
# or
npm start
```

API Server runs at: `http://localhost:5000`

## 📡 API Endpoints

- `GET  /api/health` - Server health status and aggregate counts
- `POST /api/auth/register` - Register a new car owner account
- `POST /api/auth/login` - User login with phone or email
- `GET  /api/users` - List registered users (Admin)
- `POST /api/track-visitor` - Log visitor IP, GPS coordinates, device & browser
- `GET  /api/visitors` - Get live visitor locations & statistics (Admin)
- `POST /api/submit-bill` - Submit car estimate sheet for doctor review
- `GET  /api/track/:id` - Track audit ticket status
- `GET  /api/plans` - Consultation pricing plans
