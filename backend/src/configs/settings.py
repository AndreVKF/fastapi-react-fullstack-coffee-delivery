from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Lupet's Coffee"
    database_url: str
    jwt_secret: str
    
    model_config = SettingsConfigDict(env_file=".env")
    
    
settings = Settings()