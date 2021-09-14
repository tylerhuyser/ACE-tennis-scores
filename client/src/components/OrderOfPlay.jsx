import React from 'react'
import ReactCountryFlag from "react-country-flag"

import './OrderOfPlay.css'

export default function OrderOfPlay(props) {

  const { currentTournamentSchedule } = props

  const getCountryISO2 = require("country-iso-3-to-2");
  const CountryCodes = require('countrycodes/countryCodes.js')

  console.log(currentTournamentSchedule)

  const generateMatch = (match) => {

      const competitorAName = match.home_player.split(" .")[0]

      const competitorBName = match.away_player.split(" .")[0]

      const matchTime = new Date(match.date).toLocaleTimeString()
      const matchTimeString = matchTime.slice(0,-6) + matchTime.substring(matchTime.length - 3)

      return (

        <div className="upcoming-match-container" key={match.id}>

          <p className="upcoming-match-time">START TIME: NOT BEFORE {matchTimeString} (UTC)</p>
          
          <div className="upcoming-match-competitors-container">

            {match.home && match.away ?

              <ReactCountryFlag
                className="emojiFlag"
                countryCode={CountryCodes.getCountry(match.home.country).iso2}
                aria-label="United States"
                style={{
                  fontSize: '200%',
                  lineHeight: '200%',
                }}
              />
              
            :
                
                <>
                </>
                
            }

            <p className="competitor-name">{competitorAName}{' '}{(match.home) ? '(' + match.home.ranking + ')' : ''}{' '}{match.home ? '(' + CountryCodes.getCountry(match.home.country).iso2 + ')' : ''}</p>

            <p className='player-separator'>vs.</p>

            {match.home && match.away ?

              <ReactCountryFlag
                  className="emojiFlag"
                  countryCode={CountryCodes.getCountry(match.away.country).iso2}
                  style={{
                    fontSize: '200%',
                    lineHeight: '200%',
                  }}
                  aria-label="United States"
              />

            :
                
              <>
              </>
                
            }

            <p className="competitor-name">{competitorBName}{' '}{(match.away) ? '(' + match.away.ranking + ')' : ''}{' '}{match.away ? '(' + CountryCodes.getCountry(match.away.country).iso2 + ')' : ''}</p>

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