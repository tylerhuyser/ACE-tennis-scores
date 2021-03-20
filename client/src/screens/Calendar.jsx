import React, {useState, useEffect} from 'react'
import Switch from "react-switch";

import MobileBanner from '../components/adSense/MobileBanner'
import Tournaments from '../components/Tournaments'

import './Calendar.css'

import {
  getTournaments
} from '../utils/tournaments'

export default function Calendar(props) {
  
  const [viewCalendar, setViewCalendar] = useState(false)
  const [calendarTournaments, setCalendarTournaments] = useState(null)

  const { tournaments, currentDate } = props

  useEffect(() => {

    if (viewCalendar) {

      const getDate = (str) => {
        const splitDate = str.split("/")
        const date = splitDate[0]+splitDate[1]+splitDate[2]
        return date
      }

      const gatherCalendar = async () => {
        const calendarData = await getTournaments()
        console.log(calendarData)
        const calendar = calendarData.tournaments.filter(tournament => {
          return (
            ((tournament.current_season.year === "2021") && (tournament.type === "singles"))
          )
        }).sort((a, b) => {
          a = getDate(a.current_season.end_date); b = getDate(b.current_season.end_date); return a.localeCompare(b)
      })
        console.log(calendar)
        setCalendarTournaments(calendar)
      }
      gatherCalendar()
    }
  }, [viewCalendar])

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

      <MobileBanner />
      
      <Tournaments tournaments={viewCalendar ? calendarTournaments : tournaments} currentDate={currentDate} viewCalendar={viewCalendar} />

    </div>
  )
}