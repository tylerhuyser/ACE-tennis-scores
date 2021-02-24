import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Loader from '../components/Loader'
import TournamentCard from '../components/TournamentCard'
import ResultsContainer from '../components/ResultsContainer'
import PlayerCard from '../components/PlayerCard'

import './PlayerDetail.css'

import {
  getPlayer,
  getPlayerResults,
  getPlayerSchedule
} from "../utils/players"

export default function PlayerDetail(props) {

  const [ dataLoaded, setDataLoadedm] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState('Player Results')

  const [playerData, setPlayerData] = useState(null)
  const [playerResults, setPlayerResults] = useState(null)
  const [playerSchedule, setPlayerSchedule] = useState(false)

  const currentYear = new Date().getFullYear()
  const history = useHistory()

  useEffect(() => {

    const currentPlayer = localStorage.getItem('currentPlayer')
    const playerScheduleData = localStorage.getItem('playerSchedule')
    const playerResultsData = localStorage.getItem('playerResults')
    const playerDetails = localStorage.getItem('playerDetails')

    if (playerDetails === undefined || playerDetails === null || playerDetails.length <= 2) {

      console.log('gathering player data via API Call 1')

      const currentPlayerID = JSON.parse(currentPlayer).player.id

      const gatherPlayerData = async (currentPlayerID) => {
        const playerInfo = await getPlayer(currentPlayerID)
        console.log(playerInfo)
        localStorage.setItem('playerDetails', JSON.stringify(playerInfo))
        setPlayerData(playerInfo)
      }

      const timeOut = setTimeout(() => gatherPlayerData(currentPlayerID), 3001)
      return () => clearTimeout(timeOut)

    } else {

      console.log(
        'gathering Player Data from LocalStorage'
      )

      setPlayerData(JSON.parse(playerDetails))
      setPlayerResults(JSON.parse(playerResultsData))
      setPlayerSchedule(JSON.parse(playerScheduleData))
    }
  }, [])

  useEffect(() => {

    if (playerData !== null && playerData !== undefined && Object.keys(playerData).length !== 0) {

      const currentPlayer = localStorage.getItem('currentPlayer')
      const currentPlayerID = JSON.parse(currentPlayer).player.id

      const gatherPlayerResults = async (currentPlayerID) => {
        const playerResultsInfo = await getPlayerResults(currentPlayerID)
        localStorage.setItem('playerResults', JSON.stringify(playerResults))
        setPlayerResults(playerResultsInfo)
      }

      gatherPlayerResults(currentPlayerID)
    }

  }, [playerData])

  useEffect(() => {

    if (playerData !== null && playerData !== undefined && Object.keys(playerData).length !== 0) {

      const currentPlayer = localStorage.getItem('currentPlayer')
      const currentPlayerID = JSON.parse(currentPlayer).player.id

      const gatherPlayerSchedule = async (currentPlayerID) => {
        const playerScheduleInfo = await getPlayerSchedule(currentPlayerID)
        localStorage.setItem('playerSchedule', JSON.stringify(playerScheduleInfo))
        setPlayerSchedule(playerScheduleInfo)
        setDataLoadedm(true)
      }

      const timeOut = setTimeout(() => gatherPlayerSchedule(currentPlayerID), 1001)
      return () => clearTimeout(timeOut)

    }

  }, [playerData])

  useEffect(() => {

    console.log(playerData)
    console.log('PlayerData and PlayerSchedule/Results are being checked')

    if (dataLoaded) {

      console.log('data has been loaded and component will mount')
      setLoaded(true)
    }
  }, [dataLoaded])

  const scheduleItems = playerSchedule && playerSchedule?.schedule.map((tournament, index) => {

    const startDate = new Date(tournament.season.start_date)
    const endDate = new Date(tournament.season.end_date)

    return (

    <TournamentCard
      tournament={tournament}
      index={index}
      key={tournament.id}
      startDate={startDate}
      endDate={endDate}
    />
      
  )})

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

  const handleReturnToTournament = (e) => {
    localStorage.removeItem('currentPlayer')
    history.push('/rankings')
  }
  
  return (
    
    <>

      { !loaded ? 
      
        <Loader />

        :

        <>
          
          <div className="player-detail-container">

            <i className="fas fa-arrow-left" id="match-detail-back-button" onClick={(e) => handleReturnToTournament(e)} >    BACK</i>

            <PlayerCard playerData={playerData} key={playerData.player.id} />
            
            <div className="player-views-container">

              <button className="player-views-button" id="completed-matches-button" onClick={(e) => handleChangeView("Player Results")}> Player Results</button>

              <button className="player-views-button" id="schedule-button" onClick={(e) => handleChangeView("Player Schedule")} > Player Schedule</button>

            </div>

              {view === "Player Results" ? 
              
                <div className="player-results-container">

                  <ResultsContainer playerResults={playerResults} />

                </div>
              
                :
                
                <div className="player-schedule-container">

                  { scheduleItems }

                </div>
              
              }
              
            </div>
          
        </>
      
      }

    </>
  )
}