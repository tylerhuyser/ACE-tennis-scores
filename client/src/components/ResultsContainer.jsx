import React, { useState, useEffect } from 'react'

import Loader from './Loader'


export default function ResultsContainer (props) {

  const { playerResults, currentYear } = props

  const [uniqueTournaments, setUniqueTournaments] = useState(null)
  
  console.log(currentYear)

  useEffect(() => {

    if (playerResults) {

      const generateUniqueTournaments = () => {

        let tournaments = []
        let tournamentsData = []

        const uniqueTournamentsArray = playerResults && playerResults.results.filter((result) => {

          if (!tournaments.includes(result.sport_event.id) && (result.sport_event.season.year === currentYear.toString())) {
            tournaments.push(result.sport_event.id)
            tournamentsData.push(result)
          }
        })

        setUniqueTournaments(uniqueTournamentsArray)
      }
      generateUniqueTournaments()
    }

  }, [])
  
    return (
     
      <>
        
        {uniqueTournaments === null ?

          <>
          </>
          
        :
        
          <>
      
            <ResultsContainer uniqueTournaments={uniqueTournaments} playerResults={playerResults} />
            
          </>
          
        }

    </>
  )

}

