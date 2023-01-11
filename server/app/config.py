from pydantic import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = 'mongodb://admin:password123@localhost:6000/fastapi?authSource=admin'
    MONGO_INITDB_DATABASE: str = 'fastapi'

    class Config:
        env_file = '../.env'
        env_file_encoding = 'utf-8'


settings = Settings()
