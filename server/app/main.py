import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from api.v1.router import v1_router
from dotenv import load_dotenv
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

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
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = (
        "max-age=31536000; includeSubDomains"
    )
    return response


print(os.environ.get("ALLOWED_ORIGINS", "*").split(","))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:socket_app",
    )
