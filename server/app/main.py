import os
from fastapi import FastAPI, Request
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
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=[
        "Content-Type",
        "X-Real-IP",
        "X-Forwarded-Proto",
        "X-Railway-Request-Id",
    ],
)


@app.middleware("http")
async def ssl_middleware(request: Request, call_next):
    forwarded_proto = request.headers.get("X-Forwarded-Proto")
    if forwarded_proto:
        # Update request scope to use the original protocol
        request.scope["scheme"] = forwarded_proto

    return await call_next(request)


@app.middleware("http")
async def log_request_headers(request: Request, call_next):
    # You can also log to a file or use logging module
    print("\n=== Request Headers ===")
    print(f"Method: {request.method}")
    print(f"URL: {request.url}")
    print("Headers:")
    for name, value in request.headers.items():
        print(f"{name}: {value}")
    print("=====================\n")

    response = await call_next(request)

    # Log response
    print("\n=== Response ===")
    print(f"Status Code: {response.status_code}")
    print("Response Headers:")
    for name, value in response.headers.items():
        print(f"{name}: {value}")
    print("===============\n")

    return response


print(os.environ.get("ALLOWED_ORIGINS", "*").split(","))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:socket_app",
    )
