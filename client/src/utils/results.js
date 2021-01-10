import api from './api-config'

export const playerRankings = async () => {
  const resp = await api.get(`/players/rankings.jsxon`)
  return resp.data
}

export const playerRaceRankings = async () => {
  const resp = await api.get(`/players/race_rankings.jsxon`)
  return resp.data
}

export const doublesTeamRankings = async () => {
  const resp = await api.get(`/double_teams/rankings.jsxon`)
  return resp.data
}

export const doublesTeamRaceRankings = async () => {
  const resp = await api.get(`/double_teams/race_rankings.jsxon`)
  return resp.data
}