import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Loader from '../components/Loader'
import TournamentCard from '../components/TournamentCard'
import MatchCard from '../components/MatchCard'
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
  const [playerSchedule, setPlayerSchedule] = useState(null)

  const currentYear = new Date().getFullYear()
  const history = useHistory()

  useEffect(() => {

    const currentPlayer = localStorage.getItem('currentPlayer')
    const playerScheduleData = localStorage.getItem('playerSchedule')
    const playerResultsData = localStorage.getItem('playerResults')
    const playerDetails = localStorage.getItem('playerDetails')

    console.log(playerDetails)
    console.log(currentPlayer)

    if (playerDetails === undefined || playerDetails === null || playerDetails.length <= 2) {

      console.log('ere1')

      const currentPlayerID = JSON.parse(currentPlayer).player.id

      const gatherPlayerData = async (currentPlayerID) => {
        const playerInfo = getPlayer(currentPlayerID)
        console.log(playerInfo)
        localStorage.setItem('playerDetails', JSON.stringify(playerInfo))
        setPlayerData(playerInfo)
      }

      const timeOut = setTimeout(() => gatherPlayerData(currentPlayerID), 3001)
      return () => clearTimeout(timeOut)

    } else {

      console.log(
        'here2'
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
      }

      const timeOut = setTimeout(() => gatherPlayerSchedule(currentPlayerID), 1001)
      return () => clearTimeout(timeOut)

    }

  }, [playerData])

  useEffect(() => {

    console.log(playerData)
    console.log('evel 3')

    if (dataLoaded) {

      console.log(playerData)
      setLoaded(true)
    }
  }, [dataLoaded])

  const uniqueTournamentsArray = playerResults && playerResults?.results.find((result) => {
    let tournaments = []
    if (!tournaments.includes(result.sport_event.id) && result.sport_event.season.name === currentYear.toString()) {
      tournaments.push(result.sport_event.id)
    }
    console.log(tournaments)
    return tournaments
  })

  console.log(uniqueTournamentsArray)

  const resultsa = uniqueTournamentsArray && uniqueTournamentsArray?.forEach((tournament, index) => {

    const startDate = new Date(tournament.current_season.start_date)
    const endDate = new Date(tournament.current_season.end_date)

    const tournamentResults = playerResults.filter((result) => (
      results.sport_event.id === tournament
    )).map((result, index) => (
      <MatchCard matchData={result} key={result.sport_event.id} />
    ))

    return (
      <>
        <TournamentCard
          tournament={tournament}
          index={index}
          key={tournament.id}
          startDate={startDate}
          endDate={endDate}
        />

        {tournamentResults}
      </>
    )
  })

  const results = playerResults && playerResults?.results.map((result) => (
 
      <MatchCard matchData={result} key={result.sport_event.id} />

  ))

  const scheduleItems = playerSchedule && playerSchedule?.schedule.map((tournament, index) => {

    const startDate = new Date(tournament.current_season.start_date)
    const endDate = new Date(tournament.current_season.end_date)

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

  const handleReturnToTournament = () => {
    history.push('/rankings')
  }
  
  return (
    
    <>

      { !loaded ? 
      
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