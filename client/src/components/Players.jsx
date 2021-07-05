import React, {useState} from 'react'

import IconLogo from './IconLogo'
import Loader from '../components/Loader'
import PlayerCard from './PlayerCard'

import { convertCountryIOCtoISO3 } from '../utils/country-converter'


export default function Players(props) {

  const { rankingCategory, discipline, viewRace, playerCount, setPlayerCount } = props

  const [loaded, setLoaded] = useState(false)

  const generatePlayers = (rankingCategory) => {
    if (rankingCategory && discipline === "Doubles" && viewRace) {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.map((player, index) => {

        if ((index === (rankingCategory.length + 1))) {
          setLoaded(true)
        }

        return (  
          
          <PlayerCard
            playerData = { player }
            playerCountry = { null }
            key={player.current_time}
            discipline = { discipline }
            viewRace = { viewRace }
            componentUsage = "rankings"
          />
      )})

      return playerCards

    } else if (rankingCategory) {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.map((player, index) => {

        if ((index === (rankingCategory.length + 1))) {
          setLoaded(true)
        }
      
        return (
          <PlayerCard
            playerData={player}
            playerCountry={convertCountryIOCtoISO3(player.country.toUpperCase())}
            key={player.player_name}
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
      
      { (loaded || (playerCount < 100)) ?

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