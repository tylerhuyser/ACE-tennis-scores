import React from 'react'

import TournamentCard from './TournamentCard'
import MobileBanner from './adSense/MobileBanner'

import './CalendarCard.css'

export default function CalendarCard(props) {
  
  const { month } = props;

  const tournaments = month && month?.data.map((tournament, index) => {
          
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
    <>
      
      { month && month.data.length > 0 ?
        
        <>
      
          <div className="month-card">
            <p className="month-name">{month.name.toUpperCase()}</p>
          </div>

          {tournaments}

          <MobileBanner />

        </>

        :

        <>
        </>

      }
          
    </>
  )
}