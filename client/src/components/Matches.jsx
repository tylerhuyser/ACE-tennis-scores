import React from 'react'

import MatchCard from '../components/MatchCard'

export default function Matches(props) {
  
  const { matchData } = props
  
  const matches = matchData?.map((match, index) => (
    <MatchCard 
      match={match}
      index={index}
      key={match.id}
    />
  ))
  
  return (
    <div className="matches-container">
      {matches}
    </div>
  )
}