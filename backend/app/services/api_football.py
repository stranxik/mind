import requests
from typing import Dict, List
from ..config import settings

class APIFootballService:
    def __init__(self):
        self.base_url = "https://api-football-v1.p.rapidapi.com/v3"
        self.headers = {
            'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
            'x-rapidapi-key': settings.API_FOOTBALL_KEY
        }

    def get_leagues(self) -> Dict:
        """Récupère les ligues disponibles"""
        response = requests.get(
            f"{self.base_url}/leagues",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

    def get_team_info(self, team_id: int) -> Dict:
        """Récupère les informations d'une équipe"""
        response = requests.get(
            f"{self.base_url}/teams",
            headers=self.headers,
            params={"id": team_id}
        )
        response.raise_for_status()
        return response.json()

    def get_fixtures(self, league_id: int, season: int) -> Dict:
        """Récupère les matches d'une ligue"""
        response = requests.get(
            f"{self.base_url}/fixtures",
            headers=self.headers,
            params={
                "league": league_id,
                "season": season
            }
        )
        response.raise_for_status()
        return response.json()

    def get_standings(self, league_id: int, season: int) -> Dict:
        """Récupère le classement d'une ligue"""
        response = requests.get(
            f"{self.base_url}/standings",
            headers=self.headers,
            params={
                "league": league_id,
                "season": season
            }
        )
        response.raise_for_status()
        return response.json() 