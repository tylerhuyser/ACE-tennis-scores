import api from './api-config'
import { key } from './api-config'
import rapidAPI from './rapidAPI-config'

export const getDailySchedule = async (year, month, day) => {
  const resp = await api.get(`/schedules/${year}-${month}-${day}/schedule.json${key}`)
  return resp.data
}

export const getDailyResults = async (year, month, day) => {
  const resp = await api.get(`/schedules/${year}-${month}-${day}/results.json${key}`)
  return resp.data
}

export const getMatch = async (id) => {
  const resp = await api.get(`/matches/${id}/summary.json${key}`)
  return resp.data
}

export const getMatchDetails = async (id) => {
  const resp = await api.get(`/matches/${id}/timeline.json${key}`)
  return resp.data
}

export const getDailyMatchesRapidAPI = async (currentYear, currentMonth, currentDay) => {
  const resp = await rapidAPI.get(`/matches-by-date/${currentYear}-${currentMonth}-${currentDay}`)
  return resp.data.results
}

export const getDailyTournamentMatchesAndResults = async (tournamentID, currentYear, currentMonth, currentDay) => {
  const resp = await rapidAPI.get(`/matches-results/${tournamentID}/${currentYear}-${currentMonth}-${currentDay}`)
  return resp.data.results.matches
}