import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactCountryFlag from "react-country-flag"

import './PlayerCard.css'

export default function PlayerCard(props) {

  const [loaded, setLoaded] =  useState(false)
  const [detailLevel, setDetailLevel] = useState("none")

  const { playerData, playerCountry, discipline, viewRace, componentUsage, key } = props

  const history = useHistory()

  const getCountryISO2 = require("country-iso-3-to-2");
  const alpha2Country = getCountryISO2(playerCountry)

  useEffect(() => {
    const gatherPlayerRankings = (playerData) => {

      if (!loaded && componentUsage === "rankings") {
        setDetailLevel("medium")
      }
    }
    gatherPlayerRankings(playerData)
  }, [])

  useEffect(() => {
    if (detailLevel !== "none") {
      setLoaded(true)
    }
  }, [detailLevel])

  const handlePlayerDetails = (id) => {

    if (playerData && !viewRace && discipline !== "Doubles") {

      localStorage.setItem('currentPlayer', JSON.stringify(playerData))
      history.push(`/player/${playerData.id}`)

    }
  }
  
  return (

    <>
          
        <div className="player-container" id={componentUsage === "rankings" ? `low-detail` : `high-detail`} key={key} onClick={(e) => handlePlayerDetails(e)}>
          
          {componentUsage === "rankings" ?
            
            <>

              <p className="player-ranking">{playerData.ranking}</p>

              <p className="player-name">{discipline === "Doubles" && viewRace ? `${playerData.player_name_1}/${playerData.player_name_2}` : playerData.player_name}</p>
              
              {((discipline === "Doubles") && viewRace) ?
                
                <>
                </>
                
                :

                <div className="player-nationality-container">

                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={alpha2Country}
                    aria-label="United States"
                    style={{
                      fontSize: '200%',
                      lineHeight: '200%',
                    }}
                  />
              
                  <p className="player-country">{playerData.country.toUpperCase()}</p>

                </div>

              }

              <p className="player-ranking-points">{playerData.points}</p>

            </>

            :

            <div className="player-nationality-container">

              <ReactCountryFlag
                className="emojiFlag"
                countryCode={alpha2Country}
                aria-label="United States"
                style={{
                  fontSize: '200%',
                  lineHeight: '200%',
                }}
              />
              
              <p className="player-country">{playerData.country.toUpperCase()}</p>
              
            </div>
            
          }
        
        </div>
          
      {/* } */}

    </>
      
  )

}