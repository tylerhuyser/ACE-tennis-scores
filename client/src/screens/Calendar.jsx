import React from 'react'

import TournamentCard from '../components/TournamentCard'

export default function Calendar(props) {
  
  const { tournaments } = props

  const calendar = tournaments.map((tournament, index) => (

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