from abc import ABC, abstractmethod
from fastapi import Depends
from pymongo import MongoClient
from core.databases.mongo import mongo_client


class IRepository(ABC):
    @abstractmethod
    def get_latest(self) -> dict:
        pass


class MongoRepository(IRepository, ABC):
    def __init__(self, mongo_client_: MongoClient = Depends(mongo_client)):
        self.mongo_client = mongo_client_[self.get_db()][self.get_collection()]

    def get_latest(self) -> dict:
        return self.mongo_client.find().sort("_id", -1).limit(1).next()

    @abstractmethod
    def get_db(self) -> str:
        pass

    @abstractmethod
    def get_collection(self) -> str:
        pass
