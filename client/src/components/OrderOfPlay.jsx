import React from 'react'
import ReactCountryFlag from "react-country-flag"

import './OrderOfPlay.css'

export default function OrderOfPlay(props) {

  const { currentTournamentSchedule } = props

  const getCountryISO2 = require("country-iso-3-to-2");
  const CountryCodes = require('countrycodes/countryCodes.js')

  const generateMatch = (match) => {

      const competitorA = match.home
      const competitorB = match.away

      const competitorAName = competitorA.first_name.charAt(0) + ". " + competitorA.last_name
      const competitorASeed = '(' + competitorA.ranking + ')'
      const competitorACountry = CountryCodes.getCountry(competitorA.country)
      const competitorACountryCode = competitorACountry.iso2

      const competitorBName = competitorB.first_name.charAt(0) + ". " + competitorB.last_name
      const competitorBSeed = '(' + competitorB.ranking + ')'
      const competitorBCountry = CountryCodes.getCountry(competitorB.country)
      const competitorBCountryCode = competitorBCountry.iso2

      const matchTime = new Date(match.date).toLocaleTimeString()
      const matchTimeString = matchTime.slice(0,-6) + matchTime.substring(matchTime.length - 3)

      return (

        <div className="upcoming-match-container" key={match.id}>

          <p className="upcoming-match-time">START TIME: NOT BEFORE {matchTimeString} (UTC)</p>
          
          <div className="upcoming-match-competitors-container">

            <ReactCountryFlag
                className="emojiFlag"
                countryCode={competitorACountryCode}
                aria-label="United States"
                style={{
                  fontSize: '200%',
                  lineHeight: '200%',
              }}
            />

            <p className="competitor-name">{competitorAName}{' '}{(competitorA.seed !== undefined) ? competitorASeed : ''}{` (`}{competitorACountry.iso3}{`)`}</p>

            <p className='player-separator'>vs.</p>

            <ReactCountryFlag
                className="emojiFlag"
                countryCode={competitorBCountryCode}
                style={{
                  fontSize: '200%',
                  lineHeight: '200%',
                }}
                aria-label="United States"
            />

            <p className="competitor-name">{competitorBName}{' '}{(competitorB.seed !== undefined) ? competitorBSeed : ''}{` (`}{competitorBCountry.iso3}{`)`}</p>

          </div>
          
        </div>

      )
  }

const schedule = currentTournamentSchedule.map((match) => {
    
  const matchesJSX = generateMatch(match)
    
  return (
    
    <>
      {matchesJSX}
    </>

  )})
   
  return (
    <div className="order-of-play-container">
      {schedule}
    </div>
  )
}