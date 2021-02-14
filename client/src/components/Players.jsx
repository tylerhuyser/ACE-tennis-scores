import React from 'react'
import PlayerCard from './PlayerCard'


export default function Players(props) {

  const { rankingCategory, discipline, viewRace } = props

  const generatePlayers = (rankingCategory) => {
    if (rankingCategory && viewRace && discipline === "Doubles" && rankingCategory.double_team_rankings !== undefined) {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.double_team_rankings.map((player) => (
        <PlayerCard
          playerData={player}
          key={player.double_team.id}
        />
      ))

      return playerCards

    } else if (rankingCategory) {

      console.log(rankingCategory)

     const playerCards = rankingCategory?.player_rankings.map((player) => (
        <PlayerCard
          playerData={player}
          key={player.player.id}
        />
     ))
      
      return playerCards
    }
  }

  const players = generatePlayers(rankingCategory)
  

  return (

    <>
      
      {players}
      
    </>
  )
}