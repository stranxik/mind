import { create } from 'zustand'

interface Player {
  id: number
  name: string
  team: string
  position: string
}

interface SelectedTeamState {
  favoriteTeam: string
  followedPlayers: Player[]
  setFavoriteTeam: (team: string) => void
  setFollowedPlayers: (players: Player[]) => void
  initializeFromPreferences: (preferences: { favoriteTeam: string, followedPlayers: Player[] }) => void
}

export const useSelectedTeam = create<SelectedTeamState>((set) => ({
  favoriteTeam: "Paris Saint-Germain",
  followedPlayers: [],
  setFavoriteTeam: (team) => set({ favoriteTeam: team }),
  setFollowedPlayers: (players) => set({ followedPlayers: players }),
  initializeFromPreferences: (preferences) => set({
    favoriteTeam: preferences.favoriteTeam,
    followedPlayers: preferences.followedPlayers
  })
})) 