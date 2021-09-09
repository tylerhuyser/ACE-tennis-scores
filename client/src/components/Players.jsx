import React, {useState, useEffect} from 'react'

import IconLogo from './IconLogo'
import Loader from '../components/Loader'
import PlayerCard from './PlayerCard'

import { convertCountryIOCtoISO3 } from '../utils/country-converter'

export default function Players(props) {

  const { rankingCategory, discipline, viewRace, activateSwitch } = props

  const [loaded, setLoaded] = useState(false)

  console.log(rankingCategory[1])
  
  useEffect(() => {
    if (activateSwitch) {
      setLoaded(false)
    } else if (!activateSwitch) {
      setLoaded(true)
    }
  }, [])

  const generatePlayers = (rankingCategory) => {

    if (!activateSwitch && rankingCategory && discipline === "Doubles" && viewRace) {

      const playerCards = rankingCategory?.map((player, index) => {

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

    } else if (!activateSwitch && rankingCategory) {

      const playerCards = rankingCategory?.map((player, index) => {

        const key = player.name + player.current_time
      
        return (

          <PlayerCard
            playerData={player}
            playerCountry={convertCountryIOCtoISO3(player.country.toUpperCase())}
            key={key}
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

  // console.log(players[1])

  return (

    <>
      
      {(activateSwitch || !rankingCategory || !loaded) ?

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