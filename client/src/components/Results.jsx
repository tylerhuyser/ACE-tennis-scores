import React from 'react'

import ResultCard from './ResultCard'

export default function Results(props) {

  const { uniqueTournaments, playerResults } = props

  const tournamentResults = uniqueTournaments && uniqueTournaments?.forEach((tournament, index) => {
    
    console.log(tournament)
    const startDate = new Date(tournament.sport_event.season.start_date)
    const endDate = new Date(tournament.sport_event.season.end_date)

    return(
      <ResultCard playerResults={playerResults} tournament={tournament} startDate={startDate} endDate={endDate} index={index} />
    )})

  return (
    <>
      {tournamentResults}
    </>
  )
}