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

  const tokenData = await axios.post(`https://api.allorigins.win/raw?url=${process.env.REACT_APP_HEROKU_URL}auth/login`, {
    "authentication": {
      "username": `${process.env.REACT_APP_POSTGRES_USERNAME}`,
      "password": `${process.env.REACT_APP_POSTGRES_PASSWORD}`
    }
  })

  console.log(tokenData)
  console.log(tokenData.data.token)

  const config = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${tokenData.data.token}`
    }
  }

  const resp = await axios(`https://api.allorigins.win/raw?url=${process.env.REACT_APP_HEROKU_URL}rankings`, config)
  return resp.data
  
}