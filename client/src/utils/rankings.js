import api from './api-config'
import { key } from './api-config'

import axios from 'axios'

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

  const authConfig = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      "authentication": {
        "username": `${process.env.REACT_APP_POSTGRES_USERNAME}`,
        "password": `${process.env.REACT_APP_POSTGRES_PASSWORD}`
      }
    }
  }

  const tokenData = await axios(`${process.env.REACT_APP_HEROKU_URL}auth/login`, authConfig)

  const config = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${tokenData.data.token}`,
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json"
    }
  }

  const resp = await axios(`${process.env.REACT_APP_HEROKU_URL}rankings`, config)
  return resp.data
  
}