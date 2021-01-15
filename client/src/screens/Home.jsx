import React from 'react';

import TournamentCard from '../components/TournamentCard'

import './Home.css'


export default function Home (props) {

  const { tournaments, currentDate } = props

  const currentTournaments = tournaments.filter((tournament) => {
    
    const startDate = new Date(tournament.current_season.start_date)
    const endDate = new Date(tournament.current_season.end_date)
    const tournamentCategory = tournament.name.toLowerCase().slice(0, 3)
  
  
      return (
        
        (((startDate <= currentDate) && (endDate >= currentDate) && ((endDate - currentDate) <= (14*24*60*60*1000))) && ( (tournament.type.toLowerCase() !== "doubles") && (tournamentCategory !== "itf") && ((tournamentCategory.includes("atp") || (tournamentCategory.includes('wta'))))))
        
      )
    }
  ).map((tournament, index) => (

      <TournamentCard 
        tournament={tournament}
        index={index}
        key={tournament.id}
      />

    ))

  return (
    <div className="home-container">

      <p className="home-copy">Current Tournaments</p>

      {currentTournaments}
      
    </div>
  )
}