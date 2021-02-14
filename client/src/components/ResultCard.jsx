import React, { useState, useEffect } from 'react'

import TournamentCard from '../components/TournamentCard'
import MatchCard from '../components/MatchCard'

export default function ResultCard(props) {

  const { playerResults, tournament, startDate, endDate, index } = props
  
    const tournamentResults = playerResults?.filter((result) => (
      result.sport_event.id === tournament.id
    )).map((result, index) => (
      <MatchCard matchData={result} key={result.sport_event.id} />
    ))

  return (
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
  )
}