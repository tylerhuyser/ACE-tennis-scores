import api from './api-config'
import { key } from './api-config'

import axios from 'axios';
require('dotenv').config()

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

export const herokuRankings = async () => {

  const token = await axios.get(`${process.env.HEROKU_URL}auth/login`, {
    "authentication": {
      "username": `${process.env.POSTGRES_USERNAME}`,
      "password": `${process.env.POSTGRES_PASSWORD}`
    }
  })

  const config = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const resp = await axios(`${process.env.HEROKU_URL}rankings`, config)
  return resp.data
  
}