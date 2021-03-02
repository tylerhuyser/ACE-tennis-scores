import React from 'react'

import TournamentCard from './TournamentCard'

export default function Tournaments(props) {
  
  const { tournaments, currentDate } = props

  const calendar = tournaments.filter((tournament) => {

    const endDate = new Date(tournament.current_season.end_date)
    
    
      return (
          
        (((endDate >= currentDate)) && ((tournament.type.toLowerCase() !== "doubles")) && ((!tournament.name.toLowerCase().includes("srl"))))
        
      )
  
    }).map((tournament, index) => {
      
      const startDate = tournament.current_season.start_date.split("-").splice(1).join("/")
      const endDate = tournament.current_season.end_date.split("-").splice(1).join("/")
      
      return (
  
        <TournamentCard
          tournament={tournament}
          index={index}
          key={tournament.id}
          startDate={`${startDate}`}
          endDate={`${endDate}`}
        />
  
      )
    })

  return (
    <div className="tournaments-container">

      {calendar}

    </div>

  )
}