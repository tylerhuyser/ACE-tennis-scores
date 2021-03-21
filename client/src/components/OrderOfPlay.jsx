import React from 'react'
import ReactCountryFlag from "react-country-flag"

import './OrderOfPlay.css'

export default function OrderOfPlay(props) {

  const { currentTournamentSchedule } = props

  const getCountryISO2 = require("country-iso-3-to-2");

  const generateMatch = (match) => {

    console.log(match)
    if (match.sport_event_type === "doubles") {

      const competitorA = match.competitors[0]
      const competitorB = match.competitors[1]

      const doublesTeamInfo = {
        doublesTeamA: {
          partnerA: {
            name: competitorA.players[0].name.split(',')[0],
            countryCode: competitorA.players[0].country_code
          },
          partnerB: {
            name: competitorA.players[1].name.split(',')[0],
            countryCode: competitorA.players[1].country_code
          },
          seed: '[' + competitorA.seed + ']'
        },
        doublesTeamB: {
          partnerA: {
            name: competitorB.players[0].name.split(',')[0],
            countryCode: competitorB.players[0].country_code
          },
          partnerB: {
            name: competitorB.players[1].name.split(',')[0],
            countryCode: competitorB.players[1].country_code
          },
          seed: '[' + competitorB.seed + ']'
        }
      }

      const competitorAPartnerAAlpha2Country = getCountryISO2(doublesTeamInfo.doublesTeamA.partnerA.countryCode)
      const competitorAPartnerBAlpha2Country = getCountryISO2(doublesTeamInfo.doublesTeamA.partnerB.countryCode)
      const competitorBPartnerAAlpha2Country = getCountryISO2(doublesTeamInfo.doublesTeamB.partnerA.countryCode)
      const competitorBPartnerBAlpha2Country = getCountryISO2(doublesTeamInfo.doublesTeamB.partnerB.countryCode)

      return (

        <div className="upcoming-match-container" key={match.id}>

          <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorAPartnerAAlpha2Country}
              style={{
                fontSize: '200%',
                lineHeight: '200%',
              }}
              aria-label="United States"
            />
            
            <p className="player-country-seperator">/</p>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorAPartnerBAlpha2Country}
              style={{
                fontSize: '200%',
                lineHeight: '200%',
              }}
              aria-label="United States"
            />
          
          <p className="competitor-name">{doublesTeamInfo.doublesTeamA.partnerA.name}{'/'}{doublesTeamInfo.doublesTeamA.partnerB.name}{' '}{(competitorA.seed !== undefined) ? doublesTeamInfo.doublesTeamA.seed : ''}{` (`}{doublesTeamInfo.doublesTeamA.partnerA.countryCode}{'/'}{doublesTeamInfo.doublesTeamA.partnerB.countryCode}{')'}</p>

          <p className='player-separator'>vs.</p>

          <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorBPartnerAAlpha2Country}
              style={{
                fontSize: '200%',
                lineHeight: '200%',
              }}
              aria-label="United States"
            />
            
            <p className="player-country-seperator">/</p>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorBPartnerBAlpha2Country}
              style={{
                fontSize: '200%',
                lineHeight: '200%',
              }}
              aria-label="United States"
            />
          
          <p className="competitor-name">{doublesTeamInfo.doublesTeamB.partnerA.name}{'/'}{doublesTeamInfo.doublesTeamB.partnerB.name}{' '}{(competitorB.seed !== undefined) ? doublesTeamInfo.doublesTeamB.seed : ''}{` (`}{doublesTeamInfo.doublesTeamB.partnerA.countryCode}{'/'}{doublesTeamInfo.doublesTeamB.partnerB.countryCode}{')'}</p>

        </div>

      )

    } else {

      const competitorA = match.competitors[0]
      const competitorB = match.competitors[1]

      const competitorAName = competitorA.name
      const competitorASeed = '[' + competitorA.seed + ']'
      const competitorACountryCode = competitorA.country_code
      const competitorAAlpha2Country = getCountryISO2(competitorACountryCode)

      const competitorBName = competitorB.name
      const competitorBSeed = '[' + competitorB.seed + ']'
      const competitorBCountryCode = competitorB.country_code
      const competitorBAlpha2Country = getCountryISO2(competitorBCountryCode)

      return (

        <div className="upcoming-match-container" key={match.id}>

          <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorAAlpha2Country}
              aria-label="United States"
              style={{
                fontSize: '200%',
                lineHeight: '200%',
            }}
          />

          <p className="competitor-name">{competitorAName}{' '}{(competitorA.seed !== undefined) ? competitorASeed : ''}{` (`}{competitorACountryCode}{`)`}</p>

          <p className='player-separator'>vs.</p>

          <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorBAlpha2Country}
              style={{
                fontSize: '200%',
                lineHeight: '200%',
              }}
              aria-label="United States"
          />

          <p className="competitor-name">{competitorBName}{' '}{(competitorB.seed !== undefined) ? competitorBSeed : ''}{` (`}{competitorBCountryCode}{`)`}</p>

        </div>

      )
    }
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