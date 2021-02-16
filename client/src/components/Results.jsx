import React, { useState, useEffect } from 'react'

import TournamentCard from '../components/TournamentCard'
import MatchCard from '../components/MatchCard'
import ResultCard from '../components/ResultCard'


export default function Results(props) {

  const { playerResults, currentYear } = props

  const [ uniqueTournaments, setUniqueTournaments ] = useState([])

  useEffect(() => {

    if (playerResults) {

      const generateUniqueTournaments = () => {
        const uniqueTournamentsArray = playerResults && playerResults.results.filter((result) => {
          let tournaments = []
          let tournamentsData = []
          if (!tournaments.includes(result.sport_event.id) && (result.sport_event.season.year === currentYear.toString())) {
            tournaments.push(result.sport_event.id)
            tournamentsData.push(result)
          }
          console.log(tournaments)
          return tournamentsData
        })
        setUniqueTournaments(uniqueTournamentsArray)
      }
      generateUniqueTournaments()
    }

  }, [])
 
  const results = uniqueTournaments && uniqueTournaments?.forEach((tournament, index) => {
    
    const startDate = new Date(tournament.season.start_date)
    const endDate = new Date(tournament.season.end_date)

    return(
      <ResultCard playerResults={playerResults} tournament={tournament} startDate={startDate} endDate={endDate} index={index} />
    )})
  
    return (
     
    <>
      
      {results}

    </>
  )

}