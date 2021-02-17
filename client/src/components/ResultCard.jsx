import React from 'react'

import TournamentCard from '../components/TournamentCard'
import MatchCard from '../components/MatchCard'

export default function ResultCard(props) {

  const { playerResults, tournament, startDate, endDate, index } = props

  console.log('result card')
  
    const tournamentResults = playerResults && playerResults?.results.filter((result) => (
      result.sport_event.tournament.id === tournament.sport_event.tournament.id
    )).map((result, index) => (
      <MatchCard matchData={result} key={result.sport_event.id} />
    ))

  return (
    <>
      
      { playerResults === null ?
        
        <>
        </>
        
      :

        <>

          <TournamentCard
            tournament={tournament}
            index={index}
            key={tournament.id}
            startDate={startDate}
            endDate={endDate}
          />

          {tournamentResults}
            
        </>
  
      }

    </>
  )
}