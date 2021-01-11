import React from 'react';

import TournamentCard from '../components/TournamentCard'

import './Home.css'


export default function Home(props) {

  const { currentTournaments } = props

  const tournaments = currentTournaments?.filter((tournament) => (!tournament.name.toLowerCase().includes("itf") || (!tournament.name.toLowerCase().includes("doubles")))).map((tournament, index) => (

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