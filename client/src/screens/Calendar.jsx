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
  const [calendarTournamentsITF, setCalendarTournamentsITF] = useState(null)
  const [calendarTournamentData, setCalendarTournamentData] = useState(null)
  const [filter, setFilter] = useState("")

  const { tournaments, currentDate, viewITF, setViewITF } = props

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
        const calendar = calendarData.tournaments.sort((a, b) => {
          a = getDate(a.current_season.end_date); b = getDate(b.current_season.end_date); return a.localeCompare(b)
      })
        console.log(calendar)
        setCalendarTournaments(calendar.filter(tournament => {
          return (
            ((tournament.current_season.year === "2021") && (tournament.type === "singles") && (!tournament.name.toLowerCase().includes("itf")))
          )
        }))
        setCalendarTournamentData(calendar.filter(tournament => {
          return (
            ((tournament.current_season.year === "2021") && (tournament.type === "singles") && (!tournament.name.toLowerCase().includes("itf")))
          )
        }))
        setCalendarTournamentsITF(calendar)
      }
      gatherCalendar()
    }
  }, [viewCalendar])

  useEffect(() => {
    if (calendarTournamentData !== undefined || calendarTournamentData !== null) {
      if (viewITF) {
        setCalendarTournamentData(calendarTournamentsITF)
      } else {
        setCalendarTournamentData(calendarTournaments)
      }
    }
  }, [viewITF])

  useEffect(() => {

    if (filter != "") {

      const calendar = calendarTournamentData
    

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

  const handleChange = (e) => {
    setViewITF(!viewITF)
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

      <div className="checkbox-container">

        <label class="checkbox-label">
          <input type="checkbox"
            className="checkbox-input"
            id="calendar-checkbox"
            name="viewITF"
            value={viewITF}
            onChange={(e) => handleChange(e)}
          />
            <span class="checkbox-custom rectangular"></span>
        </label>
        
        <p className="checkbox-label-copy"> Include ITF?</p>
  
      </div>

      <MobileBanner />

      <div class="calendar-navigation-container">

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
      
      <Tournaments tournaments={viewCalendar ? calendarTournamentData : tournaments} currentDate={currentDate} viewCalendar={viewCalendar} />

    </div>
  )
}