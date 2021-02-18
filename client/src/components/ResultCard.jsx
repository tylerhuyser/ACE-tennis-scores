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
      
      { ( playerResults === null || !tournament ) ?
        
        <div cla="null-2">
        </div>
        
      :

        <div className="success-2">

          <TournamentCard
            tournament={tournament.sport_event.tournament}
            index={index}
            key={tournament.id}
            startDate={startDate}
            endDate={endDate}
          />

          {tournamentResults}
            
        </div>
  
      }

    </>
  )
}