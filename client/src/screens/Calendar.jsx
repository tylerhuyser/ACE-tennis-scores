import React, {useState} from 'react'
import Switch from "react-switch";

import Tournaments from '../components/Tournaments'

import './Calendar.css'

export default function Calendar(props) {
  
  const [viewCalendar, setViewCalendar] = useState(false)
  const [calendarTournaments, setCalendarTournaments] = useState(null)

  const { tournaments, currentDate } = props

  const handleSwitch = () => {
    setViewCalendar(!viewCalendar)
  }

  return (
    <div className="calendar-container">

      <p className="calendar-container-title">Tournament Calendar</p>

      <div className="calendar-switch-container">

        <p className="calendar-switch-label">Ongoing</p>

        <Switch onChange={handleSwitch} checked={viewCalendar ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />
        
        <p className="calendar-switch-label">Calendar</p>
        
      </div>
      
      <Tournaments tournaments={viewCalendar ? calendarTournaments : tournaments} currentDate={currentDate} />

    </div>
  )
}