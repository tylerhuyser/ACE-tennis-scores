import React from 'react'

import IconLogo from '../components/IconLogo'
import TournamentCard from './TournamentCard'

export default function CalendarCard(props) {
  
  const { month } = props;

  console.log(month)

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
            <p className="month-name">{month.name}</p>
          </div>

          {tournaments}

        </>

        :

        <>
        </>

      }
          
    </>
  )
}