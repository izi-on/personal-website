import os
from pymongo import MongoClient

__all__ = ["mongo_client"]


async def mongo_client():
    mongo_client = MongoClient(os.environ["MONGO_PUBLIC_URL"])
    try:
        yield mongo_client
    finally:
        mongo_client.close()
