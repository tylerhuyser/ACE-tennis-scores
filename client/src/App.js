import React, { useState, useEffect } from 'react'

import MainContainer from './containers/MainContainer'
import Layout from './components/shared/Layout'
import Loader from './components/Loader'

import {
  getTournamentsRapidAPI
} from './utils/tournaments'

import {
  getDailyMatchesRapidAPI,
  getDailyResultsRapidAPI
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
        console.log('gathering tournaments -- UseEffect # 1 + API Call #1 from RapidAPI in App.js')
        const tournamentData = await getTournamentsRapidAPI(currentYear)
        console.log(tournamentData)
        setTournaments(tournamentData.sort((a,b) => (a.start_date > b.start_date) ? 1 : -1 ))
        localStorage.setItem('tournaments', JSON.stringify(tournamentData))
        localStorage.setItem('createdAt', today)
        setTournamentsLoaded(true)
      }
      gatherTournaments(currentYear)

    } else {

      console.log('retrieving Tournaments from Local Storage -- UseEffect #1 in App.js')
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

      console.log('gathering dailySchedule -- UseEffect #2 + API Call #2 from RapidAPI in App.js')

      const gatherDailySchedule = async (currentYear, currentMonth, currentDay) => {

        const dailyScheduleRawData = await getDailyMatchesRapidAPI(currentYear, currentMonth, currentDay)

        console.log(dailyScheduleRawData)

        const dailyScheduleData = []

        dailyScheduleRawData.map((event) => 
        
          dailyScheduleData.push(event.matches)
          
        )

        console.log(dailyScheduleData.flat())

        if (dailyScheduleData.length === 0) {

          setDailySchedule("No Matches Today")

        } else {

          setDailySchedule(dailyScheduleData.flat())
        }
      }
      const timeOut = setTimeout(() => gatherDailySchedule(year, month, day), 1001)
      return () => clearTimeout(timeOut)
    }

  }, [tournaments, tournamentsLoaded])

  useEffect(() => {

    if (dailySchedule && dailySchedule.length !== 0 && dailySchedule !== "No Matches Today") {
      
      console.log('gathering dailyResults -- UseEffect #3 + FILTERING DailySchedule in App.js')

      setDailyResults(dailySchedule.filter(match => match.status === "finished"))

      console.log(dailyResults)

    } else if (dailySchedule && dailySchedule.length !== 0 && dailySchedule === "No Matches Today") {

      setDailyResults("Currently No Results")

    }

  }, [dailySchedule])

  useEffect(() => {

    if (dailySchedule && dailySchedule.length !== 0 && dailySchedule !== "No Matches Today") {

      console.log('gathering liveMatches -- UseEffect #4 + FILTERING DailySchedule in App.js')

      const liveMatchData = dailySchedule.filter(match => match.status === "inprogress")

      if (liveMatchData.length !== 0) {

        setLiveMatches(dailySchedule.filter(match => match.status === "inprogress"))

        console.log(liveMatches)

      } else if (liveMatchData.length === 0) {

        setLiveMatches("Currently No Live Matches")
        
      }

    } else if (dailySchedule && dailySchedule.length !== 0 && dailySchedule === "No Matches Today") {
      
      setLiveMatches("Currently No Live Matches")

    }
    
  }, [dailySchedule])

  useEffect(() => {

    if (dailySchedule.length !== 0 && dailyResults.length !== 0 && liveMatches.length !== 0) {

      console.log('UseEffect #5 + Setting Loaded to True in App.js')

      setLoaded(true)
    }

  }, [liveMatches])

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
