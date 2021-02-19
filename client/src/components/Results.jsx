import React from 'react'

import ResultCard from '../components/ResultCard'

export default function Results(props) {

  const { uniqueTournaments, playerResults } = props

  console.log(uniqueTournaments)

  const tournamentResults = uniqueTournaments && uniqueTournaments?.map((tournament, index) => {
    
    console.log(tournament)
    const startDate = tournament.sport_event.season.start_date.split("-").splice(1).join("/")
    const endDate = tournament.sport_event.season.end_date.split("-").splice(1).join("/")

    return(
      <ResultCard playerResults={playerResults} tournament={tournament} startDate={startDate} endDate={endDate} index={index} />
    )})

  return (
    <div className="results-container-2">
      
      { uniqueTournaments === null ?

        <>
        </>
        
        :

        <>
          {tournamentResults}
        </>
        
      }

    </div>
  )
}