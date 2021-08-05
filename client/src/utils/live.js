import api from './api-config'
import { key } from './api-config'
import goalServeAPI from './goalServe-config'

export const getLiveMatches = async () => {
  const resp = await api.get(`/schedules/live/summaries.json${key}`)
  return resp.data
}

export const getLiveMatchesGoalServe = async () => {
  const resp = await goalServeAPI.get('tennis_scores/home?json=1')
  console.log(resp.data)
  return resp.data
}