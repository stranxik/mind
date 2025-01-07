from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # API Port
    PORT: int = int(os.getenv("PORT", "8006"))
    
    # Football APIs
    FOOTBALL_DATA_API_KEY: str = os.getenv("FOOTBALL_DATA_API_KEY", "")
    API_FOOTBALL_KEY: str = os.getenv("API_FOOTBALL_KEY", "")
    OPENLIGA_DB_API_KEY: str = os.getenv("OPENLIGA_DB_API_KEY", "")
    
    # Stripe
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    STRIPE_PRICE_ID_PRO: str = os.getenv("STRIPE_PRICE_ID_PRO", "")
    STRIPE_PRICE_ID_INFLUENCE: str = os.getenv("STRIPE_PRICE_ID_INFLUENCE", "")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # Ollama
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")
    MODEL_NAME: str = "mistral"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/football_db")
    
    # Redis
    REDIS_HOST: str = os.getenv("REDIS_HOST", "redis")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    
    # JWT
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "votre_super_secret_key_de_32_caracteres_minimum")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "votre_secret_key_tres_securisee_a_changer_en_production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # CORS
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000")
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")
    ALLOWED_HOSTS: str = os.getenv("ALLOWED_HOSTS", "*")
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings() 