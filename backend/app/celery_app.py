from celery import Celery
from celery.schedules import crontab
from .config import settings

celery_app = Celery(
    "football_stats",
    broker=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/0",
    backend=f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/1"
)

# Configuration Celery
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Europe/Paris",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes max par tâche
    worker_prefetch_multiplier=1,  # Un worker = une tâche à la fois
)

# Configuration des tâches périodiques
celery_app.conf.beat_schedule = {
    "update-matches-daily": {
        "task": "app.tasks.update_matches",
        "schedule": crontab(hour="0", minute="0"),  # Tous les jours à minuit
    },
    "update-live-matches": {
        "task": "app.tasks.update_live_matches",
        "schedule": crontab(minute="*/5"),  # Toutes les 5 minutes
    },
    "update-team-stats": {
        "task": "app.tasks.update_team_stats",
        "schedule": crontab(hour="*/6", minute="0"),  # Toutes les 6 heures
    },
    "update-player-stats": {
        "task": "app.tasks.update_player_stats",
        "schedule": crontab(hour="*/12", minute="0"),  # Toutes les 12 heures
    },
    "update-market-values": {
        "task": "app.tasks.update_market_values",
        "schedule": crontab(hour="0", minute="0", day_of_week="1"),  # Tous les lundis
    },
} 