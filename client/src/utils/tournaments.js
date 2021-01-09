import api from './api-config'

export const getTournaments = async () => {
  const resp = await api.get('/tournaments.json')
  return resp.data
}

export const getCurrentTournaments = async () => {
  const resp = await api.get('/tournaments/ongoing.json')
  return resp.data
}

export const getDetailedTournamentInfo = async (id) => {
  const resp = await api.get(`/tournaments/${id}/info.json`)
  return resp.data
}

export const getTournamentSummary = async (id) => {
  const resp = await api.get(`/tournaments/${id}/summaries.json`)
  return resp.data
}

export const getTournamentSchedule = async (id) => {
  const resp = await api.get(`/tournaments/${id}/schedule.json`)
  return resp.data
}

export const getTournamentResults = async (id) => {
  const resp = await api.get(`/tournaments/${id}/resutls.json`)
  return resp.data
}