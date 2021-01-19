import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './TournamentCard.css'

export default function TournamentCard(props) {

  const [tournamentName, setTournamentName] = useState("")
  const [tournamentCategory, setTournamentCategory] = useState("")
  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")
  const history = useHistory()
  
  const { tournament, startDate, endDate } = props;

  useEffect(() => {
    
    const parseTournamentInfo = (tournament) => {

      const splitTournamentName = tournament.name.split(",")
      const isolatedTournamentNameAndTier = splitTournamentName[0].split(" ")
      const isolatedTournamentTier = isolatedTournamentNameAndTier[0]
      const isolatedTournamentName = isolatedTournamentNameAndTier.slice(1)
    
      if (tournamentName.includes("doubles")) {
        return
      } else if (tournament.name.includes("WTA")) {
        setTournamentName(isolatedTournamentName.join(" "))
        setTournamentCategory(isolatedTournamentTier)
        setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
      } else if (tournament.name.includes("ATP")) {
        setTournamentName(isolatedTournamentName.join(" "))
        setTournamentCategory(isolatedTournamentTier)
        setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
      } else if (tournament.name.includes("ITF")) {
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
    parseTournamentInfo(tournament)
  }, [])

  const handleTournament = (tournament, tournamentid) => {
    localStorage.setItem('currentSinglesTournament', JSON.stringify(tournament))
    history.push(`/tournament/${tournamentid}`)
  }


  return (
    <div className="tournament-card-container" onClick={(e) => handleTournament(tournament, tournament.id)} >

      <p className="tournament-card-name">{tournamentName}</p>

      <div className="tournament-category-container">
        <p className="tournament-date">{`${startDate} - ${endDate}`}</p>
        <img className="tournament-category-icon" alt="tournament-category-icon" src={tournamentCategoryIcon} />
      </div>

    </div>
  )
}