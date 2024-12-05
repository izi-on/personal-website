from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from api.v1.router import v1_router
from dotenv import load_dotenv

load_dotenv()

# Create SocketIO instance
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[])

# Create FastAPI instance
app = FastAPI()

app.include_router(v1_router)

# Create ASGI app
socket_app = socketio.ASGIApp(sio, app)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
