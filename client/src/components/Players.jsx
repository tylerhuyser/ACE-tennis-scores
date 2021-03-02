import React from 'react'

import Loader from '../components/Loader'
import PlayerCard from './PlayerCard'


export default function Players(props) {

  const { rankingCategory, viewRace, discipline } = props

  const generatePlayers = (rankingCategory) => {
    if (rankingCategory && discipline === "Doubles" && rankingCategory.double_team_rankings !== undefined) {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.double_team_rankings.map((player) => (
        <PlayerCard
          playerData={player}
          key={player.double_team.id}
          discipline={discipline}
        />
      ))

      return playerCards

    } else if (rankingCategory) {

      console.log(rankingCategory)

     const playerCards = rankingCategory?.player_rankings.map((player) => (
        <PlayerCard
          playerData={player}
          key={player.player.id}
          discipline={discipline}
        />
     ))
      
      return playerCards
    }
  }

  const players = generatePlayers(rankingCategory)
  

  return (

    <>
      
      { (!players || players.length < 100) ?

        <Loader />
        
      :
      
        <>
      
          {players}
          
        </>
      
      }
      
    </>
  )
}