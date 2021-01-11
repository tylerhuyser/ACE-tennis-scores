import React, { useState, useEffect } from 'react'

import './TournamentCard.css'

export default function TournamentCard (props) {

  const [ tournamentName, setTournamentName ] = useState("")
  const [ tournamentCategory, setTournamentCategory ] = useState("")
  const [ tournamentCategoryIcon, setTournamentCategoryIcon ] = useState("")
  
  const { tournament, index } = props;

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
      }  else if (tournament.name.includes("ATP")) {
        setTournamentName(isolatedTournamentName.join(" "))
        setTournamentCategory(isolatedTournamentTier)
        setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
      } else if (tournament.name.includes("ITF")) {
        const isolatedITFTournamentName = isolatedTournamentName.slice(0, -1)
        setTournamentName(isolatedITFTournamentName.join(" "))
        setTournamentCategory(isolatedTournamentTier)
        setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
      }
    }
    parseTournamentInfo(tournament)
  }, [])


  return (
    <div className="tournament-card-container">
      <p className="tournament-card-name">{tournamentName}</p>
      <div className="tournament-category-container">
        <p className="tournament-category">{tournamentCategory}</p>
        <img className="tournament-category-icon" src={tournamentCategoryIcon} />
      </div>
    </div>
  )
}