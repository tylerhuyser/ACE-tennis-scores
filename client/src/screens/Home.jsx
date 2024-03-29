import React from 'react';

import TournamentCard from '../components/TournamentCard'
import MobileBanner from '../components/adSense/MobileBanner.jsx'

import './Home.css'


export default function Home (props) {

  const { tournaments, currentDate } = props

  const currentTournaments = tournaments.filter((tournament) => {
    
    const startDate = new Date(tournament.start_date)
    const endDate = new Date(tournament.end_date)
    const tournamentCategory = tournament.code
  
    return (
        
      (((startDate <= currentDate) && (endDate >= currentDate) && ((endDate - currentDate) <= (14*24*60*60*1000))) && ((tournamentCategory !== "itf") && (!tournament.name.toLowerCase().includes("challenger")) && (!tournament.name.includes("Cancelled"))))
      
      )
    }
  ).map((tournament, index) => {

    const startDate = tournament.start_date.split("-").splice(1).join("/")
    const endDate = tournament.end_date.split("-").splice(1).join("/")
 
    return (

    <TournamentCard
      tournament={tournament}
      index={index}
      key={tournament.id}
      startDate={startDate}
      endDate={endDate}
    />
      
  )})

  return (
    <div className="home-container">

      <p className="home-copy">Current Tournaments</p>

      <MobileBanner />

      { currentTournaments.length === 0 ?

        <p className="tournaments-container-copy"> 
          Currently, there are no tournaments to display.
        </p>

      :
        
        <>
          { currentTournaments }
        </>
      }
      
    </div>
  )
}