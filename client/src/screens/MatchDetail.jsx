import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import MatchCard from '../components/MatchCard'
import Loader from '../components/Loader'

import './MatchDetail.css'

import {
  getMatchDetails
} from "../utils/matches"

export default function MatchDetail(props) {
  
  const [ loaded, setLoaded ] = useState(false)
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
 
    } else {

      const matchID = JSON.parse(match).sport_event.id
      console.log(matchID)

      const getMatchStatistics = async (matchID) => {
        const matchDetails = await getMatchDetails(matchID)
        console.log(matchDetails)

        setMatchData(matchDetails)
        setHomeStats(matchDetails.statistics.teams[0])
        setAwayStats(matchDetails.statistics.teams[1])
        console.log(matchDetails.statistics.teams[0])

        localStorage.setItem('matchDetails', JSON.stringify(matchDetails))
      }
      getMatchStatistics(matchID)

    }
  }, [])

  useEffect(() => {

    if (awayStats) {
      setLoaded(true)
    }

  }, [awayStats])

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
    const tournamentID = JSON.parse(currentTournament).id
    history.push(`/tournament/${tournamentID}`)
  }

  return (

    <>

      { ((loaded === false) || (matchData === null)) ? 
        
        <Loader />
     :
        
        <div className="match-detail-container">

          <i class="fas fa-arrow-left" id="match-detail-back-button" onClick={(e) => handleReturnToTournament(e)} >    BACK</i>

          <MatchCard matchData={matchData} key={matchData.sport_event.id} />

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

              <p className="statistic-category">Total Points Won</p>

            </div>

            <div className="competitor-statistics-container" id="home">

              <p className="statistic-category" id="competitor-statistics-container-title">{`${homeStats.name}`}</p>

              <p className="statistic-category">{homeStats.statistics.first_serve_successful}{`/`}{homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults}{` (`}{(homeStats.statistics.first_serve_successful / (homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults) * 100).toFixed(1)}{`%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.second_serve_successful}/${homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults} (${(homeStats.statistics.second_serve_successful / (homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults) * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.aces}`}</p>

              <p className="statistic-category">{`${homeStats.statistics.double_faults}`}</p>

              <p className="statistic-category">{`${homeStats.statistics.first_serve_points_won}/${homeStats.statistics.first_serve_successful} (${(homeStats.statistics.first_serve_points_won / homeStats.statistics.first_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.second_serve_points_won}/${homeStats.statistics.second_serve_successful} (${(homeStats.statistics.second_serve_points_won / homeStats.statistics.second_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.receiver_points_won}/${(awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful)} (${((homeStats.statistics.receiver_points_won / (awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful) * 100)).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.breakpoints_won}/${homeStats.statistics.total_breakpoints} (${(homeStats.statistics.breakpoints_won / homeStats.statistics.total_breakpoints * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.points_won}`}</p>

            </div>

            <div className="competitor-statistics-container" id="away">

              <p className="statistic-category" id="competitor-statistics-container-title">{`${awayStats.name}`}</p>

              <p className="statistic-category">{awayStats.statistics.first_serve_successful}{`/`}{awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults}{` (`}{(awayStats.statistics.first_serve_successful / (awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults) * 100).toFixed(1)}{`%)`}</p>

              <p className="statistic-category">{`${awayStats.statistics.second_serve_successful}/${awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults} (${(awayStats.statistics.second_serve_successful / (awayStats.statistics.second_serve_successful + awayStats.statistics.double_faults) * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${awayStats.statistics.aces}`}</p>

              <p className="statistic-category">{`${awayStats.statistics.double_faults}`}</p>

              <p className="statistic-category">{`${awayStats.statistics.first_serve_points_won}/${awayStats.statistics.first_serve_successful} (${(awayStats.statistics.first_serve_points_won / awayStats.statistics.first_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${awayStats.statistics.second_serve_points_won}/${awayStats.statistics.second_serve_successful} (${(awayStats.statistics.second_serve_points_won / awayStats.statistics.second_serve_successful * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${awayStats.statistics.receiver_points_won}/${(homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful)} (${((awayStats.statistics.receiver_points_won / (homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful) * 100)).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${awayStats.statistics.breakpoints_won}/${awayStats.statistics.total_breakpoints} (${(awayStats.statistics.breakpoints_won / awayStats.statistics.total_breakpoints * 100).toFixed(1)}%)`}</p>

              <p className="statistic-category">{`${awayStats.statistics.points_won}`}</p>
          
            </div>

          </div>
      
        </div>
      }
    </>
  )
}