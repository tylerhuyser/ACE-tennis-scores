import api from './api-config'
import { key } from './api-config'

export const getTournaments = async () => {
  const resp = await api.get(`/tournaments.json${key}`)
  return resp.data
}

export const getCurrentTournaments = async () => {
  console.log('inside api')
  const resp = await api.get(`/tournaments/ongoing.json${key}`)
  console.log(resp)
  return resp.data
}

export const getDetailedTournamentInfo = async (id) => {
  const resp = await api.get(`/tournaments/${id}/info.json${key}`)
  return resp.data
}

export const getTournamentSummary = async (id) => {
  const resp = await api.get(`/tournaments/${id}/summaries.json${key}`)
  return resp.data
}

export const getTournamentSchedule = async (id) => {
  const resp = await api.get(`/tournaments/${id}/schedule.json${key}`)
  return resp.data
}

export const getTournamentResults = async (id) => {
  const resp = await api.get(`/tournaments/${id}/resutls.json${key}`)
  return resp.data
}