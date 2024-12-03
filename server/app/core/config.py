from sqlalchemy import create_engine
import os

redis_url = os.environ["REDIS_URL"]

postgres_url = os.environ["DATABASE_URL"]

engine = create_engine(postgres_url)  # used by sql alchemy to communicate with DB
