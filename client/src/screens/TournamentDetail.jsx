import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Switch from "react-switch";

import Matches from '../components/Matches'
import MatchCard from '../components/MatchCard'

import './TournamentDetail.css'

export default function TournamentDetail(props) {

  // Switches
  const [ loaded, setLoaded ] = useState(false)
  const [ currentMode, setCurrentMode ] = useState(false)
  const [ view, setView ] = useState("live scores")

  // Data
  const [currentSinglesTournament, setCurrentSinglesTournament] = useState(null)
  // const []

  const [doublesTournament, setDoublesTournament] = useState(null)

  const [tournamentName, setTournamentName] = useState("")
  const [tournamentCategory, setTournamentCategory] = useState("")
  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")

  const [liveMatchesCurrentTournament, setLiveMatchesCurrentTournament] = useState(null)
  const [liveSinglesMatchesCurrentTournament, setLiveSinglesMatchesCurrentTournament] = useState(null)
  const [liveDoublesMatchesCurrentTournament, setLiveDoublesMatchesCurrentTournament] = useState(null)

  const params = useParams();

  const { tournaments, dailySchedule, dailyResults, liveMatches, currentDate } = props;

// UseEffects
  
  // Sets Current Tournament Object
  useEffect(() => {
    if (tournaments !== undefined && tournaments !== null) {
      const currentTournamentData = tournaments.find((tournament) => params.id === tournament.id)
      setCurrentSinglesTournament(currentTournamentData)
      setLoaded(true)
    } else {
      const currentTournamentData = localStorage.getItem('currentSinglesTournament')
      setCurrentSinglesTournament(JSON.parse(currentTournamentData))
      setLoaded(true)
    }
  }, [])

  // Parses & Sets Key Tournament Info
  useEffect(() => {
    
    if (loaded) {
      const parseTournamentInfo = (currentSinglesTournament) => {

        const splitTournamentName = currentSinglesTournament.name.split(",")
        const isolatedTournamentNameAndTier = splitTournamentName[0].split(" ")
        const isolatedTournamentTier = isolatedTournamentNameAndTier[0]
        const isolatedTournamentName = isolatedTournamentNameAndTier.slice(1)
    
        if (tournamentName.includes("doubles")) {
          return
        } else if (currentSinglesTournament.name.includes("WTA")) {
          setTournamentName(isolatedTournamentName.join(" "))
          setTournamentCategory(isolatedTournamentTier)
          setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
        } else if (currentSinglesTournament.name.includes("ATP")) {
          setTournamentName(isolatedTournamentName.join(" "))
          setTournamentCategory(isolatedTournamentTier)
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
        } else if (currentSinglesTournament.name.includes("ITF")) {
          const isolatedITFTournamentName = isolatedTournamentName.slice(0, -1)
          setTournamentName(isolatedITFTournamentName.join(" "))
          setTournamentCategory(isolatedTournamentTier)
          setTournamentCategoryIcon("https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/International_Tennis_Federation_logo.svg/1200px-International_Tennis_Federation_logo.svg.png")
        } else {
          setTournamentName(isolatedTournamentNameAndTier.slice(0, 2).join(" "))
          setTournamentCategory("Grand Slam")
          setTournamentCategoryIcon("https://www.californiasportssurfaces.com/stage/wp-content/uploads/2019/02/au-open-logo.png")
        }
      }
      parseTournamentInfo(currentSinglesTournament)
    }
  }, [loaded])

  // Collects Corresponding Doubles Tournament Data
  useEffect(() => {

    if (tournamentName) {
      const doublesData = tournaments.find((tournament) => ((tournament.type === "doubles") && (tournament.name.includes(tournamentName))))
      setDoublesTournament(doublesData)

    }
  }, [tournamentName])

  useEffect(() => {
    if (liveMatches !== null) {
      console.log(liveMatches)
      const currentMatches = liveMatches.find((match) => (match.sport_event.tournament.name.includes(tournamentName)))
      setLiveMatchesCurrentTournament(currentMatches)
      const singlesMatches = liveMatches.find((match) => ((match.sport_event.tournament.name.includes(tournamentName)) && (match.sport_event.tournament.type === "singles")))
      setLiveSinglesMatchesCurrentTournament(singlesMatches)
      const doublesMatches = liveMatches.find((match) => ((match.sport_event.tournament.name.includes(tournamentName)) && (match.sport_event.tournament.type === "singles")))
      setLiveDoublesMatchesCurrentTournament(doublesMatches)

      console.log(currentMatches)
      console.log(singlesMatches)
      console.log(doublesMatches)
    }
  }, [liveMatches])



  const handleSwitch = () => {
    setCurrentMode(!currentMode)
  }

  const handleView = () => {
    
  }
  
  return (
    <div className="tournament-detail-container">
      
      <div className="tournament-card-container">

        <p className="tournament-card-name">{tournamentName}</p>

        <div className="tournament-category-container">
          <p className="tournament-category">{tournamentCategory}</p>
          <img className="tournament-category-icon" alt="tournament-category-icon" src={tournamentCategoryIcon} />
        </div>

      </div>

      <Switch onChange={handleSwitch} checked={currentMode ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

      <div className="tournament-views-container">

        <button className="tournament-views-button" id="live-scores-button">Live Matches</button>

        <button className="tournament-views-button" id="results-button">Completed Matches</button>

        <button className="tournament-views-button" id="draws-button">Draws</button>
         
      </div>

      { view === "live scores" ?
      
        <Matches matchData={currentMode? liveDoublesMatchesCurrentTournament : liveSinglesMatchesCurrentTournament } />

      :
      
      <>
        
        { view === "completed matches" ?
      
            <Matches />
            
        :
          
        <div className="draws-container">
              
        </div>
      
        }
      
      </>
    
      }

    </div>
  )
}