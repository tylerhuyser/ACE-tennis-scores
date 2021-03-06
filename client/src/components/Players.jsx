import React from 'react'

import IconLogo from './IconLogo'
import Loader from '../components/Loader'
import PlayerCard from './PlayerCard'


export default function Players(props) {

  const { rankingCategory, discipline, playerCount, setPlayerCount } = props

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

      const playerCards = rankingCategory?.player_rankings.map((player, index) => {

        setPlayerCount(index)
      
        return (
          <PlayerCard
            playerData={player}
            key={player.player.id}
            discipline={discipline}

          />
      )})
      
      return playerCards

    } else {

      const loader = <Loader />

      return loader
    }
  }

  const players = generatePlayers(rankingCategory)

  console.log(players)

  return (

    <>
      
      { playerCount < 100 ?

        <div className="loader-icon heartbeat" id="rankings-loader">

          <IconLogo />

        </div>

      :
      
        <>
    
          { players }
          
        </>
      
      }
      
    </>
  )
}