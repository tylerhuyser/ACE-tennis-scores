import React, { useState, useEffect } from 'react'

import MainContainer from './containers/MainContainer'
import Layout from './components/shared/Layout'

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
  const [ liveMatches, setLiveMatches ] = useState([])
  const [ dailySchedule, setDailySchedule ] = useState([])
  const [ dailyResults, setDailyResults ] = useState([])

  const [searchQuery, setSearchQuery] = useState("")
  
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

    const gatherLiveMatches = async () => {
      const liveMatchesData = await getLiveMatches()
      console.log(liveMatchesData.summaries)
      setLiveMatches(liveMatchesData.summaries)
    }
    gatherLiveMatches()

    const gatherDailySchedule = async (currentYear, currentMonth, currentDay) => {
      const dailyScheduleData = await getDailySchedule(currentYear, currentMonth, currentDay)
      console.log(dailyScheduleData.sport_events)
      setDailySchedule(dailyScheduleData.sport_events)
    }

    gatherDailySchedule(currentYear, currentMonth, currentDay)

    const gatherDailyResults = async (currentYear, currentMonth, currentDay) => {
      const dailyResultsData = await getDailyResults(currentYear, currentMonth, currentDay)
      console.log(dailyResultsData.results)
      setDailyResults(dailyResultsData.results)
    }

    gatherDailyResults(currentYear, currentMonth, currentDay)

  }, [])

  return (
    <div className="app-container">

      { tournaments ?

        <Layout>
          <MainContainer tournaments={tournaments} dailySchedule={dailySchedule} dailyResults={dailyResults} liveMatches={liveMatches} currentDate={currentDate} />
        </Layout>
        
        :
      
        <>
        </>

      }

    </div>
  );
}

export default App;
