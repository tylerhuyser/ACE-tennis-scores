import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Switch from "react-switch";

import MatchCard from '../components/MatchCard'

import './TournamentDetail.css'

export default function TournamentDetail(props) {

  // Switches
  const [loaded, setLoaded] = useState(false)
  const [currentDiscipline, setCurrentDiscipline] = useState(false)

  // Data
  const [currentTournament, setCurrentTournament] = useState(null)
  const [doublesTournament, setDoublesTournament] = useState(null)
  const [tournamentName, setTournamentName] = useState("")
  const [tournamentCategory, setTournamentCategory] = useState("")
  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")

  const params = useParams();
  const { currentTournaments } = props;
  
  const tournament = currentTournaments.find((tournament) => params.id === tournament.id)

  console.log(tournament)

  useEffect(() => {
    setLoaded(true)
    if (currentTournaments === undefined) {
      console.log("undefined")
      setCurrentTournament(tournament)
    } else {
      console.log('storage')
      const tournamentData = localStorage.getItem('currentTournament')
      console.log(tournamentData)
      setCurrentTournament(JSON.parse(tournamentData))
    }
  }, [])

  useEffect(() => {
    
    if (loaded) {
      const parseTournamentInfo = (currentTournament) => {

        const splitTournamentName = currentTournament.name.split(",")
        const isolatedTournamentNameAndTier = splitTournamentName[0].split(" ")
        const isolatedTournamentTier = isolatedTournamentNameAndTier[0]
        const isolatedTournamentName = isolatedTournamentNameAndTier.slice(1)
    
        if (tournamentName.includes("doubles")) {
          return
        } else if (currentTournament.name.includes("WTA")) {
          setTournamentName(isolatedTournamentName.join(" "))
          setTournamentCategory(isolatedTournamentTier)
          setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
        } else if (currentTournament.name.includes("ATP")) {
          setTournamentName(isolatedTournamentName.join(" "))
          setTournamentCategory(isolatedTournamentTier)
          setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
        } else if (currentTournament.name.includes("ITF")) {
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
      parseTournamentInfo(currentTournament)
    }
  }, [loaded])

  useEffect(() => {

    if (tournamentName) {
      const doublesData = currentTournaments.find((tournament) => ((tournament.type === "doubles") && (tournament.name.includes(tournamentName))))
      console.log(doublesData)
      setDoublesTournament(doublesData)
      localStorage.setItem('currentDoublesTournament', JSON.stringify(doublesData))
    }
  }, [tournamentName])

  const handleSwitch = () => {
    setCurrentDiscipline(!currentDiscipline)
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

      <Switch onChange={handleSwitch} checked={currentDiscipline ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

      <div className="tournament-views-container">

        <button className="tournament-views-button" id="live-scores-button">Live Matches</button>

        <button className="tournament-views-button" id="results-button">Completed Matches</button>

        <button className="tournament-views-button" id="draws-button">Draws</button>
         
      </div>

    </div>
  )
}