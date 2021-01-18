import React from 'react'

import TournamentCard from '../components/TournamentCard'

export default function Calendar(props) {
  
  const { tournaments, currentDate } = props

  const calendar = tournaments.filter((tournament) => {

    const startDate = new Date(tournament.current_season.start_date)
    const endDate = new Date(tournament.current_season.end_date)
    const tournamentCategory = tournament.name.toLowerCase().slice(0, 3)
  
  
    return (
        
      (((endDate >= currentDate)) && ( (tournament.type.toLowerCase() !== "doubles") ))
      
    )

  }).map((tournament, index) => (

    <TournamentCard 
      tournament={tournament}
      index={index}
      key={tournament.id}
    />

  ))

  return (
    <div className="calendar-container">
      
      {calendar}

    </div>
  )
}