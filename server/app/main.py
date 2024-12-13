import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from api.v1.router import v1_router
from dotenv import load_dotenv

load_dotenv()

# Create FastAPI instance
app = FastAPI()

app.include_router(v1_router)

# TODO: move these in another file
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
    )
