# Service Marketplace

Service Marketplace is a small MERN-stack application for listing services, creating bookings, and managing jobs between customers and providers. This README describes the full project (backend + frontend), how to run it locally, and the available APIs.

Project highlights
- User roles: `customer`, `provider`, `admin` (JWT-based authentication)
- Customers can browse services, create bookings, and view their bookings
- Providers can create and manage services and update booking statuses
- Admins can view platform-level statistics via dashboard endpoints

This repository contains two main parts:
- `backend/` — Node.js + Express API (MongoDB + Mongoose)
- `frontend/` — React (Vite) single-page app

Important: the frontend expects the backend API base URL to be `http://localhost:5000/api` by default (see `src/services/api.js`).

Contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture & project structure](#architecture--project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration / Environment variables](#configuration--environment-variables)
- [Running locally](#running-locally)
- [API documentation (overview)](#api-documentation-overview)
- [Testing](#testing)
- [Deployment (notes)](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)

-----

## Features

- Browse services (search + category filter)
- Create bookings (customers)
- Providers: create/edit/delete services; view bookings for their services; update booking status through workflow: `pending` → `accepted` → `in_progress` → `completed` → `delivered` (or `cancelled`)
- Customers: view bookings, cancel bookings
- Dashboards: customer, provider, admin statistics endpoints
- JWT authentication with role-based authorization middleware

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Vite, Axios, React Router
- Authentication: JSON Web Tokens (JWT)
- Dev tooling: nodemon (backend), Vite (frontend)

## Architecture & project structure

Top-level folders (abridged):

- `backend/` — Express API
	- `controllers/` — request handlers (auth, services, bookings, dashboard)
	- `models/` — Mongoose models (`User`, `Service`, `Booking`)
	- `routes/` — route definitions (`/api/auth`, `/api/services`, `/api/bookings`, `/api/dashboard`)
	- `middleware/` — auth and role middleware
	- `config/db.js` — MongoDB connection
	- `server.js` — Express app entrypoint

- `frontend/` — React application (Vite)
	- `src/pages/` — page components (Services, MyBookings, dashboards, auth pages)
	- `src/components/` — shared components (Navbar, Footer, ProtectedRoute)
	- `src/services/api.js` — Axios instance pointing at backend API
	- `src/App.jsx` — application routes

Other files: top-level `package.json` files inside `backend/` and `frontend/` manage dependencies and dev scripts for each side.

## Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB Atlas or local MongoDB instance

## Installation

Clone the repository and install dependencies for both backend and frontend.

```bash
git clone <repo-url>
cd service-marketplace

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Configuration / Environment variables

Create a `.env` file in `backend/` with at least the following variables:

- `MONGO_URI` — MongoDB connection string (required)
- `JWT_SECRET` — secret used to sign JWT tokens (required)
- `PORT` — optional (defaults to 5000)

Optional / TODO (project includes `cloudinary` dev dependency but no config):
- `CLOUDINARY_URL` / `CLOUDINARY_*` — if you enable image uploads (not required by default)

Example `backend/.env`:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=someverysecuresecret
PORT=5000
```

Frontend config:

- API base URL configured in `frontend/src/services/api.js` (`http://localhost:5000/api`). If your backend runs on a different host/port, update this file or set up a proxy.

## Running locally

Start the backend (development):

```bash
cd backend
npm run dev   # starts nodemon server.js
```

Start the frontend (development):

```bash
cd frontend
npm run dev   # starts Vite dev server (default port 5173/5174)
```

Open the frontend URL printed by Vite (usually `http://localhost:5173` or `http://localhost:5174`).

## API documentation (overview)

The backend exposes the following routes (HTTP method → path):

- Authentication
	- `POST /api/auth/register` — register a new user (body: `name`, `email`, `password`, `role`)
	- `POST /api/auth/login` — login (body: `email`, `password`) → returns `token` and `user`

- Services
	- `GET /api/services` — list services
	- `GET /api/services/:id` — get service by id
	- `POST /api/services` — create service (provider only; protected)
	- `PUT /api/services/:id` — update service (protected; providers can update their services)
	- `DELETE /api/services/:id` — delete service (protected)

- Bookings
	- `POST /api/bookings` — create a booking (customer only; body: `{ service: serviceId }`)
	- `GET /api/bookings/my-bookings` — get bookings for authenticated customer
	- `GET /api/bookings/provider` — get bookings for services owned by authenticated provider
	- `PUT /api/bookings/:id/cancel` — cancel a booking (protected)
	- `PUT /api/bookings/:id/status` — update booking status (provider-only; body: `{ status }`)
		- Allowed status values: `pending`, `accepted`, `in_progress`, `completed`, `delivered`, `cancelled`

- Dashboards
	- `GET /api/dashboard/customer` — customer stats (active bookings, completed projects, total requests)
	- `GET /api/dashboard/provider` — provider stats (total services, active projects, pending requests)
	- `GET /api/dashboard/admin` — admin stats (total users, services, bookings)

- Test
	- `GET /api/test/profile` — protected test route that returns the authenticated `user` object

Authentication
- Protected routes require a header `Authorization: Bearer <token>` using the token returned from `/api/auth/login`.

Example: create booking using curl

```bash
curl -X POST http://localhost:5000/api/bookings \
	-H "Authorization: Bearer $TOKEN" \
	-H "Content-Type: application/json" \
	-d '{"service":"<SERVICE_ID>"}'
```

Update booking status (provider only):

```bash
curl -X PUT http://localhost:5000/api/bookings/<BOOKING_ID>/status \
	-H "Authorization: Bearer $PROVIDER_TOKEN" \
	-H "Content-Type: application/json" \
	-d '{"status":"in_progress"}'
```

## Testing

- There are no automated tests included. TODO: add unit/integration tests (backend and frontend).

## Deployment notes

- Backend: deploy Node.js app and provide `MONGO_URI` and `JWT_SECRET` in environment. The app listens on `process.env.PORT || 5000`.
- Frontend: build with `npm run build` in `frontend/` and serve the `dist/` directory using any static host or a Node static server. Ensure frontend `src/services/api.js` points to the production API.

## Project structure (key files)

- backend/
	- `server.js` — API entrypoint
	- `config/db.js` — MongoDB connection
	- `controllers/` — `authController.js`, `serviceController.js`, `bookingcontroller.js`, `dashboardcontroller.js`
	- `models/` — `User.js`, `Service.js`, `Booking.js`
	- `routes/` — `authroutes.js`, `serviceroutes.js`, `bookingroutes.js`, `dashboardroutes.js`

- frontend/
	- `src/App.jsx` — route definitions
	- `src/services/api.js` — Axios instance (API base URL)
	- `src/pages/` — main pages (Services, MyBookings, dashboards, auth)
	- `src/components/` — Navbar, Footer, ProtectedRoute

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes and open a pull request

Please run the linters and ensure the dev servers start before submitting changes.

## License

This project does not include a license file. TODO: add a license (e.g., MIT) if you intend to open-source the code.
