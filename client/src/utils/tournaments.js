import api from './api-config'
import { key } from './api-config'

import rapidAPI from './rapidAPI-config'

export const getTournaments = async () => {
  const resp = await api.get(`/tournaments.json${key}`)
  return resp.data
}

export const getCurrentTournaments = async () => {
  try {
    console.log('inside api')
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

const currentDate = new Date()
const currentSeason = currentDate.getFullYear()

export const getTournamentsRapidAPI = async () => {
  try {
    const atpTournaments = await rapidAPI.get(`/tournaments/ATP/${currentSeason}`)
    const wtaTournaments = await rapidAPI.get(`/tournaments/WTA/${currentSeason}`)
    console.log(atpTournaments)
    const tournaments = atpTournaments.data.concat(wtaTournaments.data)
    return tournaments
  } catch (error) {
    console.log(error)
  }
}