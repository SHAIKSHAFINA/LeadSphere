<div align="center">

<img src="https://img.shields.io/badge/-LeadSphere-6366f1?style=for-the-badge&logoColor=white" height="45"/>

### Smart Leads Dashboard

**A production-grade Lead Management System — MERN Stack · TypeScript · JWT Auth · RBAC · Docker**

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-GigFlow-6366f1?style=for-the-badge)](https://leadsphere-frontend.onrender.com)
[![Backend API](https://img.shields.io/badge/⚡%20Backend%20API-Online-10b981?style=for-the-badge)](https://leadsphere-40w2.onrender.com)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## Overview

LeadSphere is a full-stack Lead Management Dashboard that centralises the entire sales pipeline into one clean interface. Built end-to-end with TypeScript, it supports role-based access control, debounced real-time search, multi-filter querying, paginated data fetching, analytics insights, and one-click CSV export — deployed and production-ready on Render.

---

## Screenshots

### Login
<img width="700" alt="Dashboard" src="https://github.com/user-attachments/assets/a29fecff-1a83-4082-8145-24a2739da764" />

### DashBoard
<img width="700" alt="Leads Table" src="https://github.com/user-attachments/assets/604f49a2-3109-4051-94e4-22ef4b7acc61" />

### Leads Table
<img width="700" alt="Dark Mode" src="https://github.com/user-attachments/assets/3875e694-4e51-4d5d-9994-2e2ec9312857" />

### Analytics
<img width="700" alt="Analytics" src="https://github.com/user-attachments/assets/8e3ff64a-26b2-4f13-9c42-767ba1f6c6b9" />




---

## Features

**Authentication & Access Control**
- JWT-based auth with bcrypt password hashing
- Role-Based Access Control — `Admin` and `Sales User`
- Protected routes with auth middleware on all private endpoints

**Lead Management**
- Full CRUD — create, view, update, and delete leads
- Lead schema: Name, Email, Status (`New → Contacted → Qualified → Lost`), Source (`Website / Instagram / Referral`), Created At

**Search, Filter & Sort**
- Debounced search by Name or Email
- Filter by Status and Source — combinable simultaneously
- Sort by Latest or Oldest

**Data & Export**
- Backend pagination — 10 records/page with full metadata in API responses
- CSV export for any filtered dataset

**Frontend**
- Analytics dashboard with lead distribution breakdowns
- Dark / Light mode toggle
- Fully responsive — mobile and desktop
- Loading, empty, and error states throughout
- Reusable component architecture with strict TypeScript interfaces

---

## Tech Stack

### Frontend
| | Technology | Role |
|---|---|---|
| ![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB) | **React 18** | UI library |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | **TypeScript** | End-to-end type safety |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | **Vite** | Build tooling & dev server |
| ![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?logo=tailwindcss&logoColor=white) | **TailwindCSS** | Utility-first styling |

### Backend
| | Technology | Role |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | **Node.js** | JavaScript runtime |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | **Express.js** | REST API framework |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | **TypeScript** | Strict typing across all layers |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | **MongoDB Atlas** | Cloud database |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-800000?logo=mongoose&logoColor=white) | **Mongoose** | ODM with schema validation |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white) | **JSON Web Tokens** | Stateless authentication |

### DevOps & Deployment
| | Technology | Role |
|---|---|---|
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) | **Docker** | Containerised local setup |
| ![Render](https://img.shields.io/badge/-Render-46E3B7?logo=render&logoColor=black) | **Render** | Cloud deployment |

---

## Project Structure

```
leadsphere/
├── client/                     # React + Vite frontend
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Route-level views
│       ├── hooks/              # Custom React hooks
│       ├── context/            # Auth & Theme providers
│       ├── services/           # Axios API layer
│       └── types/              # TypeScript interfaces
│
├── server/                     # Node.js + Express backend
│   └── src/
│       ├── controllers/        # Route handler logic
│       ├── middleware/         # Auth, RBAC, error handling
│       ├── models/             # Mongoose schemas
│       ├── routes/             # Express route definitions
│       └── utils/              # Pagination, CSV export helpers
│
└── docker-compose.yml
```

---

## Local Setup

**Prerequisites:** Node.js ≥ 18, MongoDB Atlas URI, Docker (optional)

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/leadsphere.git
cd leadsphere

# 2. Backend
cd server && npm install
cp .env.example .env        # fill in values below
npm run dev

# 3. Frontend (new terminal)
cd client && npm install
cp .env.example .env
npm run dev
```

**Or with Docker:**
```bash
docker-compose up --build
```

---

## Environment Variables

**`server/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

**`client/.env`**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## API Reference

**Base URL:** `https://leadsphere-40w2.onrender.com/api`

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login → returns JWT |

### Leads
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/leads` | Paginated lead list | All |
| `GET` | `/leads/:id` | Single lead | All |
| `POST` | `/leads` | Create lead | All |
| `PUT` | `/leads/:id` | Update lead | All |
| `DELETE` | `/leads/:id` | Delete lead | Admin |
| `GET` | `/leads/export/csv` | Export to CSV | All |

**Query Parameters for `GET /leads`**

| Param | Type | Description |
|---|---|---|
| `page` | `number` | Page number (default: 1) |
| `limit` | `number` | Records per page (default: 10) |
| `status` | `string` | Filter: `New`, `Contacted`, `Qualified`, `Lost` |
| `source` | `string` | Filter: `Website`, `Instagram`, `Referral` |
| `search` | `string` | Searches name and email fields |
| `sort` | `latest \| oldest` | Sort direction |

**Response Shape**
```json
{
  "success": true,
  "data": [ /* lead objects */ ],
  "pagination": {
    "total": 54,
    "page": 2,
    "limit": 10,
    "totalPages": 6
  }
}
```

---

## Deployment

| Service | URL |
|---|---|
| Frontend | [leadsphere-frontend.onrender.com](https://leadsphere-frontend.onrender.com) |
| Backend | [leadsphere-40w2.onrender.com](https://leadsphere-40w2.onrender.com) |

To self-host: deploy `server/` and `client/` as separate Web Services on Render, configure environment variables in the dashboard, and whitelist `0.0.0.0/0` in MongoDB Atlas network access.

---

<div align="center">

If this project was useful, consider leaving a ⭐

</div>
