import api from './api-config'
import { key } from './api-config'

export const playerRankings = async () => {
  const resp = await api.get(`/players/rankings.json${key}`)
  return resp.data
}

export const playerRaceRankings = async () => {
  const resp = await api.get(`/players/race_rankings.json${key}`)
  return resp.data
}

export const doublesTeamRankings = async () => {
  const resp = await api.get(`/double_teams/rankings.json${key}`)
  return resp.data
}

export const doublesTeamRaceRankings = async () => {
  const resp = await api.get(`/double_teams/race_rankings.json${key}`)
  return resp.data
}