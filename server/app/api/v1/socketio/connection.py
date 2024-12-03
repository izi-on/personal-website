from main import sio


# SocketIO events
@sio.event
async def connect(sid, environ):
    await sio.enter_room(sid, "resume_change")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
