import api from './api-config'

// Singles

  export const getPlayer = async (id) => {
    const resp = await api.get(`/players/${id}/profile.json`)
    return resp.data
  }

  export const getPlayerResults = async (id) => {
    const resp = await api.get(`/players/${id}/results.json`)
    return resp.data
  }

  export const getPlayerSchedule = async (id) => {
    const resp = await api.get(`/players/${id}/schedule.json`)
    return resp.data
  }

  export const getPlayerRivalry = async (home_id, away_id) => {
    const resp = await api.get(`/players/${home_id}/versus/${away_id}/matches.json`)
    return resp.data
  }

// Doubles

  export const getDoublesTeam = async (id) => {
    const resp = await api.get(`/double_teams/${id}/profile.json`)
    return resp.data
  }

  export const getDoublesTeamResults = async (id) => {
    const resp = await api.get(`/double_teams/${id}/results.json`)
    return resp.data
  }

  export const getDoublesTeamSchedule = async (id) => {
    const resp = await api.get(`/double_teams/${id}/schedule.json`)
    return resp.data
  }

  export const getDoublesTeamRivalry = async (home_id, away_id) => {
    const resp = await api.get(`/double_teams/${home_id}/versus/${away_id}/matches.json`)
    return resp.data
  }