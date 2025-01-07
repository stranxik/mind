export interface League {
    id: string;
    name: string;
    country: string;
    teams_count: number;
    matches_per_season: number;
    current_season?: string;
    logo_url?: string;
    country_code?: string;
    level?: number;
    founded_year?: number;
}

export interface Team {
    id: string;
    name: string;
    short_name?: string;
    league_id: string;
    founded_year?: number;
    stadium_name?: string;
    stadium_capacity?: number;
    stadium_city?: string;
    stadium_latitude?: number;
    stadium_longitude?: number;
    primary_color?: string;
    secondary_color?: string;
    manager_name?: string;
    manager_nationality?: string;
    manager_appointed?: string;
    stats?: {
        matches_played: number;
        wins: number;
        draws: number;
        losses: number;
        goals_for: number;
        goals_against: number;
        goal_difference: number;
        points: number;
        position: number;
        form: string[];
    };
}

export interface Player {
    id: string;
    name: string;
    team_id: string;
    position?: string;
    nationality?: string;
    birth_date?: string;
    height?: number;
    weight?: number;
    number?: number;
    stats?: {
        matches_played: number;
        minutes_played: number;
        goals: number;
        assists: number;
        yellow_cards: number;
        red_cards: number;
        shots: number;
        shots_on_target: number;
        pass_accuracy: number;
        rating: number;
    };
    market_value?: number;
    market_value_updated?: string;
}

export interface Match {
    id: string;
    competition_id: string;
    season_id: string;
    matchday: number;
    home_team_id: string;
    away_team_id: string;
    home_score?: number;
    away_score?: number;
    datetime: string;
    venue_id?: string;
    venue_name?: string;
    status: 'upcoming' | 'live' | 'finished';
    attendance?: number;
    referee_name?: string;
    stats?: {
        possession: [number, number];
        shots: [number, number];
        shots_on_target: [number, number];
        corners: [number, number];
        fouls: [number, number];
        yellow_cards: [number, number];
        red_cards: [number, number];
    };
    events?: Array<{
        type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
        minute: number;
        team_id: string;
        player_id: string;
        additional_info?: any;
    }>;
    home_team: Team;
    away_team: Team;
}

export interface TeamStats {
  position: number
  team: string
  played: number
  points: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  form: string[]
}

export interface Player {
  player: string
  team: string
  goals?: number
  assists?: number
  minutesPlayed: number
  gamesPlayed: number
  goalsPerGame?: number
  shotAccuracy?: number
  keyPasses?: number
  assistsPerGame?: number
}

export interface Match {
  id: string
  competition: string
  homeTeam: string
  awayTeam: string
  date: string
  score?: {
    home: number
    away: number
  }
  status: "finished" | "scheduled"
  stadium?: string
  attendance?: number
  stats?: {
    possession: {
      home: number
      away: number
    }
    shots: {
      home: number
      away: number
    }
    shotsOnTarget: {
      home: number
      away: number
    }
    corners: {
      home: number
      away: number
    }
  }
}

export interface LeagueData {
  classement: {
    [key: string]: TeamStats[]
  }
  performances: {
    topScorers: Player[]
    topAssists: Player[]
  }
  matches: {
    recent: Match[]
    upcoming: Match[]
  }
  europe: {
    [key: string]: {
      groups: TeamStats[]
    }
  }
} 