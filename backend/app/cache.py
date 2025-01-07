import json
from typing import Any, Optional
from redis import Redis
from .config import settings

# Configuration du client Redis
redis_client = Redis(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=0,
    decode_responses=True
)

class RedisCache:
    def __init__(self, redis_client: Redis):
        self.client = redis_client

    def get(self, key: str) -> Optional[Any]:
        """Récupère une valeur du cache"""
        data = self.client.get(key)
        if data:
            return json.loads(data)
        return None

    def set(self, key: str, value: Any, ex: Optional[int] = None):
        """Stocke une valeur dans le cache"""
        data = json.dumps(value)
        self.client.set(key, data, ex=ex)

    def delete(self, key: str):
        """Supprime une valeur du cache"""
        self.client.delete(key)

    def exists(self, key: str) -> bool:
        """Vérifie si une clé existe"""
        return bool(self.client.exists(key))

class RedisWebSocket:
    def __init__(self, redis_client: Redis):
        self.client = redis_client
        self.pubsub = self.client.pubsub()

    def subscribe(self, channel: str):
        """S'abonne à un canal"""
        self.pubsub.subscribe(channel)

    def publish(self, channel: str, message: Any):
        """Publie un message sur un canal"""
        data = json.dumps(message)
        self.client.publish(channel, data)

    def get_message(self) -> Optional[dict]:
        """Récupère le prochain message"""
        message = self.pubsub.get_message()
        if message and message["type"] == "message":
            return json.loads(message["data"])
        return None

    def close(self):
        """Ferme la connexion"""
        self.pubsub.close()

# Instances globales
cache = RedisCache(redis_client)
websocket = RedisWebSocket(redis_client) 