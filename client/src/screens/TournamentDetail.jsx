import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Switch from "react-switch";

import Loader from '../components/Loader'
import MobileBanner from '../components/adSense/MobileBanner'
import Matches from '../components/Matches'
import OrderOfPlay from '../components/OrderOfPlay'

import {
  getDailyTournamentMatchesAndResults
} from '../utils/matches'

import {
  getLiveMatchesGoalServe
} from '../utils/live'

import './TournamentDetail.css'


export default function TournamentDetail(props) {

  // Data Loaded Switches
  const [currentTournamentLoadedRapidAPI, setCurrentTournamentLoadedRapidAPI] = useState(false)
  const [currentTournamentScheduleLoadedRapidAPI, setCurrentTournamentScheduleLoadedRapidAPI] = useState(false)
  const [completedMatchesLoadedRapidAPI, setCompletedMatchesLoadedRapidAPI] = useState(false)
  const [liveMatchesLoadedRapidAPI, setLiveMatchesLoadedRapidAPI] = useState(false)
  const [matchDetailsLoadedGoalServe, setMatchDetailsLoadedGoalServe] = useState(false)
  const [dataLoadedRapidAPIGoalServe, setDataLoadedRapidAPIGoalServe] = useState(false)
  
  // Visibility Switches
  const [currentMode, setCurrentMode] = useState(false)
  const [view, setView] = useState("Live Scores")

  // Data
    // Tournament Info
  const [currentTournamentRapidAPI, setCurrentTournamentRapidAPI] = useState([])

  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")

    // Tournament Schedule
  const [currentTournamentScheduleRapidAPI, setCurrentTournamentScheduleRapidAPI] = useState([])
    // Completed Matches (Results)
  const [completedSinglesMatchesRapidAPI, setCompletedSinglesMatchesRapidAPI] = useState([])
  const [completedDoublesMatchesRapidAPI, setCompletedDoublesMatchesRapidAPI] = useState([])
    // Live Matches
  const [liveSinglesMatchesRapidAPI, setLiveSinglesMatchesRapidAPI] = useState([])
  const [liveDoublesMatchesRapidAPI, setLiveDoublesMatchesRapidAPI] = useState([])
  
  // Match Details
  const [combinedSinglesMatchDetailsGoalServe, setCombinedSinglesMatchDetailsGoalServe] = useState([])
  const [combinedDoublesMatchDetailsGoalServe, setCombinedDoublesMatchDetailsGoalServe] = useState([])
  const [completedSinglesMatchDetailsGoalServe, setCompletedSinglesMatchDetailsGoalServe] = useState([])
  const [completedDoublesMatchDetailsGoalServe, setCompletedDoublesMatchDetailsGoalServe] = useState([])
  const [liveSinglesMatchDetailsGoalServe, setLiveSinglesMatchDetailsGoalServe] = useState([])
  const [liveDoublesMatchDetailsGoalServe, setLiveDoublesMatchDetailsGoalServe] = useState([])

  const params = useParams();
  const history = useHistory()

  const { tournaments, dailySchedule, dailyResults, liveMatches, currentDate, currentYear, currentMonth, currentDay } = props;

// UseEffects
  
  // Sets currentTournamentRapidAPI Object
  useEffect(() => {

    if (tournaments !== undefined && tournaments !== null) {

      console.log(tournaments)
      console.log(params)

      console.log("TournamentDetail.js - UseEffect #1a - finding currentTournamentData using params and tournaments prop")

      const currentTournamentData = tournaments.find((tournament) => parseInt(params.id) === parseInt(tournament.id))
      setCurrentTournamentRapidAPI(currentTournamentData)
      setCurrentTournamentLoadedRapidAPI(true)

      console.log("TournamentDetail.js - UseEffect #1a - currentTournamentRapidAPI set")
      console.log(currentTournamentData)

    } else {

      console.log("TournamentDetail.js - UseEffect #1b - gathering currentTournamentData from LocalStorage")

      const currentTournamentData = localStorage.getItem('currentTournamentRapidAPI')
      setCurrentTournamentRapidAPI(JSON.parse(currentTournamentData))
      setCurrentTournamentLoadedRapidAPI(true)

      console.log("TournamentDetail.js - UseEffect #1b - currentTournamentRapidAPI set")

    }
  }, [])

  // Sets Current Tournament Schedule
  useEffect(() => {

    if (currentTournamentLoadedRapidAPI) {

      console.log("TournamentDetail.js - UseEffect #2a - GETting from RapidAPI Current Tournament Schedule using Params, due to absence of 'tournaments' props")

      const gatherCurrentTournamentSchedule = async (params, currentYear, currentMonth, currentDay) => {
        const tournamentScheduleData = await getDailyTournamentMatchesAndResults(params.id, currentYear, currentMonth, currentDay)
        console.log(tournamentScheduleData)

        setCurrentTournamentScheduleRapidAPI(tournamentScheduleData)
        setCurrentTournamentScheduleLoadedRapidAPI(true)
      }

      gatherCurrentTournamentSchedule(params, currentYear, currentMonth, currentDay)

      console.log("TournamentDetail.js - UseEffect #2a - Current Tournament Schedule set")

    }
    
  }, [currentTournamentLoadedRapidAPI])

    // Filters Completed Matches (Results) from RapidAPI Data
    useEffect(() => {

      if (currentTournamentScheduleLoadedRapidAPI) {
  
          console.log("TournamentDetail.js - UseEffect #3a - filtering completed singles matches from RapidAPI data")
  
          const completedSinglesMatchesData = currentTournamentScheduleRapidAPI.filter((match) => (match.status === "finished"))
          setCompletedSinglesMatchesRapidAPI(completedSinglesMatchesData)
          setCompletedMatchesLoadedRapidAPI(true)
          console.log(dailyResults)
          console.log(completedSinglesMatchesData)
  
          console.log("TournamentDetail.js - UseEffect #3a - completedSinglesMatches filtered from RapidAPI data set")
  
      }
    }, [currentTournamentScheduleLoadedRapidAPI])
    
    
    // Filters Live Singles Matches from RapidAPI Data
    useEffect(() => {
  
      if (currentTournamentScheduleLoadedRapidAPI) {
  
          console.log("TournamentDetail.js - UseEffect #3b - filtering live singles matches from RapidAPI data")
  
          const liveSinglesMatchesDataRapidAPI = currentTournamentScheduleRapidAPI.filter((match) => (match.status === "inprogress"))
          console.log(liveSinglesMatchesDataRapidAPI)
        
        if ((liveSinglesMatchesDataRapidAPI === undefined) || (liveSinglesMatchesDataRapidAPI.length === 0)) {
            console.log(liveSinglesMatchesDataRapidAPI)
            setLiveSinglesMatchesRapidAPI("Currently No Live Matches")
            setLiveMatchesLoadedRapidAPI(true)
        } else if ((liveSinglesMatchesDataRapidAPI !== undefined)) {
            console.log(liveSinglesMatchesDataRapidAPI)
            setLiveSinglesMatchesRapidAPI(liveSinglesMatchesDataRapidAPI)
            setLiveMatchesLoadedRapidAPI(true)
          }
  
          console.log("TournamentDetail.js - UseEffect #3b - live singles matches filtered from RapidAPI data set")
  
      }
    }, [currentTournamentScheduleLoadedRapidAPI])

  
  // Gathers Live Match Details from GoalServe
  useEffect(() => {

    if (currentTournamentScheduleLoadedRapidAPI && (currentTournamentScheduleRapidAPI.length > 0 && currentTournamentScheduleRapidAPI !== undefined)) {

      const gatherLiveMatchDetailsDataGoalServe = async (currentTournamentRapidAPI) => {
        
        const liveMatchDetailsDataGoalServe = await getLiveMatchesGoalServe()
        console.log(liveMatchDetailsDataGoalServe)

        const combinedSinglesMatchesDataGoalServe = liveMatchDetailsDataGoalServe.category.filter((tournament) => {
          return (
            (tournament["@name"].toLowerCase().includes(currentTournamentRapidAPI.name.toLowerCase()) || tournament["@name"].toLowerCase().includes(currentTournamentRapidAPI.city.toLowerCase())) && tournament["@name"].toLowerCase().includes(currentTournamentRapidAPI.code.toLowerCase()) && tournament["@name"].toLowerCase().includes("singles")
          )
        })
        
        const combinedDoublesMatchesDataGoalServe = liveMatchDetailsDataGoalServe.category.filter((tournament) => {
          return (
            (tournament["@name"].toLowerCase().includes(currentTournamentRapidAPI.name.toLowerCase()) || tournament["@name"].toLowerCase().includes(currentTournamentRapidAPI.city.toLowerCase())) && tournament["@name"].toLowerCase().includes(currentTournamentRapidAPI.code.toLowerCase()) && tournament["@name"].toLowerCase().includes('doubles')
          )
        })

        console.log(combinedSinglesMatchesDataGoalServe)
        console.log(combinedDoublesMatchesDataGoalServe)

        const filterCompletedSinglesMatchesGoalServe = () => {

          if (combinedSinglesMatchesDataGoalServe[0].match.length === undefined) {

            const filteredSinglesMatchesDataGoalServe = []

            if (combinedSinglesMatchesDataGoalServe[0].match["@status"] === "Finished") {

              return filteredSinglesMatchesDataGoalServe.push(combinedSinglesMatchesDataGoalServe[0].match)

            } else {

              return filteredSinglesMatchesDataGoalServe

            }

          } else {

            const filteredSinglesMatchesDataGoalServe = combinedSinglesMatchesDataGoalServe[0].match.filter((match) => {
              return (
                (match["@status"] === "Finished")
              )
            })

            return filteredSinglesMatchesDataGoalServe

          }
        }

        const completedSinglesMatchesDataGoalServe = filterCompletedSinglesMatchesGoalServe()

        console.log(completedSinglesMatchesDataGoalServe)
        console.log(combinedDoublesMatchesDataGoalServe[0].match.length)
        console.log(combinedSinglesMatchesDataGoalServe[0].match["@status"])

        const filterCompletedDoublesMatchesGoalServe = () => {

          if (combinedDoublesMatchesDataGoalServe[0].match.length === undefined) {

            const filteredDoublesMatchesDataGoalServe = []

            if (combinedDoublesMatchesDataGoalServe[0].match["@status"] === "Finished") {

              return filteredDoublesMatchesDataGoalServe.push(combinedDoublesMatchesDataGoalServe[0].match)

            } else {

              return filteredDoublesMatchesDataGoalServe
              
            }

          } else {

            const filteredDoublesMatchesDataGoalServe = combinedDoublesMatchesDataGoalServe[0].match.filter((match) => {
              return (
                (match["@status"] === "Finished")
              )
            })

            return filteredDoublesMatchesDataGoalServe

          }
        }

        const completedDoublesMatchesDataGoalServe = filterCompletedDoublesMatchesGoalServe()

        const filterLiveSinglesMatchesGoalServe = () => {

          if (combinedSinglesMatchesDataGoalServe[0].match.length === undefined) {

            const filteredSinglesMatchesDataGoalServe = []

            if (combinedSinglesMatchesDataGoalServe[0].match["@status"] === "Set 1" || combinedSinglesMatchesDataGoalServe[0].match["@status"] === "Set 2" || combinedSinglesMatchesDataGoalServe[0].match["@status"] === "Set 3" || combinedSinglesMatchesDataGoalServe[0].match["@status"] === "Set 4" || combinedSinglesMatchesDataGoalServe[0].match["@status"] === "Set 5") {

              return filteredSinglesMatchesDataGoalServe.push(combinedSinglesMatchesDataGoalServe[0].match)

            } else {

              return filteredSinglesMatchesDataGoalServe

            }

          } else {

            const filteredSinglesMatchesDataGoalServe = combinedSinglesMatchesDataGoalServe[0].match.filter((match) => {
              return (
                (match["@status"] === "Set 1" || match["@status"] === "Set 2" || match["@status"] === "Set 3" || match["@status"] === "Set 4" || match["@status"] === "Set 5")
              )
            })

            return filteredSinglesMatchesDataGoalServe

          }
        }
        
        const liveSinglesMatchesDataGoalServe = filterLiveSinglesMatchesGoalServe()

        const filterLiveDoublesMatchesGoalServe = () => {

          if (combinedDoublesMatchesDataGoalServe[0].match.length === undefined) {

            const filteredDoublesMatchesDataGoalServe = []

            if (combinedDoublesMatchesDataGoalServe[0].match["@status"] === "Set 1" || combinedDoublesMatchesDataGoalServe[0].match["@status"] === "Set 2" || combinedDoublesMatchesDataGoalServe[0].match["@status"] === "Set 3" || combinedDoublesMatchesDataGoalServe[0].match["@status"] === "Set 4" || combinedDoublesMatchesDataGoalServe[0].match["@status"] === "Set 5") {

              return filteredDoublesMatchesDataGoalServe.push(combinedDoublesMatchesDataGoalServe[0].match)

            } else {

              return filteredDoublesMatchesDataGoalServe
              
            }

          } else {

            const filteredDoublesMatchesDataGoalServe = combinedDoublesMatchesDataGoalServe[0].match.filter((match) => {
              return (
                (match["@status"] === "Set 1" || match["@status"] === "Set 2" || match["@status"] === "Set 3" || match["@status"] === "Set 4" || match["@status"] === "Set 5")
              )
            })

            return filteredDoublesMatchesDataGoalServe

          }
        }

        const liveDoublesMatchesDataGoalServe = filterLiveDoublesMatchesGoalServe()
        
        console.log(completedSinglesMatchesDataGoalServe)
        console.log(completedDoublesMatchesDataGoalServe)
        console.log(liveSinglesMatchesDataGoalServe)
        console.log(liveDoublesMatchesDataGoalServe)

        setCombinedSinglesMatchDetailsGoalServe(combinedSinglesMatchesDataGoalServe)
        setCombinedDoublesMatchDetailsGoalServe(combinedDoublesMatchesDataGoalServe)

        setCompletedSinglesMatchDetailsGoalServe(completedSinglesMatchesDataGoalServe)
        setCompletedDoublesMatchDetailsGoalServe(completedDoublesMatchesDataGoalServe)

        setLiveSinglesMatchDetailsGoalServe(liveSinglesMatchesDataGoalServe)
        setLiveDoublesMatchDetailsGoalServe(liveDoublesMatchesDataGoalServe)
        }
      
      console.log('TournamentDetail.js - UseEffect #4a - gathering live match details data from GoalServe')

      gatherLiveMatchDetailsDataGoalServe(currentTournamentRapidAPI)

      console.log('TournamentDetail.js - UseEffect #4a - completed gathering live match details data from GoalServe')

      setMatchDetailsLoadedGoalServe(true)

    } else if (currentTournamentScheduleLoadedRapidAPI && (currentTournamentScheduleRapidAPI.length === 0 || currentTournamentScheduleRapidAPI === undefined)) {

      console.log('TournamentDetail.js - UseEffect 4b - No Matches Today - Will NOT gather live match details data from GoalServe')

      setMatchDetailsLoadedGoalServe(true)

    }
  }, [currentTournamentScheduleLoadedRapidAPI])

  // Parses Key Tournament Info
  useEffect(() => {
    
    if (currentTournamentLoadedRapidAPI) {

      console.log("TournamentDetail.js - UseEffect #5 - setting Current Tournament Logo")
      
      const parseTournamentIcon = (currentTournamentRapidAPI) => {
      
        if (currentTournamentRapidAPI.name.includes("doubles")) {
          return
        } else if (currentTournamentRapidAPI.code.includes("WTA")) {
          setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
        } else if (currentTournamentRapidAPI.name.toLowerCase().includes("challenger")) {
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
        } else if (currentTournamentRapidAPI.code.includes("ATP")) {
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
        } else if (currentTournamentRapidAPI.name.includes("ITF")) {
          setTournamentCategoryIcon("https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/International_Tennis_Federation_logo.svg/1200px-International_Tennis_Federation_logo.svg.png")
        } else {
          setTournamentCategoryIcon("https://www.californiasportssurfaces.com/stage/wp-content/uploads/2019/02/au-open-logo.png")
        }
      }
  
      parseTournamentIcon(currentTournamentRapidAPI)

      console.log("TournamentDetail.js - UseEffect #5 - Current Tournament Logo set")

    }
  }, [currentTournamentLoadedRapidAPI])

  useEffect(() => {
    if (completedMatchesLoadedRapidAPI && liveMatchesLoadedRapidAPI && matchDetailsLoadedGoalServe) {
      setDataLoadedRapidAPIGoalServe(true)
    }
  })


  // Switch Functions

  const handleSwitch = () => {
    setCurrentMode(!currentMode)
  }

  const handleChangeView = (view) => {
    switch (view) {
      case "Live Scores":
        setView("Live Scores")
        break;
      case "Completed Matches":
        setView("Completed Matches")
        break;
      case "Schedule":
        setView("Schedule")
        break;
    }
  }

  const handleReturnToCalendar = (e) => {
    localStorage.removeItem('currentTournamentRapidAPI')
    localStorage.removeItem('scheduleDate')
    history.push('/calendar')
  }
  
  return (

    <>
      
      { dataLoadedRapidAPIGoalServe ?
      
        <div className="tournament-detail-container">

          <div className="back-button-container" onClick={(e) => handleReturnToCalendar(e)} >

            <i className="fas fa-arrow-left" id="match-detail-back-button" ></i>

            <p className="back-button-copy">BACK</p>

          </div>

          <div className="tournament-card-container">

            <p className="tournament-card-name">{currentTournamentRapidAPI.name}</p>

            <div className="tournament-category-container">

              <p className="tournament-date">{`${currentTournamentRapidAPI.start_date} - ${currentTournamentRapidAPI.end_date}`}</p>

              <img className="tournament-category-icon" alt="tournament-category-icon" src={tournamentCategoryIcon} />
          
            </div>

          </div>



          <div className="discipline-switch-container">

            <p className="discipline-switch-container-copy">SINGLES</p>

            <Switch onChange={handleSwitch} checked={currentMode ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

            <p className="discipline-switch-container-copy">DOUBLES</p>

          </div>


          
          <div className="tournament-views-container">

            <button className="tournament-views-button" id="live-scores-button" onClick={(e) => handleChangeView("Live Scores")} > Live Matches</button>

            <button className="tournament-views-button" id="completed-matches-button" onClick={(e) => handleChangeView("Completed Matches")}> Completed Matches</button>

            <button className="tournament-views-button" id="schedule-button" onClick={(e) => handleChangeView("Schedule")} > Schedule</button>
          
          </div>

          <MobileBanner />

          {view === "Live Scores" ?
        
            <Matches matchesData={currentMode ? liveDoublesMatchDetailsGoalServe : liveSinglesMatchDetailsGoalServe} supportingMatchesData={currentTournamentScheduleRapidAPI} view={view} discipline={currentMode ? "DOUBLES" : "SINGLES"} tournamentGender={currentTournamentRapidAPI.code === "ATP" ? "MEN'S" : "WOMEN'S"} />

            :
        
            <>
          
              {view === "Completed Matches" ?
        
                <Matches matchesData={currentMode ? completedDoublesMatchDetailsGoalServe : completedSinglesMatchDetailsGoalServe} supportingMatchesData={currentTournamentScheduleRapidAPI} view={view} discipline={currentMode ? "DOUBLES" : "SINGLES"} tournamentGender={currentTournamentRapidAPI.code === "ATP" ? "MEN'S" : "WOMEN'S"} />
              
                :
            
                <>
              
                  {currentTournamentScheduleRapidAPI.length === 0 ?
              
                    <p className="match-container-copy">Tournament schedule currently unavailable.</p>
            
                    :

                    <OrderOfPlay currentTournamentSchedule={currentTournamentScheduleRapidAPI} />
        
                  }

                </>
              
              }
        
            </>
      
          }

        </div>
        
      :
        
        <Loader />
      
      }
      
    </>
  )
}