import React from 'react'

export default function PlayerCard(props) {

  const { player, key } = props
  
  return (
    <div className="player-container" key={key}>
      <p className="player-ranking"></p>
      <p className="player-name">{player.name}</p>
      <p className="player-country"></p>
      <p className="player-ranking-points"></p>
    </div>
  )
}