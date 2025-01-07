from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from passlib.hash import bcrypt

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime)
    last_login = Column(DateTime)

    def verify_password(self, password: str) -> bool:
        return bcrypt.verify(password, self.hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return bcrypt.hash(password)

class League(Base):
    __tablename__ = "leagues"

    id = Column(String, primary_key=True)  # pl, laliga, etc.
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    teams_count = Column(Integer, nullable=False)
    matches_per_season = Column(Integer, nullable=False)
    current_season = Column(String)
    logo_url = Column(String)
    country_code = Column(String(2))
    level = Column(Integer)
    founded_year = Column(Integer)

    # Relations
    teams = relationship("Team", back_populates="league")
    seasons = relationship("Season", back_populates="league")

class Team(Base):
    __tablename__ = "teams"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    short_name = Column(String)
    league_id = Column(String, ForeignKey("leagues.id"))
    founded_year = Column(Integer)
    
    # Stade
    stadium_name = Column(String)
    stadium_capacity = Column(Integer)
    stadium_city = Column(String)
    stadium_latitude = Column(Float)
    stadium_longitude = Column(Float)

    # Couleurs et infos
    primary_color = Column(String)
    secondary_color = Column(String)
    
    # Manager
    manager_name = Column(String)
    manager_nationality = Column(String)
    manager_appointed = Column(DateTime)

    # Stats (mises à jour régulièrement)
    stats = Column(JSON)  # Stocke les stats actuelles en JSON
    form = Column(JSON)   # Stocke les 5 derniers résultats

    # Relations
    league = relationship("League", back_populates="teams")
    home_matches = relationship("Match", foreign_keys="Match.home_team_id", back_populates="home_team")
    away_matches = relationship("Match", foreign_keys="Match.away_team_id", back_populates="away_team")
    players = relationship("Player", back_populates="team")

class Player(Base):
    __tablename__ = "players"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    team_id = Column(String, ForeignKey("teams.id"))
    position = Column(String)
    nationality = Column(String)
    birth_date = Column(DateTime)
    height = Column(Integer)  # en cm
    weight = Column(Integer)  # en kg
    number = Column(Integer)
    
    # Stats actuelles
    stats = Column(JSON)
    
    # Valeur marchande
    market_value = Column(Integer)  # en euros
    market_value_updated = Column(DateTime)

    # Relations
    team = relationship("Team", back_populates="players")
    injuries = relationship("Injury", back_populates="player")
    transfers = relationship("Transfer", back_populates="player")

class Match(Base):
    __tablename__ = "matches"

    id = Column(String, primary_key=True)
    competition_id = Column(String, ForeignKey("leagues.id"))
    season_id = Column(String, ForeignKey("seasons.id"))
    matchday = Column(Integer)
    
    # Équipes
    home_team_id = Column(String, ForeignKey("teams.id"))
    away_team_id = Column(String, ForeignKey("teams.id"))
    home_score = Column(Integer)
    away_score = Column(Integer)
    
    # Infos match
    datetime = Column(DateTime, nullable=False)
    venue_id = Column(String)
    venue_name = Column(String)
    status = Column(String)  # upcoming, live, finished
    attendance = Column(Integer)
    referee_name = Column(String)
    
    # Stats du match
    stats = Column(JSON)
    events = Column(JSON)  # buts, cartons, etc.

    # Relations
    home_team = relationship("Team", foreign_keys=[home_team_id], back_populates="home_matches")
    away_team = relationship("Team", foreign_keys=[away_team_id], back_populates="away_matches")
    season = relationship("Season", back_populates="matches")

class Season(Base):
    __tablename__ = "seasons"

    id = Column(String, primary_key=True)  # pl_2023_2024
    league_id = Column(String, ForeignKey("leagues.id"))
    name = Column(String, nullable=False)  # 2023-2024
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    current_matchday = Column(Integer)
    winner_id = Column(String, ForeignKey("teams.id"), nullable=True)
    
    # Stats de la saison
    stats = Column(JSON)

    # Relations
    league = relationship("League", back_populates="seasons")
    matches = relationship("Match", back_populates="season")

class Transfer(Base):
    __tablename__ = "transfers"

    id = Column(String, primary_key=True)
    player_id = Column(String, ForeignKey("players.id"))
    from_team_id = Column(String, ForeignKey("teams.id"))
    to_team_id = Column(String, ForeignKey("teams.id"))
    transfer_date = Column(DateTime)
    fee_amount = Column(Integer)  # en euros
    fee_currency = Column(String)
    contract_end = Column(DateTime)
    transfer_type = Column(String)  # permanent, loan

    # Relations
    player = relationship("Player", back_populates="transfers")

class Injury(Base):
    __tablename__ = "injuries"

    id = Column(String, primary_key=True)
    player_id = Column(String, ForeignKey("players.id"))
    type = Column(String)
    start_date = Column(DateTime)
    expected_return = Column(DateTime)
    status = Column(String)  # active, recovered

    # Relations
    player = relationship("Player", back_populates="injuries")

# Pour les statistiques agrégées, on peut utiliser des vues SQL
# ou les calculer à la volée avec des requêtes optimisées 