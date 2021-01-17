import React, { useState } from 'react'

export default function MatchCard (props) {
  
  const { match, index, key } = props
  
  const [matchData, setMatchData] = useState({
    
  })




  const players = match && match?.sport_event.competitors.map((competitor, index) =>
  
    <div className="competitor-container"> 
          
        <p className="competitor-name">{`${competitor.name}`}</p>
          
    </div>
      
  )
  
  const completedSets = match.sport_event_status.period_scores && match?.sport_event_status.period_scores.map((set, index) => 
  
    <div className="completed-set-container">

      <p className="completed-set-score home">{set.home}</p>

      <p className="completed-set-score away">{set.away}</p>

    </div>
    
  )

  const generateSets = function (match) {

    let totalCompletedSets = completedSets.length

    if (match.sport_event_conditions.match_mode === "bo3") {
      for (let i = 1; (i <= (3 - totalCompletedSets)); i++) {
        <div className="uncompleted-set-container">

          <p className="uncompleted-set-score home"></p>
    
          <p className="uncompleted-set-score away"></p>
  
        </div>
      }
    } else {
      for (let i = 1; (i <= (5 - totalCompletedSets)); i++) {
        <div className="uncompleted-set-container">

          <p className="uncompleted-set-score home"></p>
    
          <p className="uncompleted-set-score away"></p>
  
        </div>
      }
    }
  }

  const uncompletedSets = generateSets(match)

  return (
    <div className="match-container" id={key} key={key}>

      <div className="match-card-title">

        <p className="match-card-title-copy">{`${match.sport_event.tournament.gender}'s ${match.sport_event.tournament.type} - ${match.sport_event.tournament_round.name}`}</p>

      </div>

      <div className="match-card">

        <div className="competitors-container">
          
          {players}

        </div>

        <div className="score-container">

        <div className="service-container">

          { match.sport_event_status.game_state.serving === "home" ? 
          
            <>
                
              <i class="fas fa-circle server-icon home"></i>

              <div className="receiver-icon away" />

            </>
              
          :
              
            <>
                
              <div className="receiver-icon home" />

              <i class="fas fa-circle server-icon away"></i>

            </>              
              
          }

        </div>

          <div className="service-score-container">

            <p className="service-score home">{match.sport_event_status.game_state.home_score}</p>

            <p className="service-score away">{match.sport_event_status.game_state.away_score}</p>

          </div>

          {completedSets}

          {uncompletedSets}

        </div>

      </div>

    </div>
  )
}