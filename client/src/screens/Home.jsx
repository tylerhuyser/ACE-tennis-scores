import React from 'react';

import TournamentCard from '../components/TournamentCard'

import './Home.css'


export default function Home(props) {

  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const currentYear = today.getFullYear()
  const currentDate = new Date(currentYear + "-" + currentMonth + "-" + currentDay)

  const { currentTournaments } = props

  const tournaments = currentTournaments.filter((tournament) => {
    
    const startDate = new Date(tournament.current_season.start_date)
    const endDate = new Date(tournament.current_season.end_date)
    const tournamentCategory = tournament.name.toLowerCase().slice(0,3)
  
      return (
        
        (((startDate <= currentDate) && (endDate >= currentDate)) && ( (tournament.type.toLowerCase() !== "doubles") && (tournamentCategory !== "itf")))
        
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

      <p className="home-copy">Upcoming Tournaments</p>

      {tournaments}
      
    </div>
  )
}