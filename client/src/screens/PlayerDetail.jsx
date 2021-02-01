import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Loader from '../components/Loader'

import './PlayerDetail.css'

import {
  getPlayer,
  getPlayerResults,
  getPlayerSchedule
} from "../utils/players"

export default function PlayerDetail(props) {

  const [loaded, setLoaded] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const [playerResults, setPlayerResults] = useState(null)
  const [playerSchedule, setPlayerSchedule] = useState(null)

  useEffect(() => {
    const currentPlayer = localStorage.getItem('currentPlayer')

    if (currentPlayer === undefined) {

    } else {
      setPlayerData(currentPlayer)
    }
  },[])
  
  return (
    <div className="player-detail-container">

      { loaded ? 
      
        <Loader />

        :

        <>
          
        </>
      
      }
      
    </div>
  )
}