# AI Workflow Builder – Frontend

React + Vite app that talks to the NestJS backend at `http://localhost:3000`.

## Setup

```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:5173. Ensure the backend is running and CORS allows `http://localhost:5173` if you see network errors.

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Routes

- `/` – Dashboard (list/create/delete workflows)
- `/workflow/:id` – Workflow details (steps, add step, run)
- `/execution/:runId` – Execution result and logs
