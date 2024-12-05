from repositories.abc import RedisRepository


class ResumeRepository(RedisRepository):
    def get(self, id: str):
        return self.redis_client.get(id)
