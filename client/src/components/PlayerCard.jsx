import React from 'react'
import { useHistory } from 'react-router-dom'

import './PlayerCard.css'

export default function PlayerCard(props) {

  const { playerData, key } = props

  const history = useHistory()

  const handlePlayerDetails = (id) => {

    localStorage.setItem('currentPlayer', JSON.stringify(player))
    history.pushState(`/player/${playerData.player.id}`)
  }
  
  return (
    <div className="player-container" key={key} onClick={(e) => handlePlayerDetails(e)}>
      <p className="player-ranking">{playerData.rank}</p>
      <p className="player-name">{playerData.player.name}</p>
      <p className="player-country">{playerData.player.country_code}</p>
      <p className="player-ranking-points">{playerData.points}</p>
    </div>
  )
}