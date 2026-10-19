# BrandOrbit Client

A simple MERN-stack influencer and brand campaign management frontend built with React, Vite, Tailwind CSS, React Router, Axios and Lucide icons.

## Requirements
- Node.js and npm
- BrandOrbit Express backend running at `http://localhost:5000`
- MongoDB Atlas configured in the backend `.env`

## Run locally
1. Extract this folder into your existing `BrandOrbit` project as `client`.
2. Open a terminal in `client`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Optional: copy `.env.example` to `.env` if your backend URL differs from the default.
5. Start the frontend:
   ```bash
   npm run dev
   ```
6. Open the URL Vite prints, usually `http://localhost:5173`.

## Backend API expected
- `POST /api/auth/register` — `{ name, email, password, role }`
- `POST /api/auth/login` — returns `{ token, user }`
- `GET /api/campaigns`
- `POST /api/campaigns` — `{ title, description, budget, createdBy }`
- `GET /api/applications`
- `POST /api/applications` — `{ campaignId, influencerId }`

## Notes
- Roles are `brand` and `influencer`.
- Campaign creation is available to brand accounts.
- Influencers can browse and apply to campaigns.
- This is a viva/demo MVP, not a production-secure deployment. The existing backend's campaign/application routes currently accept user IDs from request bodies; for production, enforce JWT authentication and role authorization server-side.
- Do not share `.env` files or database credentials. If a database password has been exposed, rotate it in MongoDB Atlas.
