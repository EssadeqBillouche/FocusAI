# TaskIQ

TaskIQ is a full-stack intelligent task management application built with the MERN stack.  
It combines clean architecture, JWT authentication, CRUD task management, and rule-based AI-like assistance (smart prioritization, recommendations, and productivity insights).

## Highlights

- JWT authentication (register, login, current user)
- Task CRUD by authenticated user
- Smart task prioritization (rule-based)
- Recommended next tasks (rule-based)
- Dashboard insights for charts (completion and priority analytics)
- Clean backend layering:
  - routes -> controllers -> services -> repositories -> models
- React frontend with reusable components and API service layer

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- React Toastify
- Recharts

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- express-validator

### DevOps
- Docker + Docker Compose

## Project Structure

```text
FocusAI/
├── app/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── models/
│   │   │   ├── middlewares/
│   │   │   ├── routes/
│   │   │   ├── presentation/
│   │   │   └── utils/
│   │   ├── Dockerfile
│   │   └── .env.example
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── context/
│       │   ├── routes/
│       │   └── services/
│       ├── Dockerfile
│       └── .env.example
├── docker-compose.yml
└── README.md
```

## Backend API

Base paths:
- Versioned: `/api-v1`
- Compatibility aliases: `/api`

### Auth
- `POST /api-v1/auth/register`
- `POST /api-v1/auth/login`
- `GET /api-v1/auth/me`

### Tasks
- `GET /api-v1/tasks`
- `POST /api-v1/tasks`
- `GET /api-v1/tasks/:id`
- `PATCH /api-v1/tasks/:id`
- `DELETE /api-v1/tasks/:id`
- `GET /api-v1/tasks/smart-priority`
- `GET /api-v1/tasks/recommendations`

### Dashboard
- `GET /api-v1/dashboard/stats`
- `GET /api-v1/dashboard/insights`

## AI-Like Rule-Based Features

Implemented in backend service layer (no external AI API):

- Smart priority assignment based on:
  - deadline proximity
  - task age (creation date)
  - completion status
- Recommendation sorting based on:
  - pending tasks first
  - urgency
  - deadline and priority
- Insights output for chart rendering:
  - total/completed/pending
  - completion rate
  - chartData and priorityData

## Local Setup (Without Docker)

## 1) Backend

```bash
cd app/backend
cp .env.example .env
npm install
npm run dev
```

## 2) Frontend

```bash
cd app/frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and calls backend via `VITE_API_URL`.

## Environment Variables

### Backend (`app/backend/.env`)

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/taskiq
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

For multiple frontend origins:

```env
FRONTEND_URLS=http://localhost:5173,https://your-frontend-domain.com
```

### Frontend (`app/frontend/.env`)

```env
VITE_API_URL=/api-v1
VITE_API_PROXY_TARGET=http://localhost:5000
```

## Docker Setup

From repository root:

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api-v1`
- MongoDB: `mongodb://localhost:27017`

Stop services:

```bash
docker compose down
```

Reset DB volume:

```bash
docker compose down -v
```

## Architecture Notes

- Models contain schema/entity definitions only
- Services contain business logic
- Controllers only orchestrate request/response
- Repositories handle database access only
- Middleware handles auth, validation, and error processing

## Current Status

TaskIQ is production-structured for a PFE/final-year project with:
- clean layering,
- deterministic intelligent assistance,
- chart-ready analytics,
- dockerized deployment path.
