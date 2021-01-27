import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import MatchCard from '../components/MatchCard'
import Loader from '../components/Loader'

import {
  getMatchDetails
} from "../utils/matches"

export default function MatchDetail(props) {
  
  const [ loaded, setLoaded ] = useState(false)
  const [ matchData, setMatchData ] = useState(null)
  const [ homeStats, setHomeStats] = useState(null)
  const [ awayStats, setAwayStats ] = useState(null)

  const params = useParams();

  const {  dailySchedule, dailyResults, liveMatches, currentDate } = props;

  useEffect(() => {

    const match = localStorage.getItem('currentMatch')
    const matchDetails = localStorage.getItem('matchDetails')

    if (matchDetails) {
      setMatchData(JSON.parse(matchDetails))
      setLoaded(true)
    } else {

      const matchID = JSON.parse(match).sport_event.id

      const getMatchStatistics = async (matchID) => {
        const matchDetails = await getMatchDetails(matchID)
        setMatchData(matchDetails)
        setLoaded(true)
      }
      getMatchStatistics(matchID)

    }
  }, [])

  useEffect(() => {

    if (loaded) {

      setHomeStats(matchData.statistics.teams[0])
      setAwayStats(matchData.statistics.teams[1])
    }

  }, [loaded])

  useEffect(() => {

    const interval = setInterval(() => {

      if (matchData.matchStatus === "live") {
         const fetchMatch = async (matchID) => {
           const data = await getMatch(matchID)
           setMatchData(data)
         }
         fetchMatch(matchData.sport_event.id)
       } else {
         clearInterval(interval)
      }
    }, 60000);
   
    return () => clearInterval(interval);

  }, [loaded])

  return (

    <>

      { ((loaded === false) && (matchData === null)) ? 
        
        <Loader />
     :
        
        <div className="match-detail-container">

          <MatchCard matchData={matchData} key={matchData.sport_event.id} />

          <div className="match-statistics-container">

            <div className="match-statistic-categories-container">

              <p className="statistic-category"></p>

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

              <p className="statistic-category">{`${homeStats.name}`}</p>

              <p className="statistic-category">{homeStats.statistics.first_serve_successful}+{`/`}+{homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults}+{`(`}+{homeStats.statistics.first_serve_successful / (homeStats.statistics.first_serve_successful + homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults) * 100}+{`%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.second_serve_successful}/${homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults} (${homeStats.statistics.second_serve_successful / (homeStats.statistics.second_serve_successful + homeStats.statistics.double_faults) * 100}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.aces}`}</p>

              <p className="statistic-category">{`${homeStats.statistics.double_faults}`}</p>

              <p className="statistic-category">{`${homeStats.statistics.first_serve_points_won}/${homeStats.statistics.first_serve_successful} (${homeStats.statistics.first_serve_points_won / homeStats.statistics.first_serve_successful * 100}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.second_serve_points_won}/${homeStats.statistics.second_serve_successful}`}</p>

              <p className="statistic-category">{`${homeStats.statistics.receiver_points_won}/${(awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful)} (${(homeStats.statistics.receiver_points_won / (awayStats.statistics.first_serve_successful + awayStats.statistics.second_serve_successful) * 100)}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.breakpoints_won}/${homeStats.statistics.total_breakpoints} (${homeStats.statistics.breakpoints_won / homeStats.statistics.total_breakpoints * 100}%)`}</p>

              <p className="statistic-category">{`${homeStats.statistics.points_won}`}</p>

            </div>

            <div className="competitor-statistics-container" id="away">

              <p className="statistic-category">{`${awayStats.name}`}</p>
          
            </div>

          </div>
      
        </div>
      }
    </>
  )
}