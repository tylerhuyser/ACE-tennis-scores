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

  // const tokenData = await axios.post(`https://api.allorigins.win/raw?url=${process.env.REACT_APP_HEROKU_URL}auth/login`, {
  //   "authentication": {
  //     "username": `${process.env.REACT_APP_POSTGRES_USERNAME}`,
  //     "password": `${process.env.REACT_APP_POSTGRES_PASSWORD}`
  //   },
  //   "headers": {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   }
  // })

  const tokenData = await axios(`http://localhost:8080/${process.env.REACT_APP_HEROKU_URL}auth/login`, authConfig)

  console.log(tokenData)
  console.log(tokenData.data.token)

  const config = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${tokenData.data.token}`
    }
  }

  const resp = await axios(`http://localhost:8080/${process.env.REACT_APP_HEROKU_URL}rankings`, config)
  console.log(resp)
  return resp.data
  
}