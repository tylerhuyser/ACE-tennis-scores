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
  const [calendarTournamentData, setCalendarTournamentData] = useState(null)
  const [filter, setFilter] = useState("")

  const { tournaments, currentDate, viewITF, setViewITF } = props

  useEffect(() => {
    setCalendarTournaments(tournaments)
    setCalendarTournamentData(tournaments)
  }, [])

  useEffect(() => {
    if (calendarTournamentData !== undefined || calendarTournamentData !== null) {
      if (viewCalendar) {
        setCalendarTournamentData(calendarTournaments)
      }
    }
  }, [viewITF])

  useEffect(() => {

    if (filter != "" && viewCalendar) {

        const calendar = calendarTournaments

        setCalendarTournamentData(calendar.filter((tournament) => {

          const tournamentMonth = tournament.current_season.start_date.split("-")[1]

          return (
            (tournamentMonth === filter)
          )
        }))
    }
  }, [filter])

  const handleSwitch = () => {
    setViewCalendar(!viewCalendar)
  }

  const handleNavigation = (month) => {
    setFilter(month)
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

      <div class="calendar-navigation-container-desktop">

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("01")}>JAN</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("02")}>FEB</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("03")}>MAR</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("04")}>APR</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("05")}>MAY</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("06")}>JUN</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("07")}>JUL</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("08")}>AUG</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("09")}>SEP</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("10")}>OCT</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("11")}>NOV</p>

        <p class="calendar-month-separator">•</p>

        <p className="calendar-month-copy" onClick={(e) => handleNavigation("12")}>DEC</p>

      </div>

      <div className="calendar-navigation-container-mobile">
        <select className="calendar-navigations-select-input" defaultValue={'default'} name="mobile-navigation" onChange={(e) => handleNavigation(e.target.value)}>
          <option defaultValue="default">-- Select a Month --</option>
          <option value="01" className="calendar-navigations-select-option">JAN</option>
          <option value="02" className="calendar-navigations-select-option">FEB</option>
          <option value="03" className="calendar-navigations-select-option">MAR</option>
          <option value="04" className="calendar-navigations-select-option">APR</option>
          <option value="05" className="calendar-navigations-select-option">MAY</option>
          <option value="06" className="calendar-navigations-select-option">JUN</option>
          <option value="07" className="calendar-navigations-select-option">JUL</option>
          <option value="08" className="calendar-navigations-select-option">AUG</option>
          <option value="09" className="calendar-navigations-select-option">SEP</option>
          <option value="10" className="calendar-navigations-select-option">OCT</option>
          <option value="11" className="calendar-navigations-select-option">NOV</option>
          <option value="12" className="calendar-navigations-select-option">DEC</option>
        </select>
      </div>
      
      <Tournaments tournaments={viewCalendar ? calendarTournamentData : tournaments.filter((tournament) => {
    
    const startDate = new Date(tournament.start_date)
    const endDate = new Date(tournament.end_date)
    const tournamentCategory = tournament.code
  
    return (
        
      (((startDate <= currentDate) && (endDate >= currentDate) && ((endDate - currentDate) <= (14*24*60*60*1000))) && ((tournamentCategory !== "itf") && (!tournament.name.toLowerCase().includes("challenger")) && (!tournament.name.includes("Cancelled"))))
      
      )
    }
  )} currentDate={currentDate} viewCalendar={viewCalendar} />

    </div>
  )
}