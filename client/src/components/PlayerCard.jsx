import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactCountryFlag from "react-country-flag"

import './PlayerCard.css'

export default function PlayerCard(props) {

  const { playerData, key } = props

  const history = useHistory()

  const alpha2Country = new Locale("en", playerData.player.country_code).getISO2Country()

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
          countryCode={playerData.player.country_code}
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