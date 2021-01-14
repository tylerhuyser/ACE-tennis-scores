import api from './api-config'
import { key } from './api-config'

export const getLiveMatches = async () => {
  const resp = await api.get(`/schedules/live/summaries.json${key}`)
  return resp.data
}