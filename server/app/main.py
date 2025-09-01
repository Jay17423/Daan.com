from fastapi import FastAPI
from httpx import post
from app.config.db import create_db_and_tables
from contextlib import asynccontextmanager
from app.routes import auth   
from app.routes import profile
from app.routes import post
from app.config import cloudinary_config

# 1. Import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run on startup
    create_db_and_tables()
    yield
    # Code to run on shutdown
    pass

app = FastAPI(lifespan=lifespan)

# 2. Define allowed origins
# Using ["*"] allows requests from any origin.
origins = [ # Your React app's origin
    "http://localhost:5173"
]

# 3. Add the CORSMiddleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True, # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],    # Allow all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],    # Allow all headers
)

# Include your routers after adding the middleware
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(post.router)

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}
