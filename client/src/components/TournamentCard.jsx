import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './TournamentCard.css'

export default function TournamentCard(props) {

  const [tournamentName, setTournamentName] = useState("")
  const [tournamentCategoryIcon, setTournamentCategoryIcon] = useState("")
  const history = useHistory()
  
  const { tournament, startDate, endDate } = props;

  useEffect(() => {

    const currentTournament = tournament
    setTournamentName(currentTournament.name)
    
    const parseTournamentInfo = (tournament) => {
    
      if (currentTournament.name.includes("doubles")) {
        return
      } else if (currentTournament.code.includes("WTA")) {
        setTournamentCategoryIcon("https://images.firstpost.com/wp-content/uploads/2020/12/wta-logo-640.png?impolicy=website&width=1200&height=800")
      } else if (currentTournament.name.toLowerCase().includes("challenger")) {
        setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
      } else if (currentTournament.code.includes("ATP")) {
        setTournamentCategoryIcon("https://logodix.com/logo/1903236.png")
      } else if (currentTournament.name.includes("ITF")) {
        setTournamentCategoryIcon("https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/International_Tennis_Federation_logo.svg/1200px-International_Tennis_Federation_logo.svg.png")
      } else {
        setTournamentCategoryIcon("https://www.californiasportssurfaces.com/stage/wp-content/uploads/2019/02/au-open-logo.png")
      }
    }
    parseTournamentInfo(currentTournament)

  }, [])

  const handleTournament = (tournament, tournamentID) => {
    localStorage.setItem('currentSinglesTournament', JSON.stringify(tournament))
    history.push(`/tournament/${tournamentID}`)
  }


  return (
    <div className="tournament-card-container" onClick={(e) => handleTournament(tournament, tournament.id)} >

      <p className="tournament-card-name">{tournamentName}</p>

      <div className="tournament-category-container">

        {startDate === "" ?
          <div className="tournament-date"></div>
        : 
          <p className="tournament-date">{`${startDate} - ${endDate}`}</p>
        }
        <img className="tournament-category-icon" alt="tournament-category-icon" src={tournamentCategoryIcon} />
      </div>

    </div>
  )
}