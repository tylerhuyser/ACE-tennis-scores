import React from 'react'

import IconLogo from './IconLogo'
import Loader from '../components/Loader'
import PlayerCard from './PlayerCard'

import { convertCountryFIFAtoISO3 } from '../utils/country-converter'


export default function Players(props) {

  const { rankingCategory, discipline, viewRace, playerCount, setPlayerCount } = props

  const generatePlayers = (rankingCategory) => {
    if (rankingCategory && discipline === "Doubles") {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.map((player, index) => {

        setPlayerCount(index)

        return (  
          
          <PlayerCard
            playerData = { player }
            playerCountry = { convertCountryFIFAtoISO3(player.country) }
            key = { player.id }
            discipline = { discipline }
            viewRace = { viewRace }
            componentUsage = "rankings"
          />
      )})

      return playerCards

    } else if (rankingCategory) {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.map((player, index) => {

        setPlayerCount(index)
      
        return (
          <PlayerCard
            playerData={player}
            playerCountry={player.country.toUpperCase()}
            key={player.id}
            discipline={discipline}
            componentUsage="rankings"

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