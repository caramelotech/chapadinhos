# Chapadinhos

Chapadinhos is a project designed to encourage regular physical activity by setting up challenges over a specific period of time. To score points, participants need to engage in at least 30 minutes of physical activity per day.

Each challenge has a minimum number of points to be achieved. The winner is the one who reaches or exceeds the minimum points within the challenge period.

## Repository structure

```
chapadinhos/
├── front/   - Next.js 14 frontend (App Router, TypeScript, Tailwind)
└── api/     - Backend API
```

## Getting started

Install all dependencies from the root:

```bash
npm install
```

### Frontend

```bash
npm run dev:front     # dev server (localhost:3000)
npm run build:front   # production build
npm run lint:front    # ESLint
```

Or run commands directly inside `front/`:

```bash
cd front
npm run dev
npm run build
npm run lint
```

### API

```bash
cd api
npm test
```
