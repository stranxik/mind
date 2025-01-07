import requests
from typing import Dict, List
from ..config import settings

class FootballDataService:
    def __init__(self):
        self.base_url = "http://api.football-data.org/v4"
        self.headers = {
            'X-Auth-Token': settings.FOOTBALL_DATA_API_KEY
        }
    
    def get_competitions(self) -> Dict:
        """Récupère la liste des compétitions disponibles"""
        response = requests.get(
            f"{self.base_url}/competitions",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_matches(self, competition_id: str = None) -> Dict:
        """Récupère les matches d'une compétition"""
        url = f"{self.base_url}/matches"
        if competition_id:
            url = f"{self.base_url}/competitions/{competition_id}/matches"
        
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def get_team_info(self, team_id: str) -> Dict:
        """Récupère les informations d'une équipe"""
        response = requests.get(
            f"{self.base_url}/teams/{team_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_player_info(self, player_id: str) -> Dict:
        """Récupère les informations d'un joueur"""
        response = requests.get(
            f"{self.base_url}/persons/{player_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

    def get_standings(self, competition_id: str) -> Dict:
        """Récupère le classement d'une compétition"""
        response = requests.get(
            f"{self.base_url}/competitions/{competition_id}/standings",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json() 