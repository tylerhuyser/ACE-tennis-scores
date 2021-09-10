import React, { useState, useEffect } from 'react'

import Loader from './Loader'
import Results from './Results'


export default function ResultsContainer (props) {

  const { playerResults } = props

  const [uniqueTournaments, setUniqueTournaments] = useState(null)

  const currentYear = new Date().getFullYear()

  useEffect(() => {

    if (playerResults) {

      console.log("generating unique tournaments")

      const generateUniqueTournaments = () => {

        console.log('ahead of the loop')

        let tournaments = []
        let tournamentsData = []

        for (let i = 0; i < playerResults.results.length; i++) {

          console.log(`in the loop ${i} time`)

          if (!tournaments.includes(playerResults.results[i].sport_event.tournament.id) && (playerResults.results[i].sport_event.season.year === currentYear.toString())) {
            console.log('pushing into array')
            tournaments.push(playerResults.results[i].sport_event.tournament.id)
            tournamentsData.push(playerResults.results[i])
          }
        }
        return tournamentsData
      }


      const uniqueTournamentsArray = generateUniqueTournaments()

      setUniqueTournaments(uniqueTournamentsArray)
    }

  }, [])
  
    return (
     
      <>
        
        {uniqueTournaments === null ?

          <>
          </>
          
        :
        
          <>
      
            <Results uniqueTournaments={uniqueTournaments} playerResults={playerResults} />
            
          </>
          
        }

    </>
  )

}

