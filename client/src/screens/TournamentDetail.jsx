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
  const [currentSinglesTournamentLoaded, setCurrentSinglesTournamentLoaded] = useState(false)
  const [currentDoublesTournamentLoaded, setCurrentDoublesTournamentLoaded] = useState(false)
  const [currentTournamentScheduleLoaded, setCurrentTournamentScheduleLoaded] = useState(false)
  const [currentTournamentCompletedMatchesLoaded, setCurrentTournamentCompletedMatchesLoaded] = useState(false)
  const [currentTournamentLiveMatchesLoaded, setCurrentTournamentLiveMatchesLoaded] = useState(false)
  const [liveSinglesMatchDetailsLoaded, setLiveSinglesMatchDetailsLoaded] = useState(false)
  
  // Visibility Switches
  const [currentMode, setCurrentMode] = useState(false)
  const [view, setView] = useState("Live Scores")

  // Data
    // Tournament Info
  const [currentSinglesTournament, setCurrentSinglesTournament] = useState([])
  const [currentDoublesTournament, setCurrentDoublesTournament] = useState([])
  
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [tournamentName, setTournamentName] = useState("")
  const [tournamentGender, setTournamentGender] = useState("")
  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")

    // Tournament Schedule
  const [currentTournamentSchedule, setCurrentTournamentSchedule] = useState([])
    // Completed Matches (Results)
  const [completedSinglesMatches, setCompletedSinglesMatches] = useState([])
  const [completedDoublesMatches, setCompletedDoublesMatches] = useState([])
    // Live Matches
  const [liveSinglesMatches, setLiveSinglesMatches] = useState([])
  const [liveDoublesMatches, setLiveDoublesMatches] = useState([])
  
  // Match Details
  const [combinedMatchesDetails, setCombinedMatchesDetails] = useState([])
  const [completedSinglesMatchesDetails, setCompletedSinglesMatchesDetails] = useState([])
  const [completedDoublesMatchesDetails, setCompletedDoublesMatchesDetails] = useState([])
  const [liveSinglesMatchesDetails, setLiveSinglesMatchesDetails] = useState([])
  const [liveDoublesMatchesDetails, setLiveDoublesMatchesDetails] = useState([])

  const params = useParams();
  const history = useHistory()

  const { tournaments, dailySchedule, dailyResults, liveMatches, currentDate, currentYear, currentMonth, currentDay } = props;

// UseEffects
  
  // Sets currentSinglesTournament Object
  useEffect(() => {

    if (tournaments !== undefined && tournaments !== null) {

      console.log(tournaments)
      console.log(params)

      console.log("TournamentDetail.js - UseEffect #1a - finding currentTournamentData using params and tournaments prop")

      const currentTournamentData = tournaments.find((tournament) => parseInt(params.id) === parseInt(tournament.id))
      setCurrentSinglesTournament(currentTournamentData)
      setCurrentSinglesTournamentLoaded(true)

      console.log("TournamentDetail.js - UseEffect #1a - currentSinglesTournament set")
      console.log(currentTournamentData)

    } else {

      console.log("TournamentDetail.js - UseEffect #1b - gathering currentTournamentData from LocalStorage")

      const currentTournamentData = localStorage.getItem('currentSinglesTournament')
      setCurrentSinglesTournament(JSON.parse(currentTournamentData))
      setCurrentSinglesTournamentLoaded(true)

      console.log("TournamentDetail.js - UseEffect #1b - currentSinglesTournament set")

    }
  }, [])

  // Sets Current Tournaments Schedule
  useEffect(() => {

    const currentTournamentScheduleData = localStorage.getItem('currentTournamentSchedule')
    const scheduleDate = localStorage.getItem('scheduleDate')
    const today = new Date().getDate()

    if (singlesTournamentLoaded && (currentTournamentScheduleData === undefined || ((today - scheduleDate === 1) || (today - scheduleDate === (-30)) || (today - scheduleDate === (-29))))) {

      console.log("TournamentDetail.js - UseEffect #2a - GETting from RapidAPI Current Tournament Schedule using Params, due to absence of 'tournaments' props")

      const gatherCurrentTournamentSchedule = async (params, currentYear, currentMonth, currentDay) => {
        const tournamentScheduleData = await getDailyTournamentMatchesAndResults(params.id, currentYear, currentMonth, currentDay)
        localStorage.setItem("currentTournamentSchedule", tournamentScheduleData)
        localStorage.setItem('scheduleDate', today)
        setCurrentTournamentSchedule(tournamentScheduleData)
        setCurrentTournamentScheduleLoaded(true)
      }

      gatherCurrentTournamentSchedule(params, currentYear, currentMonth, currentDay)

      console.log("TournamentDetail.js - UseEffect #2a - Current Tournament Schedule set")

    }
    
    if (singlesTournamentLoaded && currentTournamentScheduleData) {

      console.log("TournamentDetail.js - UseEffect #2b - GETting Current Tournament Schedule from LocalStorage")

      setCurrentTournamentSchedule(tournamentScheduleData)
      setCurrentTournamentScheduleLoaded(true)

      console.log("TournamentDetail.js - UseEffect #2b - GETting Current Tournament Schedule from LocalStorage")

    }
  }, [currentSinglesTournamentLoaded])

    // Filters Completed Matches (Results) from RapidAPI Data
    useEffect(() => {

      if (currentTournamentScheduleLoaded) {
  
          console.log("TournamentDetail.js - UseEffect #3a - filtering completed singles matches from RapidAPI data")
  
          const completedSinglesMatchesData = currentTournamentSchedule.filter((match) => (match.status === "finished"))
          setCompletedSinglesMatches(completedSinglesMatchesData)
          setCurrentTournamentCompletedMatchesLoaded(true)
          console.log(dailyResults)
          console.log(completedSinglesMatchesData)
  
          console.log("TournamentDetail.js - UseEffect #3a - completedSinglesMatches filtered from RapidAPI data set")
  
      }
    }, [currentTournamentScheduleLoaded])
    
    
    // Filters Live Singles Matches from RapidAPI Data
    useEffect(() => {
  
      if (currentTournamentScheduleLoaded) {
  
          console.log("TournamentDetail.js - UseEffect #3b - filtering live singles matches from RapidAPI data")
  
          const liveSinglesMatchesData = currentTournamentSchedule.filter((match) => (match.status === "inprogress"))
          console.log(liveSinglesMatchesData)
        
        if ((liveSinglesMatchesData === undefined) || (liveSinglesMatchesData.length === 0)) {
            console.log(liveSinglesMatchesData)
            setLiveSinglesMatches("Currently No Live Matches")
            setCurrentTournamentLiveMatchesLoaded(true)
        } else if ((liveSinglesMatchesData !== undefined)) {
            console.log(liveSinglesMatchesData)
            setLiveSinglesMatches(liveSinglesMatchesData)
            setCurrentTournamentLiveMatchesLoaded(true)
          }
  
          console.log("TournamentDetail.js - UseEffect #3b - live singles matches filtered from RapidAPI data set")
  
      }
    }, [currentTournamentScheduleLoaded])

  useEffect(() => {
// Add GOALSERVE EQUATION HERE
  }, [currentTournamentScheduleLoaded])

  // Parses Key Tournament Info
  useEffect(() => {
    
    if (currentSinglesTournamentLoaded) {

      console.log("TournamentDetail.js - UseEffect #2 - parsing CurrentSinglesTournamentInfo")

      const currentTournament = currentSinglesTournament

      const parseTournamentName = (currentTournament) => {
        if (currentTournament.name) {
          setTournamentName(currentTournament.name)
        } else if (currentTournament.city) {
          setTournamentName(currentTournament.city)
        }
      }
  
      parseTournamentName(currentTournament)
      
      const parseTournamentIcon = (currentTournament) => {
      
        if (currentTournament.name.includes("doubles")) {
          return
        } else if (currentTournament.code.includes("WTA")) {
          setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
          setTournamentGender("WTA")
        } else if (currentTournament.name.toLowerCase().includes("challenger")) {
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
          setTournamentGender("N/A")
        } else if (currentTournament.code.includes("ATP")) {
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
          setTournamentGender("ATP")
        } else if (currentTournament.name.includes("ITF")) {
          setTournamentCategoryIcon("https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/International_Tennis_Federation_logo.svg/1200px-International_Tennis_Federation_logo.svg.png")
          setTournamentGender("N/A")
        } else {
          setTournamentCategoryIcon("https://www.californiasportssurfaces.com/stage/wp-content/uploads/2019/02/au-open-logo.png")
          setTournamentGender("N/A")
        }
      }
  
      parseTournamentIcon(currentTournament)

      setStartDate(currentSinglesTournament.start_date)
      setEndDate(currentSinglesTournament.end_date)

      console.log("TournamentDetail.js - UseEffect #2 - CurrentSinglesTournamentInfo parsed & set")

    }
  }, [currentSinglesTournamentLoaded])

  // Collects Corresponding Doubles Tournament Data
  useEffect(() => {

    if (tournamentName && tournamentGender) {

      console.log("TournamentDetail.js - UseEffect #3 - gathering CurrentDoublesTournamentInfo")

      console.log(tournaments)
      console.log(tournamentGender)
      console.log(tournamentName)
      const currentDoublesTournamentData = tournaments.find((tournament) => ((tournament.type === "doubles") && (tournament.gender === tournamentGender) && (tournament.parent_id === currentSinglesTournament.parent_id)))
      console.log(currentDoublesTournamentData)
      setCurrentDoublesTournament(currentDoublesTournamentData)
      setCurrentDoublesTournamentLoaded(true)

      console.log("TournamentDetail.js - UseEffect #3 - CurrentDoublesTournamentInfo set")
    }
  }, [tournamentName, tournamentGender])

    // Collects Corresponding Doubles Tournament Data
    useEffect(() => {

      if (tournamentName && tournamentGender) {
  
        console.log("TournamentDetail.js - UseEffect #4 - gathering Combined Match Details from GoalServe")
  
        console.log(tournaments)
        console.log(tournamentGender)
        console.log(tournamentName)
        const currentDoublesTournamentData = tournaments.find((tournament) => ((tournament.type === "doubles") && (tournament.gender === tournamentGender) && (tournament.parent_id === currentSinglesTournament.parent_id)))
        console.log(currentDoublesTournamentData)
        setCurrentDoublesTournament(currentDoublesTournamentData)
        setCurrentDoublesTournamentLoaded(true)
  
        console.log("TournamentDetail.js - UseEffect #4 - Combined Match Details from GoalServe Complete")
      }
    }, [tournamentName, tournamentGender])

  useEffect(() => {

    if (currentTournamentLiveMatchesLoaded && liveSinglesMatches && (liveSinglesMatches.length > 0)) {

      console.log('gathering live matches from GoalServe')

      console.log(liveSinglesMatches)

        const gatherLiveMatchDetailsData = async (currentSinglesTournament) =>  {
          const liveMatchDetailsData = await getLiveMatchesGoalServe()
          console.log(liveMatchDetailsData)
          const liveSinglesMatchesCurrentTournamentData = liveMatchDetailsData.category.filter((tournament) => {
          
            return (
              (tournament["@name"].toLowerCase().includes(currentSinglesTournament.name.toLowerCase()) || tournament["@name"].toLowerCase().includes(currentSinglesTournament.city.toLowerCase())) && tournament["@name"].toLowerCase().includes(currentSinglesTournament.code.toLowerCase()) && tournament["@name"].toLowerCase().includes("singles")
            )
          })
          const liveDoublesMatchesCurrentTournamentData = liveMatchDetailsData.category.filter((tournament) => {
          
            return (
              (tournament["@name"].toLowerCase().includes(currentSinglesTournament.name.toLowerCase()) || tournament["@name"].toLowerCase().includes(currentSinglesTournament.city.toLowerCase())) && tournament["@name"].toLowerCase().includes(currentSinglesTournament.code.toLowerCase()) && tournament["@name"].toLowerCase().includes('doubles')
            )
          })
          console.log(liveSinglesMatchesCurrentTournamentData)
          console.log(liveDoublesMatchesCurrentTournamentData)
          setLiveSinglesMatchDetails(liveSinglesMatchesCurrentTournamentData)
          setLiveDoublesMatchDetails(liveDoublesMatchesCurrentTournamentData)
        }

        gatherLiveMatchDetailsData(currentSinglesTournament)

        console.log('completed gathering live matches from GoalServe')

        setLiveSinglesMatchDetailsLoaded(true)

      } else if (currentTournamentLiveMatchesLoaded && liveSinglesMatches && (liveSinglesMatches === "Currently No Live Matches")) {

        console.log('No Live Matches - NOT GETting Data from GoalServe')

        setLiveSinglesMatchDetailsLoaded(true)
      }   
  }, [setCurrentTournamentLiveMatchesLoaded, liveSinglesMatches])

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
    localStorage.removeItem('currentSinglesTournament')
    history.push('/calendar')
  }
  
  return (

    <>
      
      { liveSinglesMatchDetailsLoaded ?
      
        <div className="tournament-detail-container">

          <div className="back-button-container" onClick={(e) => handleReturnToCalendar(e)} >

            <i className="fas fa-arrow-left" id="match-detail-back-button" ></i>

            <p className="back-button-copy">BACK</p>

          </div>

          <div className="tournament-card-container">

            <p className="tournament-card-name">{tournamentName}</p>

            <div className="tournament-category-container">

              <p className="tournament-date">{`${startDate} - ${endDate}`}</p>

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
        
            <Matches matchesData={currentMode ? liveDoublesMatches : liveSinglesMatches} detailedMatchesData={currentMode ? liveDoublesMatchDetails.match.filter((match) => (match["status"] !== "Finished" || match["status"] !== "Not Started")) : liveSinglesMatchDetails.match.filter((match) => (match["status"] !== "Finished" || match["status"] !== "Not Started"))} view={view} touramentGender={tournamentGender} />

            :
        
            <>
          
              {view === "Completed Matches" ?
        
                <Matches matchesData={currentMode ? completedDoublesMatches : completedSinglesMatches} view={view} touramentGender={tournamentGender} />
              
                :
            
                <>
              
                  {currentTournamentSchedule.length === 0 ?
              
                    <p className="match-container-copy">Tournament schedule currently unavailable.</p>
            
                    :

                    <OrderOfPlay currentTournamentSchedule={currentTournamentSchedule} />
        
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