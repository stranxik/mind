from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..database import get_db
from ..models import models
from ..schemas import schemas
from ..services import football_data, openliga_db, api_football

router = APIRouter()

# Endpoints pour les ligues
@router.get("/leagues", response_model=List[schemas.League])
async def get_leagues(db: Session = Depends(get_db)):
    """Récupère toutes les ligues"""
    return db.query(models.League).all()

@router.get("/leagues/{league_id}", response_model=schemas.League)
async def get_league(league_id: str, db: Session = Depends(get_db)):
    """Récupère une ligue spécifique"""
    league = db.query(models.League).filter(models.League.id == league_id).first()
    if not league:
        raise HTTPException(status_code=404, detail="League not found")
    return league

# Endpoints pour les équipes
@router.get("/teams", response_model=List[schemas.Team])
async def get_teams(
    league_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Récupère toutes les équipes, filtrable par ligue"""
    query = db.query(models.Team)
    if league_id:
        query = query.filter(models.Team.league_id == league_id)
    return query.all()

@router.get("/teams/{team_id}", response_model=schemas.Team)
async def get_team(team_id: str, db: Session = Depends(get_db)):
    """Récupère une équipe spécifique"""
    team = db.query(models.Team).filter(models.Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

# Endpoints pour les joueurs
@router.get("/players", response_model=List[schemas.Player])
async def get_players(
    team_id: Optional[str] = None,
    position: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Récupère tous les joueurs, filtrable par équipe et position"""
    query = db.query(models.Player)
    if team_id:
        query = query.filter(models.Player.team_id == team_id)
    if position:
        query = query.filter(models.Player.position == position)
    return query.all()

@router.get("/players/{player_id}", response_model=schemas.Player)
async def get_player(player_id: str, db: Session = Depends(get_db)):
    """Récupère un joueur spécifique"""
    player = db.query(models.Player).filter(models.Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

# Endpoints pour les matches
@router.get("/matches", response_model=List[schemas.Match])
async def get_matches(
    league_id: Optional[str] = None,
    team_id: Optional[str] = None,
    status: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    """Récupère les matches avec filtres"""
    query = db.query(models.Match)
    
    if league_id:
        query = query.filter(models.Match.competition_id == league_id)
    if team_id:
        query = query.filter(
            (models.Match.home_team_id == team_id) | 
            (models.Match.away_team_id == team_id)
        )
    if status:
        query = query.filter(models.Match.status == status)
    if date_from:
        query = query.filter(models.Match.datetime >= date_from)
    if date_to:
        query = query.filter(models.Match.datetime <= date_to)
        
    return query.all()

@router.get("/matches/{match_id}", response_model=schemas.Match)
async def get_match(match_id: str, db: Session = Depends(get_db)):
    """Récupère un match spécifique"""
    match = db.query(models.Match).filter(models.Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match

# Endpoints pour les statistiques
@router.get("/statistics/top-scorers", response_model=List[schemas.TopScorer])
async def get_top_scorers(
    league_id: Optional[str] = None,
    season_id: Optional[str] = None,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Récupère les meilleurs buteurs"""
    # Ici on utilisera une requête optimisée pour agréger les stats
    pass

@router.get("/statistics/top-assists", response_model=List[schemas.TopAssister])
async def get_top_assisters(
    league_id: Optional[str] = None,
    season_id: Optional[str] = None,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Récupère les meilleurs passeurs"""
    # Ici on utilisera une requête optimisée pour agréger les stats
    pass

# Endpoint de mise à jour des données
@router.post("/update/matches")
async def update_matches(league_id: str, db: Session = Depends(get_db)):
    """Met à jour les matches depuis les APIs externes"""
    try:
        # Appel aux différentes APIs
        football_data_matches = await football_data.get_matches(league_id)
        openliga_matches = await openliga_db.get_matches(league_id)
        api_football_matches = await api_football.get_matches(league_id)
        
        # Fusion et mise à jour des données
        # ... logique de fusion et mise à jour ...
        
        return {"status": "success", "message": "Matches updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/update/statistics")
async def update_statistics(league_id: str, db: Session = Depends(get_db)):
    """Met à jour les statistiques depuis les APIs externes"""
    try:
        # Appel aux différentes APIs et mise à jour
        # ... logique de mise à jour ...
        
        return {"status": "success", "message": "Statistics updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket pour les mises à jour en temps réel
from fastapi import WebSocket

@router.websocket("/ws/matches/{match_id}")
async def websocket_match(websocket: WebSocket, match_id: str):
    """WebSocket pour les mises à jour en temps réel des matches"""
    await websocket.accept()
    try:
        while True:
            # Logique de mise à jour en temps réel
            # Envoi des mises à jour aux clients connectés
            pass
    except Exception as e:
        await websocket.close() 