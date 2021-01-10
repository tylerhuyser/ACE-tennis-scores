import api from './api-config'

export const getMatches = async (year, month, day) => {
  const resp = await api.get(`/schedules/${year}-${month}-${day}/schedule.json`)
  return resp.data
}

export const getMatch = async (id) => {
  const resp = await api.get(`/matches/${id}/summary.json`)
  return resp.data
}

export const getMatchDetails = async (id) => {
  const resp = await api.get(`/matches/${id}/timeline.json`)
  return resp.data
}