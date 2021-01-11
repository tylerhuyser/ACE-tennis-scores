import React from 'react';

import TournamentCard from '../components/TournamentCard'


export default function Home(props) {

  const { currentTournaments } = props

  const tournaments = currentTournaments && currentTournaments?.map((tournament, index) => (
    <TournamentCard 
      tournament={tournament}
      index={index}
      key={tournament.id}
    />
  ))
  
  return (
    <div className="home-container">

      {tournaments}
      
    </div>
  )
}