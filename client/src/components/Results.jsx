import React, { useState, useEffect } from 'react'

import ResultCard from './ResultCard'

import React from 'react'

export default function Results(props) {

  const { uniqueTournaments, playerResults } = props

  const tournamentResults = uniqueTournaments && uniqueTournaments?.forEach((tournament, index) => {
    
    const startDate = new Date(tournament.season.start_date)
    const endDate = new Date(tournament.season.end_date)

    return(
      <ResultCard playerResults={playerResults} tournament={tournament} startDate={startDate} endDate={endDate} index={index} />
    )})

  return (
    <>
      {tournamentResults}
    </>
  )
}