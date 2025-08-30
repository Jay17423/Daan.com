from fastapi import FastAPI
from httpx import post
from app.config.db import create_db_and_tables
from contextlib import asynccontextmanager
from app.routes import auth   
from app.routes import profile
from app.routes import post
from app.config import cloudinary_config

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)


app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(post.router) 

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}
