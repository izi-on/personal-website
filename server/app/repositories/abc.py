from abc import ABC, abstractmethod
from typing import Any

from fastapi import Depends
from redis import Redis
from core.databases.redis import redis_client


class Repository(ABC):
    @abstractmethod
    def get(self, id: str) -> Any:
        raise NotImplementedError


class RedisRepository(Repository):
    def __init__(self, redis_client_: Redis = Depends(redis_client)):
        self.redis_client = redis_client_
