from ..rag.engine import FootballRAGEngine
from ..services.football_data import FootballDataService
import json

def format_competition_data(competition):
    return f"""
    Compétition : {competition['name']}
    Pays : {competition.get('area', {}).get('name', 'Non spécifié')}
    Type : {competition.get('type', 'Non spécifié')}
    Saison actuelle : {competition.get('currentSeason', {}).get('startDate', '')} à {competition.get('currentSeason', {}).get('endDate', '')}
    """

def format_team_data(team):
    return f"""
    Équipe : {team['name']}
    Stade : {team.get('venue', 'Non spécifié')}
    Fondée en : {team.get('founded', 'Non spécifié')}
    Couleurs : {team.get('clubColors', 'Non spécifié')}
    """

def load_initial_data():
    # Initialisation des services
    football_service = FootballDataService()
    rag_engine = FootballRAGEngine()
    
    try:
        # Récupération des compétitions
        competitions = football_service.get_competitions()
        competition_texts = [format_competition_data(comp) for comp in competitions['competitions']]
        rag_engine.add_documents(competition_texts, [{"type": "competition"} for _ in competition_texts])
        
        # Pour chaque compétition majeure, récupérer le classement
        major_competitions = ['PL', 'PD', 'BL1', 'SA', 'FL1']  # Premier League, La Liga, Bundesliga, Serie A, Ligue 1
        for comp_code in major_competitions:
            try:
                standings = football_service.get_standings(comp_code)
                standings_text = f"Classement {standings['competition']['name']}:\n"
                for standing in standings['standings'][0]['table']:
                    standings_text += f"{standing['position']}. {standing['team']['name']} - {standing['points']} points\n"
                rag_engine.add_documents([standings_text], [{"type": "standings", "competition": comp_code}])
            except Exception as e:
                print(f"Erreur lors de la récupération du classement pour {comp_code}: {str(e)}")
        
        print("Données initiales chargées avec succès !")
        
    except Exception as e:
        print(f"Erreur lors du chargement des données : {str(e)}")

if __name__ == "__main__":
    load_initial_data() 