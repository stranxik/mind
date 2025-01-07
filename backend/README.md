# Backend Football Analytics Platform

## Introduction

Notre plateforme d'analyse footballistique utilise une architecture moderne basée sur des tâches asynchrones pour garantir performance et fiabilité. Au cœur de cette architecture se trouve Celery, un puissant gestionnaire de tâches asynchrones.

### Tâches Celery

Celery est un gestionnaire de tâches asynchrones qui nous permet d'exécuter des opérations longues ou complexes en arrière-plan. Dans notre application, nous l'utilisons pour :

1. **Mise à jour des matches (`update_matches`)** :
   - S'exécute tous les jours à minuit
   - Récupère les nouveaux matches et met à jour les résultats
   - Permet de ne pas bloquer l'application pendant la récupération des données

2. **Suivi des matches en direct (`update_live_matches`)** :
   - S'exécute toutes les 5 minutes
   - Met à jour les scores et événements des matches en cours
   - Envoie des notifications en temps réel via WebSocket

3. **Statistiques des équipes (`update_team_stats`)** :
   - S'exécute toutes les 6 heures
   - Calcule les statistiques globales (victoires, défaites, buts, etc.)
   - Met à jour les classements

4. **Statistiques des joueurs (`update_player_stats`)** :
   - S'exécute toutes les 12 heures
   - Met à jour les stats individuelles (buts, passes décisives, etc.)

5. **Valeurs marchandes (`update_market_values`)** :
   - S'exécute chaque lundi
   - Met à jour les estimations des valeurs des joueurs

### Tâches CRON

Les tâches CRON sont définies dans le `celery_app.py` via `beat_schedule`. Elles permettent de :

1. **Planifier l'exécution automatique** des tâches Celery à des moments précis :
```python
celery_app.conf.beat_schedule = {
    "update-matches-daily": {
        "task": "app.tasks.update_matches",
        "schedule": crontab(hour="0", minute="0"),  # Minuit
    },
    "update-live-matches": {
        "task": "app.tasks.update_live_matches",
        "schedule": crontab(minute="*/5"),  # Toutes les 5 min
    }
    # ...
}
```

2. **Optimiser les ressources** :
   - Les mises à jour lourdes (comme les valeurs marchandes) sont planifiées la nuit
   - Les mises à jour critiques (matches en direct) sont plus fréquentes
   - Les stats sont calculées à des intervalles réguliers pour équilibrer la charge

### Avantages de cette Architecture

1. **Performance** :
   - Les tâches lourdes ne bloquent pas l'API
   - Le frontend reste réactif
   - Les données sont mises en cache avec Redis

2. **Fiabilité** :
   - Gestion automatique des erreurs et retries
   - Isolation des tâches qui peuvent échouer
   - Traçabilité des opérations

3. **Scalabilité** :
   - Les workers Celery peuvent être répartis sur plusieurs serveurs
   - Le cache Redis permet de réduire la charge sur la base de données
   - Les WebSockets permettent des mises à jour en temps réel efficaces

## Architecture

Le backend est construit avec FastAPI, SQLAlchemy, Celery, et Redis pour fournir une plateforme robuste d'analyse de données footballistiques en temps réel.

### Technologies Principales

- **FastAPI**: API REST avec validation via Pydantic
- **SQLAlchemy**: ORM pour la gestion de la base de données
- **Celery**: Gestion des tâches asynchrones
- **Redis**: Cache et WebSockets
- **PostgreSQL**: Base de données principale

## Sources de Données

### 1. API-Football
- Données en temps réel des matches
- Statistiques détaillées des joueurs et équipes
- Cotes et prédictions
- Endpoint: `services/api_football.py`

### 2. Football-Data.org
- Calendriers des matches
- Résultats historiques
- Compositions d'équipes
- Endpoint: `services/football_data.py`

### 3. OpenLigaDB
- Données complémentaires sur les ligues allemandes
- Statistiques historiques
- Endpoint: `services/openliga_db.py`

## Système de Cache (Redis)

Le cache Redis (`cache.py`) est utilisé pour :

1. **Performance**
   - Mise en cache des résultats d'API
   - Stockage temporaire des statistiques calculées
   - Réduction de la charge sur la base de données

2. **WebSockets**
   - Communication en temps réel pour les matches en direct
   - Notifications des changements de score
   - Updates des statistiques en direct

## Modèles de Données (`models.py`)

1. **Leagues**
   - Informations sur les compétitions
   - Relations avec équipes et saisons

2. **Teams**
   - Détails des clubs
   - Statistiques d'équipe
   - Stade et informations géographiques

3. **Players**
   - Informations personnelles
   - Statistiques
   - Valeur marchande et historique

4. **Matches**
   - Résultats et événements
   - Statistiques de match
   - Données en direct

## Validation des Données (Pydantic)

Les schémas Pydantic (`schemas.py`) assurent :
- Validation des données entrantes
- Typage fort
- Documentation automatique de l'API

## Système de Cache Intelligent

```python
class RedisCache:
    # Stockage avec expiration
    def set(self, key: str, value: Any, ex: Optional[int] = None):
        data = json.dumps(value)
        self.client.set(key, data, ex=ex)

    # Récupération avec désérialisation
    def get(self, key: str) -> Optional[Any]:
        data = self.client.get(key)
        return json.loads(data) if data else None
```

## WebSockets pour Temps Réel

```python
class RedisWebSocket:
    # Publication d'updates
    def publish(self, channel: str, message: Any):
        data = json.dumps(message)
        self.client.publish(channel, data)

    # Réception des messages
    def get_message(self) -> Optional[dict]:
        message = self.pubsub.get_message()
        if message and message["type"] == "message":
            return json.loads(message["data"])
```

## Configuration et Déploiement

1. **Variables d'Environnement**
   - API keys
   - Configuration base de données
   - URLs des services

2. **Docker**
   - Conteneurisation des services
   - Orchestration via Docker Compose
   - Scaling horizontal possible

## Maintenance et Monitoring

1. **Logs**
   - Traces des appels API
   - Erreurs et exceptions
   - Performance des tâches Celery

2. **Métriques**
   - Temps de réponse API
   - Utilisation du cache
   - Charge des workers Celery

## Sécurité

1. **Rate Limiting**
   - Protection contre les abus
   - Quotas par API key

2. **Validation**
   - Sanitization des entrées
   - Validation des types
   - Protection contre les injections

## Développement

1. **Installation**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configuration**
   ```bash
   cp .env.example .env
   # Configurer les variables d'environnement
   ```

3. **Lancement**
   ```bash
   # API
   uvicorn app.main:app --reload
   
   # Celery Worker
   celery -A app.celery_app worker --loglevel=info
   
   # Celery Beat
   celery -A app.celery_app beat --loglevel=info
   ``` 