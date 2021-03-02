import React from 'react'

import Tournaments from '../components/Tournaments'
import TournamentCard from '../components/TournamentCard'

import './Calendar.css'

export default function Calendar(props) {
  
  const { tournaments, currentDate } = props

  return (
    <div className="calendar-container">

      <p className="calendar-container-title">Tournament Calendar</p>
      
      <Tournaments tournaments={tournaments} currentDate={currentDate} />

    </div>
  )
}