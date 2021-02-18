import React from 'react'

import ResultCard from '../components/ResultCard'

export default function Results(props) {

  const { uniqueTournaments, playerResults } = props

  console.log(uniqueTournaments)

  const tournamentResults = uniqueTournaments && uniqueTournaments?.map((tournament, index) => {
    
    console.log(tournament)
    const startDate = new Date(tournament.sport_event.season.start_date)
    const endDate = new Date(tournament.sport_event.season.end_date)

    return(
      <ResultCard playerResults={playerResults} tournament={tournament} startDate={startDate} endDate={endDate} index={index} />
    )})

  return (
    <div className="results-container-2">
      
      { uniqueTournaments === null ?

        <div className="null">
        </div>
        
        :

        <div className="success-1">
          {tournamentResults}
        </div>
        
      }

    </div>
  )
}