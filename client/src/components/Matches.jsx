import React from 'react'

import MatchCard from '../components/MatchCard'

export default function Matches(props) {
  
  const { matchData, view } = props

  console.log(matchData)
  
  const matches = matchData && matchData?.map((match, index) => (
    <MatchCard 
      match={match}
      index={index}
      key={match.id}
    />
  ))
  
  return (
    <div className="matches-container">

      { matchData !== undefined || matchData !== null || matchData.length !== 0 ?

        { matches }
        
        :
        
        <p className="match-container-copy">

          {`Currently, there are no ${view.toLowerCase()} to display.`}

        </p>
      
      }

    </div>
  )
}