import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface StatsResponse {
    leagues: League[];
    teams: Team[];
    players: Player[];
    matches: Match[];
}

// API endpoints pour les ligues
export const getLeagues = () => api.get<League[]>('/leagues');
export const getLeague = (id: string) => api.get<League>(`/leagues/${id}`);

// API endpoints pour les équipes
export const getTeams = (leagueId?: string) => {
    const params = leagueId ? { league_id: leagueId } : {};
    return api.get<Team[]>('/teams', { params });
};
export const getTeam = (id: string) => api.get<Team>(`/teams/${id}`);

// API endpoints pour les joueurs
export const getPlayers = (teamId?: string, position?: string) => {
    const params = {
        ...(teamId && { team_id: teamId }),
        ...(position && { position }),
    };
    return api.get<Player[]>('/players', { params });
};
export const getPlayer = (id: string) => api.get<Player>(`/players/${id}`);

// API endpoints pour les matches
export const getMatches = (params?: {
    league_id?: string;
    team_id?: string;
    status?: 'upcoming' | 'live' | 'finished';
    date_from?: string;
    date_to?: string;
}) => api.get<Match[]>('/matches', { params });

export const getLiveMatches = () => 
    api.get<Match[]>('/matches', { params: { status: 'live' } });

// API endpoints pour les statistiques
export const getTopScorers = (leagueId?: string, limit: number = 10) =>
    api.get('/statistics/top-scorers', { params: { league_id: leagueId, limit } });

export const getTopAssists = (leagueId?: string, limit: number = 10) =>
    api.get('/statistics/top-assists', { params: { league_id: leagueId, limit } });

// WebSocket connection pour les updates en temps réel
export const connectToWebSocket = (matchId: string): WebSocket => {
    const ws = new WebSocket(`ws://${API_BASE_URL.replace('http://', '')}/ws/matches/${matchId}`);
    
    ws.onopen = () => {
        console.log('Connected to WebSocket');
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    
    return ws;
};

export default api; 