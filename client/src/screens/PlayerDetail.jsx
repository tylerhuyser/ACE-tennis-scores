import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Loader from '../components/Loader'
import PlayerCard from '../components/PlayerCard'

import './PlayerDetail.css'

import {
  getPlayer,
  getPlayerResults,
  getPlayerSchedule
} from "../utils/players"

export default function PlayerDetail(props) {

  const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState('Player Results')

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

  const results = playerResults && playerResults?.map((result) => (
    <div className="result-container">
      <p>Result Info</p>
    </div>
  ))

  const scheduleItems = playerSchedule && playerSchedule?.map((schedule) => (
    <div className="schedule-item-container">
      <p>Schedule Info</p>
    </div>
  ))

  console.log(playerResults)

  const handleChangeView = (view) => {
    switch (view) {
      case "Player Schedule":
        setView("Player Schedule")
        break;
      case "Player Results":
        setView("Player Results")
        break;
    }
  }
  
  return (
    
    <>

      { loaded ? 
      
        <Loader />

        :

        <>
          
          <div className="player-detail-container">

            <i class="fas fa-arrow-left" id="match-detail-back-button" onClick={(e) => handleReturnToTournament(e)} >BACK</i>

            <PlayerCard playerData={playerData} key={playerData.player.id} />
            
            <div className="player-views-container">

              <button className="player-views-button" id="completed-matches-button" onClick={(e) => handleChangeView("Player Results")}> Player Results</button>

              <button className="player-views-button" id="schedule-button" onClick={(e) => handleChangeView("Player Schedule")} > Player Schedule</button>

              {view === "Player Results" ? 
              
                <div className="player-results-container">

                  { results }

                </div>
              
                :
                
                <div className="player-schedule-container">

                  { scheduleItems }

                </div>
              
              }
              
            </div>

          </div>
          
        </>
      
      }

    </>
  )
}