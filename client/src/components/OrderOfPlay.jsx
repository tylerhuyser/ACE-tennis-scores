import React from 'react'
import ReactCountryFlag from "react-country-flag"

import './OrderOfPlay.css'

export default function OrderOfPlay(props) {

  const { currentTournamentSchedule } = props

  const schedule = currentTournamentSchedule.map((match) => {

    let homeCompetitorName = match.competitors[0].name
    let awayCompetitorName = match.competitors[1].name
    let homeCompetitorSeed = '[' + match.competitors[0].seed + ']'
    let awayCompetitorSeed = '[' + match.competitors[1].seed + ']'
    let homeCompetitorCountry = '(' + match.competitors[0].country_code + ')'
    let awayCompetitorCountry = '(' + match.competitors[1].country_code + ')'
    
    return (
      <div className="upcoming-match-container" key={match.id}>
        <p className="competitors">{match.competitors[0].seed !== undefined && match.competitors[0].seed !== null ? homeCompetitorSeed : ``}{` `}{homeCompetitorName}{` `}{homeCompetitorCountry !== undefined && homeCompetitorCountry !== null && match.sport_event_type !== "doubles" ? homeCompetitorCountry : `` }{` vs. `}{match.competitors[1].seed !== undefined && match.competitors[1].seed !== null ? awayCompetitorSeed : ``}{` `}{awayCompetitorName}{` `}{awayCompetitorCountry !== undefined && awayCompetitorCountry !== null && match.sport_event_type !== "doubles" ? awayCompetitorCountry : `` }</p>
      </div>
    )})
   
  return (
    <div className="order-of-play-container">
      {schedule}
    </div>
  )
}