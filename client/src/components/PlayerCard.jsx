import React from 'react'
import { useHistory } from 'react-router-dom'

export default function PlayerCard(props) {

  const { player, key } = props

  const history = useHistory()

  const handlePlayerDetails = (id) => {

    localStorage.setItem('currentPlayer', JSON.stringify(player))
    history.pushState(`/player/${player.id}`)
  }
  
  return (
    <div className="player-container" key={key} onClick={(e) => handlePlayerDetails(e)}>
      <p className="player-ranking"></p>
      <p className="player-name">{player.name}</p>
      <p className="player-country"></p>
      <p className="player-ranking-points"></p>
    </div>
  )
}