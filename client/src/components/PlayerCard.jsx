import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactCountryFlag from "react-country-flag"

import './PlayerCard.css'

export default function PlayerCard(props) {

  const { playerData, key } = props
  const getCountryISO2 = require("country-iso-3-to-2");

  const history = useHistory()
  const alpha2Country = getCountryISO2(playerData.player.country_code)

  const handlePlayerDetails = (id) => {

    localStorage.setItem('currentPlayer', JSON.stringify(playerData))
    history.pushState(`/player/${playerData.player.id}`)
  }
  
  return (
    <div className="player-container" key={key} onClick={(e) => handlePlayerDetails(e)}>
      <p className="player-ranking">{playerData.rank}</p>
      <p className="player-name">{playerData.player.name}</p>
      <div className="player-nationality-container">
        <ReactCountryFlag
          className="emojiFlag"
          countryCode={alpha2Country}
          style={{
              fontSize: '2em',
              lineHeight: '2em',
          }}
          aria-label="United States"
        />
        <p className="player-country">{playerData.player.country_code}</p>
      </div>
      <p className="player-ranking-points">{playerData.points}</p>
    </div>
  )
}