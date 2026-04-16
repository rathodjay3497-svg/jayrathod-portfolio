# Jay Rathod - AI/ML Engineer Portfolio

Modern, dark-themed portfolio built with React + Framer Motion (frontend) and FastAPI + SQLite (backend).

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
# → http://localhost:8000
```

The Vite dev server proxies `/api/*` → `http://localhost:8000`, so no CORS issues in development.

## Project Structure

```
portfolio-site/
├── frontend/               # Vite + React + TypeScript + Tailwind + Framer Motion
│   └── src/
│       ├── components/
│       │   ├── layout/     # Navbar, Footer
│       │   ├── sections/   # Hero, About, Projects, Skills, Experience, Contact
│       │   └── ui/         # CustomCursor, GlassCard, NeuralBackground, ...
│       ├── hooks/          # useTypewriter, useScrollReveal, useMousePosition
│       ├── lib/            # data.ts (all content), api.ts
│       └── types/          # TypeScript interfaces
└── backend/                # FastAPI + SQLAlchemy + SQLite
    ├── main.py
    ├── models.py
    ├── schemas.py
    ├── crud.py
    └── routers/contact.py
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/contact` | Submit contact form (stored in SQLite) |
| `GET`  | `/api/contact` | List all messages (admin) |
| `GET`  | `/health` | Health check |

## Deployment

**Frontend:** `npm run build` → deploy `dist/` to Vercel / Netlify / Azure Static Web Apps.

**Backend:** Deploy to Azure App Service or any Python host. Set `ALLOWED_ORIGINS` and `DATABASE_URL` in environment variables (use PostgreSQL for production).
