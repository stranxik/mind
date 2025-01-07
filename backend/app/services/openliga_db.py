import requests
from typing import Dict, List

class OpenLigaDBService:
    def __init__(self):
        self.base_url = "https://api.openligadb.de"

    def get_current_season(self) -> int:
        return 2023  # Saison actuelle

    def get_bundesliga_matches(self, season: int = None) -> Dict:
        """Récupère les matches de Bundesliga"""
        if season is None:
            season = self.get_current_season()
        
        response = requests.get(
            f"{self.base_url}/getmatchdata/bl1/{season}"
        )
        response.raise_for_status()
        return response.json()

    def get_team_info(self, team_id: int) -> Dict:
        """Récupère les informations d'une équipe"""
        response = requests.get(
            f"{self.base_url}/getteam/{team_id}"
        )
        response.raise_for_status()
        return response.json()

    def get_current_group(self, league: str = "bl1") -> Dict:
        """Récupère la journée actuelle"""
        response = requests.get(
            f"{self.base_url}/getcurrentgroup/{league}"
        )
        response.raise_for_status()
        return response.json()

    def get_table(self, league: str = "bl1", season: int = None) -> Dict:
        """Récupère le classement"""
        if season is None:
            season = self.get_current_season()
            
        response = requests.get(
            f"{self.base_url}/getbltable/{league}/{season}"
        )
        response.raise_for_status()
        return response.json() 