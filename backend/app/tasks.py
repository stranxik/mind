from typing import List, Optional
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from celery import group

from .celery_app import celery_app
from .database import SessionLocal
from .models import models
from .services import football_data, openliga_db, api_football
from .cache import redis_client

@celery_app.task(bind=True, max_retries=3)
def update_matches(self, league_ids: Optional[List[str]] = None):
    """Mise à jour des matches pour toutes les ligues ou les ligues spécifiées"""
    try:
        db = SessionLocal()
        if not league_ids:
            leagues = db.query(models.League).all()
            league_ids = [league.id for league in leagues]

        tasks = []
        for league_id in league_ids:
            tasks.append(update_league_matches.s(league_id))
        
        job = group(tasks)
        result = job.apply_async()
        return result.id
    except Exception as e:
        self.retry(exc=e, countdown=60)  # Réessayer dans 1 minute
    finally:
        db.close()

@celery_app.task(bind=True)
def update_league_matches(self, league_id: str):
    """Mise à jour des matches pour une ligue spécifique"""
    db = SessionLocal()
    try:
        # Récupération des données depuis les différentes APIs
        football_data_matches = football_data.get_matches(league_id)
        openliga_matches = openliga_db.get_matches(league_id)
        api_football_matches = api_football.get_matches(league_id)

        # Fusion et dédoublonnage des données
        all_matches = merge_match_data(
            football_data_matches,
            openliga_matches,
            api_football_matches
        )

        # Mise à jour de la base de données
        for match_data in all_matches:
            match = db.query(models.Match).filter_by(id=match_data["id"]).first()
            if match:
                for key, value in match_data.items():
                    setattr(match, key, value)
            else:
                match = models.Match(**match_data)
                db.add(match)

        db.commit()
        
        # Mise à jour du cache Redis
        cache_key = f"matches:{league_id}"
        redis_client.set(cache_key, all_matches, ex=3600)  # Cache pour 1 heure
        
        return {"status": "success", "league_id": league_id}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

@celery_app.task(bind=True)
def update_live_matches(self):
    """Mise à jour des matches en direct"""
    db = SessionLocal()
    try:
        # Récupération des matches en cours
        live_matches = db.query(models.Match).filter(
            models.Match.status == "live"
        ).all()

        for match in live_matches:
            # Mise à jour depuis les APIs
            match_data = get_live_match_data(match.id)
            if match_data:
                for key, value in match_data.items():
                    setattr(match, key, value)
                
                # Notification WebSocket
                notify_match_update.delay(match.id, match_data)

        db.commit()
        return {"status": "success", "matches_updated": len(live_matches)}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

@celery_app.task
def update_team_stats():
    """Mise à jour des statistiques des équipes"""
    db = SessionLocal()
    try:
        teams = db.query(models.Team).all()
        for team in teams:
            stats = calculate_team_stats(team.id, db)
            team.stats = stats
        db.commit()
        return {"status": "success", "teams_updated": len(teams)}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

@celery_app.task
def update_player_stats():
    """Mise à jour des statistiques des joueurs"""
    db = SessionLocal()
    try:
        players = db.query(models.Player).all()
        for player in players:
            stats = calculate_player_stats(player.id, db)
            player.stats = stats
        db.commit()
        return {"status": "success", "players_updated": len(players)}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

@celery_app.task
def update_market_values():
    """Mise à jour des valeurs marchandes des joueurs"""
    db = SessionLocal()
    try:
        players = db.query(models.Player).all()
        for player in players:
            value = get_player_market_value(player.id)
            if value:
                player.market_value = value
                player.market_value_updated = datetime.utcnow()
        db.commit()
        return {"status": "success", "players_updated": len(players)}
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

@celery_app.task
def notify_match_update(match_id: str, data: dict):
    """Notification WebSocket pour les mises à jour de match"""
    channel = f"match_updates:{match_id}"
    message = {
        "type": "update",
        "data": data,
        "timestamp": datetime.utcnow().isoformat()
    }
    redis_client.publish(channel, message)

# Fonctions utilitaires
def merge_match_data(*match_lists):
    """Fusion et dédoublonnage des données de match"""
    merged = {}
    for match_list in match_lists:
        for match in match_list:
            if match["id"] not in merged:
                merged[match["id"]] = match
            else:
                # Fusion intelligente des données
                merged[match["id"]].update(match)
    return list(merged.values())

def calculate_team_stats(team_id: str, db: Session):
    """Calcul des statistiques d'équipe"""
    # Implémentation du calcul des stats
    pass

def calculate_player_stats(player_id: str, db: Session):
    """Calcul des statistiques de joueur"""
    # Implémentation du calcul des stats
    pass

def get_player_market_value(player_id: str):
    """Récupération de la valeur marchande d'un joueur"""
    # Implémentation de la récupération des valeurs
    pass

def get_live_match_data(match_id: str):
    """Récupération des données en direct d'un match"""
    # Implémentation de la récupération des données en direct
    pass 