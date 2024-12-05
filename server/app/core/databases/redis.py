import os
import redis

__all__ = ["redis_client"]


# TODO: pool connection? will be faster
async def redis_client():
    redis_client = redis.from_url(os.environ["REDIS_URL"])
    try:
        yield redis_client
    finally:
        redis_client.close()
