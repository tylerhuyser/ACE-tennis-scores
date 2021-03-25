import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import MatchCard from '../components/MatchCard'
import Loader from '../components/Loader'
import MobileBanner from '../components/adSense/MobileBanner'

import './MatchDetail.css'

import {
  getMatchDetails
} from "../utils/matches"

export default function MatchDetail(props) {
  
  const [matchDetailsLoaded, setMatchDetailsLoaded] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [ matchData, setMatchData ] = useState(null)
  const [ homeStats, setHomeStats] = useState(null)
  const [ awayStats, setAwayStats ] = useState(null)

  const history = useHistory()

  useEffect(() => {

    const match = localStorage.getItem('currentMatch')
    const matchDetails = localStorage.getItem('matchDetails')

    if (matchDetails) {
      setMatchData(JSON.parse(matchDetails))
      setHomeStats(JSON.parse(matchDetails).statistics.teams[0])
      setAwayStats(JSON.parse(matchDetails).statistics.teams[1])
      setMatchDetailsLoaded(true)
 
    } else {

      const matchID = JSON.parse(match).sport_event.id
      console.log(matchID)

      const getMatchStatistics = async (matchID) => {
        const matchDetails = await getMatchDetails(matchID)
        console.log(matchDetails)
        setMatchData(matchDetails)
        localStorage.setItem('matchDetails', JSON.stringify(matchDetails))
        if (matchDetails.statistics) {
          setHomeStats(matchDetails.statistics.teams[0])
          setAwayStats(matchDetails.statistics.teams[1])
          console.log(matchDetails.statistics.teams[0])
          setMatchDetailsLoaded(true)
        } else {
          setMatchDetailsLoaded(true)
        }
      }
      getMatchStatistics(matchID)

    }
  }, [])

  useEffect(() => {

    if (matchDetailsLoaded) {
      setLoaded(true)
    }

  }, [matchDetailsLoaded])

  useEffect(() => {

    const interval = setInterval(() => {

      if (matchData.matchStatus === "live") {
          const getLiveMatchStatistics = async (matchID) => {
            const matchDetails = await getMatchDetails(matchID)
            setMatchData(matchDetails)
          }
          getLiveMatchStatistics(matchData.sport_event.id)
       } else {
         clearInterval(interval)
      }
    }, 60000);
   
    return () => clearInterval(interval);

  }, [loaded])

  const handleReturnToTournament = () => {
    const currentTournament = localStorage.getItem('currentSinglesTournament')
    const currentPlayer = localStorage.getItem('currentPlayer')

    if (currentTournament) {
      const tournamentID = JSON.parse(currentTournament).id
      localStorage.removeItem("currentMatch")
      localStorage.removeItem('matchDetails')
      history.push(`/tournament/${tournamentID}`)
    } else if (currentPlayer) {
      const playerID = JSON.parse(currentPlayer).id
      localStorage.removeItem("currentMatch")
      localStorage.removeItem('matchDetails')
      history.push(`/player/${playerID}`)
    }
  }

  return (

    <>

      { ((loaded === false) || (matchData === null)) ? 
        
        <Loader />
     :
        
        <div className="match-detail-container">

          <div className="back-button-container" onClick={(e) => handleReturnToTournament(e)}>

            <i className="fas fa-arrow-left" id="match-detail-back-button" ></i>

            <p className="back-button-copy">BACK</p>

          </div>

          <MatchCard matchData={matchData} key={matchData.sport_event.id} />

          <MobileBanner />

          <p className="match-statistics-title">MATCH STATISTICS</p>

          <div className="match-statistics-container">

            <div className="match-statistic-categories-container">

              <p className="statistic-category" id="placeholder-category"></p>

              <p className="statistic-category">First Serve Percentage</p>

              <p className="statistic-category">Second Serve Percentage</p>

              <p className="statistic-category">Aces</p>

              <p className="statistic-category">Double Faults</p>

              <p className="statistic-category">First Serve Points Won</p>

              <p className="statistic-category">Second Serve Points Won</p>

              <p className="statistic-category">Receiving Points Won</p>

              <p className="statistic-category">Break Points</p>

              <p className="statistic-category total-points">Total Points Won</p>

            </div>

            <div className="competitor-statistics-container" id="home">

              <p className="statistic-category" id="competitor-statistics-container-title">{`${homeStats.name}`}</p>

              <p className="statistic-category" id="competitor-statistic">{homeStats.statistics.first_serve_successful}{`/`}{homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults}{` (`}{(homeStats.statistics.first_serve_successful / (homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults) * 100).toFixed(1)}{`%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.second_serve_successful}/${homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults} (${(homeStats.statistics.second_serve_successful / (homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults) * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.aces}`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.double_faults}`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.first_serve_points_won}/${homeStats.statistics.first_serve_successful} (${(homeStats.statistics.first_serve_points_won / homeStats.statistics.first_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.second_serve_points_won}/${homeStats.statistics.second_serve_successful} (${(homeStats.statistics.second_serve_points_won / homeStats.statistics.second_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.receiver_points_won}/${(awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful)} (${((homeStats.statistics.receiver_points_won / (awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful) * 100)).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${homeStats.statistics.breakpoints_won}/${homeStats.statistics.total_breakpoints} (${(homeStats.statistics.breakpoints_won / homeStats.statistics.total_breakpoints * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category total-points" id="competitor-statistic">{`${homeStats.statistics.points_won}`}</p>

            </div>

            <div className="competitor-statistics-container" id="away">

              <p className="statistic-category" id="competitor-statistics-container-title">{`${awayStats.name}`}</p>

              <p className="statistic-category" id="competitor-statistic">{awayStats.statistics.first_serve_successful}{`/`}{awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults}{` (`}{(awayStats.statistics.first_serve_successful / (awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults) * 100).toFixed(1)}{`%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.second_serve_successful}/${awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults} (${(awayStats.statistics.second_serve_successful / (awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults) * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.aces}`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.double_faults}`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.first_serve_points_won}/${awayStats.statistics.first_serve_successful} (${(awayStats.statistics.first_serve_points_won / awayStats.statistics.first_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.second_serve_points_won}/${awayStats.statistics.second_serve_successful} (${(awayStats.statistics.second_serve_points_won / awayStats.statistics.second_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.receiver_points_won}/${(homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful)} (${((awayStats.statistics.receiver_points_won / (homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful) * 100)).toFixed(1)}%)`}</p>

              <p className="statistic-category" id="competitor-statistic">{`${awayStats.statistics.breakpoints_won}/${awayStats.statistics.total_breakpoints} (${(awayStats.statistics.breakpoints_won / awayStats.statistics.total_breakpoints * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category total-points" id="competitor-statistic">{`${awayStats.statistics.points_won}`}</p>
          
            </div>

          </div>
      
        </div>
      }
    </>
  )
}