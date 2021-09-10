import api from './api-config'
import { key } from './api-config'

import rapidAPI from './rapidAPI-config'

export const getTournaments = async () => {
  const resp = await api.get(`/tournaments.json${key}`)
  return resp.data
}

export const getCurrentTournaments = async () => {
  try {
    const resp = await api.get(`/tournaments/ongoing.json${key}`)
    return resp.data
  }
  catch (error) {
    console.log(error)
  }
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
  const resp = await api.get(`/tournaments/${id}/results.json${key}`)
  return resp.data
}

export const getTournamentsRapidAPI = async (year) => {
  const atpResponse = await rapidAPI.get(`/tournaments/ATP/${year}`)
  const wtaResponse = await rapidAPI.get(`/tournaments/WTA/${year}`)
  const allTournaments = atpResponse.data.results.concat(wtaResponse.data.results)
  return allTournaments
}