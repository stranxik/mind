from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# Base schemas for shared attributes
class BaseSchema(BaseModel):
    id: str

    class Config:
        from_attributes = True

# League schemas
class LeagueBase(BaseSchema):
    name: str
    country: str
    teams_count: int
    matches_per_season: int
    current_season: Optional[str] = None
    logo_url: Optional[str] = None
    country_code: Optional[str] = Field(None, max_length=2)
    level: Optional[int] = None
    founded_year: Optional[int] = None

class LeagueCreate(LeagueBase):
    pass

class League(LeagueBase):
    teams: List["Team"] = []
    seasons: List["Season"] = []

# Team schemas
class TeamBase(BaseSchema):
    name: str
    short_name: Optional[str] = None
    league_id: str
    founded_year: Optional[int] = None
    stadium_name: Optional[str] = None
    stadium_capacity: Optional[int] = None
    stadium_city: Optional[str] = None
    stadium_latitude: Optional[float] = None
    stadium_longitude: Optional[float] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    manager_name: Optional[str] = None
    manager_nationality: Optional[str] = None
    manager_appointed: Optional[datetime] = None
    stats: Optional[Dict[str, Any]] = None
    form: Optional[List[str]] = None

class TeamCreate(TeamBase):
    pass

class Team(TeamBase):
    league: League
    players: List["Player"] = []

# Player schemas
class PlayerBase(BaseSchema):
    name: str
    team_id: str
    position: Optional[str] = None
    nationality: Optional[str] = None
    birth_date: Optional[datetime] = None
    height: Optional[int] = None
    weight: Optional[int] = None
    number: Optional[int] = None
    stats: Optional[Dict[str, Any]] = None
    market_value: Optional[int] = None
    market_value_updated: Optional[datetime] = None

class PlayerCreate(PlayerBase):
    pass

class Player(PlayerBase):
    team: Team
    injuries: List["Injury"] = []
    transfers: List["Transfer"] = []

# Match schemas
class MatchBase(BaseSchema):
    competition_id: str
    season_id: str
    matchday: int
    home_team_id: str
    away_team_id: str
    home_score: Optional[int] = None
    away_score: Optional[int] = None
    datetime: datetime
    venue_id: Optional[str] = None
    venue_name: Optional[str] = None
    status: str = Field(..., pattern="^(upcoming|live|finished)$")
    attendance: Optional[int] = None
    referee_name: Optional[str] = None
    stats: Optional[Dict[str, Any]] = None
    events: Optional[List[Dict[str, Any]]] = None

class MatchCreate(MatchBase):
    pass

class Match(MatchBase):
    home_team: Team
    away_team: Team
    season: "Season"

# Season schemas
class SeasonBase(BaseSchema):
    league_id: str
    name: str
    start_date: datetime
    end_date: datetime
    current_matchday: Optional[int] = None
    winner_id: Optional[str] = None
    stats: Optional[Dict[str, Any]] = None

class SeasonCreate(SeasonBase):
    pass

class Season(SeasonBase):
    league: League
    matches: List[Match] = []

# Transfer schemas
class TransferBase(BaseSchema):
    player_id: str
    from_team_id: str
    to_team_id: str
    transfer_date: datetime
    fee_amount: Optional[int] = None
    fee_currency: Optional[str] = None
    contract_end: Optional[datetime] = None
    transfer_type: str = Field(..., pattern="^(permanent|loan)$")

class TransferCreate(TransferBase):
    pass

class Transfer(TransferBase):
    player: Player

# Injury schemas
class InjuryBase(BaseSchema):
    player_id: str
    type: str
    start_date: datetime
    expected_return: Optional[datetime] = None
    status: str = Field(..., pattern="^(active|recovered)$")

class InjuryCreate(InjuryBase):
    pass

class Injury(InjuryBase):
    player: Player

# Response schemas for statistics
class TopScorer(BaseModel):
    player: Player
    goals: int
    matches_played: int
    minutes_played: int

class TopAssister(BaseModel):
    player: Player
    assists: int
    matches_played: int
    minutes_played: int

# WebSocket message schemas
class WebSocketMessage(BaseModel):
    type: str = Field(..., pattern="^(update|error|info)$")
    data: Dict[str, Any]
    timestamp: datetime = Field(default_factory=datetime.utcnow) 