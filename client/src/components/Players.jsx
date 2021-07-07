import React, {useState, useEffect, Suspense, lazy} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

import IconLogo from './IconLogo'
import Loader from '../components/Loader'
// import PlayerCard from './PlayerCard'

import { convertCountryIOCtoISO3 } from '../utils/country-converter'

const PlayerCard = React.lazy(() => import('./PlayerCard'))


export default function Players(props) {

  const { rankingCategory, discipline, viewRace, activateSwitch } = props

  const [ loaded, setLoaded ] = useState(false)

  const generatePlayers = (rankingCategory) => {

    if (!activateSwitch && rankingCategory && discipline === "Doubles" && viewRace) {

      console.log(rankingCategory)

      const playerCards = rankingCategory?.map((player, index) => {

        return ( 

          <Suspense fallback={   

            <div className="loader-icon heartbeat" id="rankings-loader">

              <IconLogo />

            </div>
          }> 
          
            <PlayerCard
              playerData = { player }
              playerCountry = { null }
              key={player.current_time}
              discipline = { discipline }
              viewRace = { viewRace }
              componentUsage = "rankings"
            />

          </Suspense>
      )})

      return playerCards

    } else if (!activateSwitch && rankingCategory) {

      console.log(rankingCategory)
      console.log(rankingCategory.length)

      const playerCards = rankingCategory?.map((player, index) => {
      
        return (

          <PlayerCard
            playerData={player}
            playerCountry={convertCountryIOCtoISO3(player.country.toUpperCase())}
            key={player.current_time}
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

  // useDeepCompareEffect(() => {
  //   setLoaded(true)
  // },[rankingCategory])

  return (

    <>
      
      {(activateSwitch || !rankingCategory) ?

        <div className="loader-icon heartbeat" id="rankings-loader">

          <IconLogo />

        </div>

      :
      
        <>

          <Suspense fallback={   

            <div className="loader-icon heartbeat" id="rankings-loader">

              <IconLogo />

            </div>
          }> 
    
            { players }

          </Suspense>
          
        </>
      
      }
      
    </>
  )
}