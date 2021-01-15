import React, { useState, useEffect } from 'react'

import MainContainer from './containers/MainContainer'
import Layout from './components/shared/Layout'
import Loader from './components/Loader'

import {
  getCurrentTournaments
} from './utils/tournaments'

import {
  getLiveMatches
} from './utils/live'

import {
  getDailySchedule,
  getDailyResults
} from './utils/matches'

function App () {

// API Data
  const [ tournaments, setTournaments ] = useState([])
  const [ dailySchedule, setDailySchedule ] = useState([])
  const [ dailyResults, setDailyResults ] = useState([])
  const [ liveMatches, setLiveMatches ] = useState([])

  const [ searchQuery, setSearchQuery ] = useState("")
 
// Switches
  const [ loaded, setLoaded ] = useState(false)

// Date
  const today = new Date()
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
  const currentDay = String(today.getDate()).padStart(2, '0')
  const currentYear = today.getFullYear()
  const currentDate = new Date(currentYear + "-" + currentMonth + "-" + currentDay)
  
  useEffect(() => {

    const gatherActiveTournaments = async () => {
      const tournamentData = await getCurrentTournaments()
      setTournaments(tournamentData.tournaments)
      console.log(tournamentData.tournaments)
      localStorage.setItem('tournaments', tournamentData)
    }
    gatherActiveTournaments()

  }, [])

  useEffect(() => {

    if (tournaments && tournaments.length !== 0) {
      const gatherDailySchedule = async (currentYear, currentMonth, currentDay) => {
        const dailyScheduleData = await getDailySchedule(currentYear, currentMonth, currentDay)
        console.log(dailyScheduleData.sport_events)
        if (dailyScheduleData.length === 0) {
          setDailySchedule(dailyScheduleData.sport_events)
          setLoaded(true)
        } else {
          setDailySchedule(dailyScheduleData.sport_events)
        }
      }
      gatherDailySchedule(currentYear, currentMonth, currentDay)
    }

  }, [tournaments])

  useEffect(() => {

    if (dailySchedule && dailySchedule.length !== 0) {
      const gatherDailyResults = async (currentYear, currentMonth, currentDay) => {
        const dailyResultsData = await getDailyResults(currentYear, currentMonth, currentDay)
        console.log(dailyResultsData.results)
        setDailyResults(dailyResultsData.results)
      }

      gatherDailyResults(currentYear, currentMonth, currentDay)
    }

  }, [dailySchedule])

  useEffect(() => {

    if (dailySchedule && dailySchedule.length !== 0) {
      const gatherLiveMatches = async () => {
        const liveMatchesData = await getLiveMatches()
        console.log(liveMatchesData.summaries)
        setLiveMatches(liveMatchesData.summaries)
        setLoaded(true)
      }
      const timeOut = setTimeout(() => gatherLiveMatches(), 1001)
      return () => clearTimeout(timeOut)
    }
    
  }, [dailySchedule])

  return (
    <div className="app-container">

      { loaded ?

        <Layout>
          <MainContainer tournaments={tournaments} dailySchedule={dailySchedule} dailyResults={dailyResults} liveMatches={liveMatches} currentDate={currentDate} />
        </Layout>
        
        :
      
        <Loader />

      }

    </div>
  );
}

export default App;
