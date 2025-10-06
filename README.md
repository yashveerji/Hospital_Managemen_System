# Yashveerji Care Medical Institute – MERN Hospital Management Platform

Modern full-stack hospital management system featuring a patient-facing experience, an admin dashboard, and a Node/Express API. Designed for rapid deployments to services like Netlify (frontends) and Render/Heroku/Node hosts (backend).

---

## ✨ Highlights

- **Dual React apps**: Public website (`frontend/`) and admin dashboard (`dashboard/`) built with Vite + React 18.
- **Secure API**: Node.js/Express backend (`backend/`) with JWT auth, MongoDB models, and Cloudinary media support.
- **Deployment-ready**: Environment variables centralized in `sample.env`, Netlify configs provided, and production build scripts verified.
- **Responsive UI**: Shared design language with glassmorphism visuals and Manrope/Playfair fonts.

---

## 🗂 Repository Structure

```
.
├─ backend/        # Express API, models, controllers, auth middleware
├─ dashboard/      # Admin dashboard React app (Vite)
├─ frontend/       # Patient-facing React app (Vite)
├─ sample.env      # Environment variable template
└─ README.md       # Documentation
```

Each subproject has its own `package.json`, lockfile, and Netlify configuration where applicable.

---

## 🚀 Getting Started

### 1. Clone & Install

```powershell
git clone https://github.com/yashveerji/Hospital_Managemen_System.git
cd Hospital_Managemen_System

# Install dependencies for each workspace
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
cd dashboard; npm install; cd ..
```

### 2. Configure Environment

Copy the provided template and fill in real secrets/URLs:

```powershell
Copy-Item sample.env backend/.env
Copy-Item sample.env frontend/.env
Copy-Item sample.env dashboard/.env
```

Adjust keys per service:

- `MONGO_URI`, `DB_NAME` – MongoDB Atlas connection string and database name.
- `JWT_SECRET_KEY`, `JWT_EXPIRES`, `COOKIE_EXPIRE` – authentication settings.
- `CLOUDINARY_*` – Cloudinary credentials for media upload.
- `FRONTEND_URL_ONE`, `FRONTEND_URL_TWO` – allowed origins for CORS.
- `VITE_API_BASE_URL` – base API URL used by both React applications.

### 3. Development Servers

Backend API (http://localhost:4000 by default):

```powershell
cd backend
npm run dev
```

Frontend (patient site) at http://localhost:5173:

```powershell
cd frontend
npm run dev
```

Admin dashboard at http://localhost:5174:

```powershell
cd dashboard
npm run dev -- --port 5174
```

Netlify previews can also be used by running `npm run build` in each React workspace.

---

## 🧱 Build & Production

- **Frontend/Dashboard**: `npm run build` outputs to `dist/` for static hosting.
- **Backend**: `npm start` launches the Express server; pair with a process manager (PM2, Render, Railway, etc.) in production.
- **Static hosting**: `frontend/netlify.toml` and `dashboard/netlify.toml` contain ready-to-use Netlify configuration.
- **API Hosting**: Ensure `.env` is configured with production-grade secrets and MongoDB URI.

---

## 🔐 Authentication Overview

- JWT-based login using cookies for both patients and admins.
- Middleware guards (`auth.js`) enforce route protection.
- Cloudinary integration for profile/media uploads (doctor avatars, etc.).

---

## 📦 Available Scripts

| Workspace   | Script          | Description                              |
|-------------|-----------------|------------------------------------------|
| backend     | `npm run dev`   | Start API with nodemon                   |
| backend     | `npm start`     | Start API in production mode             |
| frontend    | `npm run dev`   | Vite dev server                          |
| frontend    | `npm run build` | Build static assets                      |
| dashboard   | `npm run dev`   | Vite dev server                          |
| dashboard   | `npm run build` | Build admin dashboard static assets      |

---

## 🧪 Testing & Quality

At present automated tests are not bundled. Recommended next steps:

- Add integration tests for API routes (Jest + Supertest).
- Incorporate React Testing Library for core UI flows.
- Configure CI pipeline (GitHub Actions) to run build/test suites.

---

## 📄 License & Attribution

This codebase is provided for educational and operational use by Yashveerji Care Medical Institute. Please ensure any third-party service credentials (Cloudinary, MongoDB) are kept private.

For deployment questions or contributions, open an issue or reach out via the project maintainers.
