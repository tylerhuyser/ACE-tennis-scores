import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Switch from "react-switch";

import Loader from '../components/Loader'
import MobileBanner from '../components/adSense/MobileBanner'
import Matches from '../components/Matches'
import OrderOfPlay from '../components/OrderOfPlay'

import './TournamentDetail.css'

export default function TournamentDetail(props) {

  // Data Loaded Switches
  const [currentSinglesTournamentLoaded, setCurrentSinglesTournamentLoaded] = useState(false)
  const [currentDoublesTournamentLoaded, setCurrentDoublesTournamentLoaded] = useState(false)
  const [currentTournamentScheduleLoaded, setCurrentTournamentScheduleLoaded] = useState(false)
  const [currentTournamentCompletedMatchesLoaded, setCurrentTournamentCompletedMatchesLoaded] = useState(false)
  const [currentTournamentLiveMatchesLoaded, setCurrentTournamentLiveMatchesLoaded] = useState(false)
  
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
  const [ completedDoublesMatches, setCompletedDoublesMatches] = useState([])
    // Live Matches
  const [liveSinglesMatches, setLiveSinglesMatches] = useState([])
  const [liveDoublesMatches, setLiveDoublesMatches] = useState([])

  const params = useParams();
  const history = useHistory()

  const { tournaments, dailySchedule, dailyResults, liveMatches } = props;

// UseEffects
  
  // Sets currentSinglesTournament Object
  useEffect(() => {

    if (tournaments !== undefined && tournaments !== null) {

      console.log(tournaments)
      console.log(params)

      console.log("TournamentDetail.js - UseEffect #1 - finding currentTournamentData using params")

      const currentTournamentData = tournaments.find((tournament) => parseInt(params.id) === parseInt(tournament.id))
      setCurrentSinglesTournament(currentTournamentData)
      setCurrentSinglesTournamentLoaded(true)

      console.log("TournamentDetail.js - UseEffect #1 - currentSinglesTournament set")
      console.log(currentTournamentData)

    } else {

      console.log("TournamentDetail.js - UseEffect #1 - gathering currentTournamentData from LocalStorage")

      const currentTournamentData = localStorage.getItem('currentSinglesTournament')
      setCurrentSinglesTournament(JSON.parse(currentTournamentData))
      setCurrentSinglesTournamentLoaded(true)

      console.log("TournamentDetail.js - UseEffect #1 - currentSinglesTournament set")

    }
  }, [])

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


  // Collects Tournament Schedule
  useEffect(() => {
    if (currentDoublesTournamentLoaded) {
      
      console.log(currentDoublesTournament)

      if (dailySchedule.length > 0 && currentDoublesTournament) {
        console.log(currentSinglesTournament.id)
        console.log(currentDoublesTournament.id)
        const currentTournamentScheduleData = dailySchedule.filter((match) => ((match.tournament.id === currentSinglesTournament.id) || (match.tournament.id === currentDoublesTournament.id)))
        if (currentTournamentScheduleData === undefined) {
          setCurrentTournamentScheduleLoaded(true)
          console.log('schedule completed')
        } else {
          setCurrentTournamentSchedule(currentTournamentScheduleData)
          setCurrentTournamentScheduleLoaded(true)
          console.log('schedule completed')
        }
      } else if (dailySchedule.length > 0 && !currentDoublesTournament) {
        const currentTournamentScheduleData = dailySchedule.filter((match) => ((match.tournament.id === currentSinglesTournament.id)))
        if (currentTournamentScheduleData === undefined) {
          setCurrentTournamentScheduleLoaded(true)
          console.log('schedule completed')
        } else {
          setCurrentTournamentSchedule(currentTournamentScheduleData)
          setCurrentTournamentScheduleLoaded(true)
          console.log('schedule completed')
        }
      }

    }
  }, [currentDoublesTournamentLoaded])

  // Collect Completed Matches (Results)
  useEffect(() => {

    if (currentTournamentScheduleLoaded) {

      if (dailySchedule.length > 0 && currentDoublesTournament) {

        const completedSinglesMatchesData = dailyResults.filter((match) => ((match.sport_event_status.status === "closed") && (match.sport_event.tournament.id === currentSinglesTournament.id)))
        setCompletedSinglesMatches(completedSinglesMatchesData)
        const completedDoublesMatchesData = dailyResults.filter((match) => ((match.sport_event_status.status === "closed") && (match.sport_event.tournament.id === currentDoublesTournament.id)))
        setCompletedDoublesMatches(completedDoublesMatchesData)
        setCurrentTournamentCompletedMatchesLoaded(true)
        console.log(dailyResults)
        console.log(completedSinglesMatchesData)
        console.log('completed matches pulled')

      } else if (dailySchedule.length > 0 && !currentDoublesTournament) {

        const completedSinglesMatchesData = dailyResults.filter((match) => ((match.sport_event_status.status === "closed") && (match.sport_event.tournament.id === currentSinglesTournament.id)))
        setCompletedSinglesMatches(completedSinglesMatchesData)
        setCurrentTournamentCompletedMatchesLoaded(true)
        console.log(dailyResults)
        console.log(completedSinglesMatchesData)
        console.log('completed matches pulled')

      }
    }
  }, [currentTournamentScheduleLoaded])
  
  
  // Collects Live Singles & Doubles Matches
  useEffect(() => {

    if (currentTournamentCompletedMatchesLoaded) {

      if (dailySchedule.length > 0 && currentDoublesTournament) {

        const liveSinglesMatchesData = liveMatches.filter((match) => ((match.sport_event.tournament.id === currentSinglesTournament.id)))
        const liveDoublesMatchesData = liveMatches.filter((match) => ((match.sport_event.tournament.id === currentDoublesTournament.id)))
        
        if ((liveSinglesMatchesData === undefined) && (liveDoublesMatchesData === undefined)) {
          setCurrentTournamentLiveMatchesLoaded(true)
          return
        } else if ((liveSinglesMatchesData === undefined) && (liveDoublesMatchesData !== undefined)) {
          setLiveDoublesMatches(liveDoublesMatchesData)
          setCurrentTournamentLiveMatchesLoaded(true)
        } else if ((liveSinglesMatchesData !== undefined) && (liveDoublesMatchesData === undefined)) {
          setLiveSinglesMatches(liveSinglesMatchesData)
          setCurrentTournamentLiveMatchesLoaded(true)
        } else if ((liveSinglesMatchesData) && (liveDoublesMatchesData)) {
          setLiveSinglesMatches(liveSinglesMatchesData)
          setLiveDoublesMatches(liveDoublesMatchesData)
          setCurrentTournamentLiveMatchesLoaded(true)
        }
        console.log('live matches completed')
        console.log(liveMatches)
        console.log(currentSinglesTournament.id)
        console.log(liveSinglesMatchesData)

      } else if (dailySchedule.length > 0 && !currentDoublesTournament) {

        const liveSinglesMatchesData = liveMatches.filter((match) => ((match.sport_event.tournament.id === currentSinglesTournament.id)))
  
        if ((liveSinglesMatchesData === undefined)) {
          setCurrentTournamentLiveMatchesLoaded(true)
          return
        } else if ((liveSinglesMatchesData !== undefined)) {
          setLiveSinglesMatches(liveSinglesMatchesData)
          setCurrentTournamentLiveMatchesLoaded(true)
        }
        console.log('live matches completed')
        console.log(liveMatches)
        console.log(currentSinglesTournament.id)
        console.log(liveSinglesMatchesData)

      }
    }
  }, [currentTournamentCompletedMatchesLoaded])

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
      
      { currentTournamentLiveMatchesLoaded ?
      
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
        
            <Matches matchesData={currentMode ? liveDoublesMatches : liveSinglesMatches} view={view} />

            :
        
            <>
          
              {view === "Completed Matches" ?
        
                <Matches matchesData={currentMode ? completedDoublesMatches : completedSinglesMatches} view={view} />
              
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