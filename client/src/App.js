import React, { useState, useEffect } from 'react'

import MainContainer from './containers/MainContainer'
import Layout from './components/shared/Layout'
import Loader from './components/Loader'

import {
  getCurrentTournaments
} from './utils/tournaments'

import {
  getTournamentsRapidAPI
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
  const [tournaments, setTournaments] = useState([])
  const [ dailySchedule, setDailySchedule ] = useState([])
  const [ dailyResults, setDailyResults ] = useState([])
  const [ liveMatches, setLiveMatches ] = useState([])
 
// Switches
  const [ tournamentsLoaded, setTournamentsLoaded ] = useState(false)
  const [ loaded, setLoaded ] = useState(false)

// Date
  const today = new Date()
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
  const currentDay = String(today.getDate()).padStart(2, '0')
  const currentYear = today.getFullYear()
  const currentDate = new Date(currentYear + "-" + currentMonth + "-" + currentDay)
  
  useEffect(() => {

    const totalTournaments = tournaments.length
    const oneDay = 60 * 60 * 24 * 1000

    const tournamentData = localStorage.getItem('tournaments')
    const createdAt = localStorage.getItem('createdAt')

    if (totalTournaments === 0 || tournamentData === undefined || tournamentData === null || createdAt === undefined || ((today - createdAt) > (oneDay))) {

      const gatherTournaments = async (currentYear) => {
        console.log('apirequest 1')
        const tournamentData = await getTournamentsRapidAPI(currentYear)
        console.log(tournamentData)
        setTournaments(tournamentData)
        console.log(tournamentData)
        localStorage.setItem('tournaments', JSON.stringify(tournamentData))
        localStorage.setItem('createdAt', today)
        setTournamentsLoaded(true)
      }
      gatherTournaments(currentYear)

    } else {

      console.log(JSON.parse(tournamentData))
      setTournaments(JSON.parse(tournamentData))
      setTournamentsLoaded(true)

    }

  }, [])

  useEffect(() => {

    const day = currentDay
    const month = currentMonth
    const year = currentYear

    console.log(tournamentsLoaded)

    if (tournamentsLoaded) {
      console.log('apirequest 2')
      const gatherDailySchedule = async (currentYear, currentMonth, currentDay) => {
        const dailyScheduleData = await getDailySchedule(currentYear, currentMonth, currentDay)
        console.log(dailyScheduleData.sport_events)
        if (dailyScheduleData.length === 0) {
          setDailySchedule(dailyScheduleData)
        } else {
          setDailySchedule(dailyScheduleData.sport_events)
        }
      }
      const timeOut = setTimeout(() => gatherDailySchedule(year, month, day), 1001)
      return () => clearTimeout(timeOut)
    }

  }, [tournaments, tournamentsLoaded])

  useEffect(() => {

    const day = currentDay
    const month = currentMonth
    const year = currentYear

    if (dailySchedule && dailySchedule.length !== 0) {
      console.log('apirequest 3')
      const gatherDailyResults = async (currentYear, currentMonth, currentDay) => {
        const dailyResultsData = await getDailyResults(currentYear, currentMonth, currentDay)
        console.log(dailyResultsData)
        console.log(dailyResultsData.results)
        setDailyResults(dailyResultsData.results)
      }

      const timeOut = setTimeout(() => gatherDailyResults(year, month, day), 2002)
      return () => clearTimeout(timeOut)
    }

  }, [dailySchedule])

  useEffect(() => {

    if (dailySchedule && dailySchedule.length !== 0) {
      console.log('apirequest 4')
      const gatherLiveMatches = async () => {
        const liveMatchesData = await getLiveMatches()
        console.log(liveMatchesData.summaries)
        if (liveMatchesData.summaries.length === 0) {
          setLoaded(true)
        } else {
          setLiveMatches(liveMatchesData.summaries)
          setLoaded(true)
        }
      }
      const timeOut = setTimeout(() => gatherLiveMatches(), 3003)
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
