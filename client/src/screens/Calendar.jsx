import React from 'react'

import TournamentCard from '../components/TournamentCard'

import './Calendar.css'

export default function Calendar(props) {
  
  const { tournaments, currentDate } = props

  const calendar = tournaments.filter((tournament) => {

    const startDate = new Date(tournament.current_season.start_date)
    const endDate = new Date(tournament.current_season.end_date)
    const tournamentCategory = tournament.name.toLowerCase().slice(0, 3)
  
  
    return (
        
      (((endDate >= currentDate)) && ((tournament.type.toLowerCase() !== "doubles")) && ((!tournament.name.toLowerCase().includes("srl"))))
      
    )

  }).map((tournament, index) => {
    
    // const startDate = new Date(tournament.current_season.start_date)
    // const startDay = startDate.getDay() + 1
    // const startMonth = (startDate.getMonth() + 1)
    const startDate = tournament.current_season.start_date.split("-").splice(1).join("/")
   
    // const endDate = new Date(tournament.current_season.end_date)
    // const endDay = endDate.getDay() + 1
    // const endMonth = endDate.getMonth() + 1

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
    <div className="calendar-container">
      
      {calendar}

    </div>
  )
}