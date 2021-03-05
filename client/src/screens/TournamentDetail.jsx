import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Switch from "react-switch";

import Loader from '../components/Loader'
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
  const [ currentMode, setCurrentMode ] = useState(false)
  const [ view, setView ] = useState("Live Scores")

  // Data
    // Tournament Info
  const [ currentSinglesTournament, setCurrentSinglesTournament ] = useState([])
  const [currentDoublesTournament, setCurrentDoublesTournament] = useState([])
  
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [tournamentName, setTournamentName] = useState("")
  const [tournamentGender, setTournamentGender] = useState("")
  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")

    // Tournament Schedule
  const [ currentTournamentSchedule, setCurrentTournamentSchedule ] = useState([])
    // Completed Matches (Results)
  const [ completedSinglesMatches, setCompletedSinglesMatches ] = useState([])
  const [ completedDoublesMatches, setCompletedDoublesMatches ] = useState([])
    // Live Matches
  const [ liveSinglesMatches, setLiveSinglesMatches ] = useState([])
  const [ liveDoublesMatches, setLiveDoublesMatches ] = useState([])

  const params = useParams();
  const history = useHistory()

  const { tournaments, dailySchedule, dailyResults, liveMatches } = props;

// UseEffects
  
  // Sets currentSinglesTournament Object
  useEffect(() => {
    if (tournaments !== undefined && tournaments !== null) {
      const currentTournamentData = tournaments.find((tournament) => params.id === tournament.id)
      setCurrentSinglesTournament(currentTournamentData)
      setCurrentSinglesTournamentLoaded(true)
    } else {
      const currentTournamentData = localStorage.getItem('currentSinglesTournament')
      setCurrentSinglesTournament(JSON.parse(currentTournamentData))
      setCurrentSinglesTournamentLoaded(true)
    }
  }, [])

  // Parses Key Tournament Info
  useEffect(() => {
    
    if (currentSinglesTournamentLoaded) {

      const parseTournamentInfo = (currentSinglesTournament) => {

        const splitTournamentName = currentSinglesTournament.name.split(",")
        const isolatedTournamentNameAndTier = splitTournamentName[0].split(" ")
        const isolatedTournamentName = isolatedTournamentNameAndTier.slice(1)
    
        if (tournamentName.includes("doubles")) {
          return
        } else if (currentSinglesTournament.name.includes("WTA")) {
          setTournamentName(isolatedTournamentName.join(" "))
          setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
        } else if (currentSinglesTournament.name.toLowerCase().includes("challenger")) {
          console.log(isolatedTournamentName)
          const isolatedChallengerTournamentName = isolatedTournamentName.join(" ").slice(11)
          console.log(isolatedChallengerTournamentName)
          setTournamentName(isolatedChallengerTournamentName)
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
        } else if (currentSinglesTournament.name.includes("ATP")) {
          setTournamentName(isolatedTournamentName.join(" "))
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
        } else if (currentSinglesTournament.name.includes("ITF")) {
          const isolatedITFTournamentName = isolatedTournamentName.slice(0, -1)
          setTournamentName(isolatedITFTournamentName.join(" "))
          setTournamentCategoryIcon("https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/International_Tennis_Federation_logo.svg/1200px-International_Tennis_Federation_logo.svg.png")
        } else {
          setTournamentName(isolatedTournamentNameAndTier.slice(0, 2).join(" "))
          setTournamentCategoryIcon("https://www.californiasportssurfaces.com/stage/wp-content/uploads/2019/02/au-open-logo.png")
        }
      }
      parseTournamentInfo(currentSinglesTournament)
      setStartDate(currentSinglesTournament.current_season.start_date.split("-").splice(1).join("/"))
      setEndDate(currentSinglesTournament.current_season.end_date.split("-").splice(1).join("/"))
      setTournamentGender(currentSinglesTournament.gender)
    }
  }, [currentSinglesTournamentLoaded])

  // Collects Corresponding Doubles Tournament Data
  useEffect(() => {

    if (tournamentName && tournamentGender) {
      console.log(tournaments)
      console.log(tournamentGender)
      console.log(tournamentName)
      const currentDoublesTournamentData = tournaments.find((tournament) => ((tournament.type === "doubles") && (tournament.gender === tournamentGender) && (tournament.parent_id === currentSinglesTournament.parent_id)))
      console.log(currentDoublesTournamentData)
      setCurrentDoublesTournament(currentDoublesTournamentData)
      setCurrentDoublesTournamentLoaded(true)
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

          <div className="back-button-container">

            <i className="fas fa-arrow-left" id="match-detail-back-button" onClick={(e) => handleReturnToCalendar(e)} ></i>

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