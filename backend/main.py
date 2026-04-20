import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import Base, engine
from routers import contact

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "https://your-frontend.vercel.app,http://localhost:5173")
allowed_origins = [o.strip() for o in allowed_origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(contact.router)


@app.get("/health")
def health():
    return {"status": "ok"}
