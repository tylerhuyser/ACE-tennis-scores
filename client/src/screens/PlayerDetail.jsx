import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Loader from '../components/Loader'

import './PlayerDetail.css'

import {
  getPlayer,
  getPlayerResults,
  getPlayerSchedule
} from "../utils/players"

export default function PlayerDetail(props) {

  const [loaded, setLoaded] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const [playerResults, setPlayerResults] = useState(null)
  const [playerSchedule, setPlayerSchedule] = useState(null)

  useEffect(() => {

    const currentPlayer = localStorage.getItem('currentPlayer')
    const playerScheduleData = localStorage.getItem('playerSchedule')
    const playerResultsData = localStorage.getItem('playerResults')
    const playerDetails = localStorage.getItem('playerDetails')


    if (playerDetails === undefined) {

      currentPlayerID = currentPlayer.player.id

      const gatherPlayerData = async (currentPlayerID) => {
        const playerInfo = getPlayer(currentPlayerID)
        setPlayerData(playerInfo)
      }

      gatherPlayerData(currentPlayerID)
      localStorage.setItem('playerDetails', JSON.stringigy(player))

      const gatherPlayerResults = async (currentPlayerID) => {
        const playerResultsInfo = await getPlayerResults(currentPlayerID)
        setPlayerResults(playerResultsInfo)
      }

      gatherPlayerResults(currentPlayerID)
      localStorage.setItem('playerResults', JSON.stringigy(playerResults))

      const gatherPlayerSchedule = async (currentPlayerID) => {
        const playerScheduleInfo = await getPlayerSchedule(currentPlayerID)
        setPlayerSchedule(playerScheduleInfo)
      }

      gatherPlayerSchedule(currentPlayerID)
      localStorage.setItem('playerSchedule', JSON.stringigy(playerScheduleInfo))

    } else {

      setPlayerData(JSON.parse(playerDetails))
      setPlayerResults(JSON.parse(playerResultsData))
      setPlayerSchedule(JSON.parse(playerScheduleData))
    }
  }, [])
  
  return (
    <div className="player-detail-container">

      { loaded ? 
      
        <Loader />

        :

        <>
          
        </>
      
      }
      
    </div>
  )
}