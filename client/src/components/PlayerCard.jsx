import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactCountryFlag from "react-country-flag"

import Loader from '../components/Loader'
import './PlayerCard.css'

export default function PlayerCard(props) {

  const [loaded, setLoaded] =  useState(false)
  const [detailLevel, setDetailLevel] = useState("none")
  const [playerRankings, setPlayerRankings] = useState({
    playerSinglesRanking: "--",
    playerSinglesRankingPoints: "--",
    playerSinglesRaceRanking: "--",
    playerSinglesRaceRankingPoints: "--",
    playerDoublesRanking: "--",
    playerDoublesRankingPoints: "--",
    playerDoublesRaceRanking: "--",
    playerDoublesRaceRankingPoints: "--"
  })

  const { playerData, discipline } = props
  const getCountryISO2 = require("country-iso-3-to-2");

  const history = useHistory()
  const alpha2Country = getCountryISO2(playerData.player.country_code)

  useEffect(() => {
    const gatherPlayerRankings = (playerData) => {

      if (playerData.rank) {

        setDetailLevel("low")

      } else if (playerData.rankings) {

        const setPlayerRankingsData = (playerData) => {
          for (let i = 0; i < playerData.rankings.length; i++) {
            console.log("inside player card loop")
            if (playerData.rankings[i].type === "singles" && playerData.rankings[i].race_ranking === false) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerSinglesRanking: playerData.rankings[i].rank,
                playerSinglesRankingPoints: playerData.rankings[i].points
              }));
            } else if (playerData.rankings[i].type === "singles" && playerData.rankings[i].race_ranking === true) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerSinglesRaceRanking: playerData.rankings[i].rank,
                playerSinglesRaceRankingPoints: playerData.rankings[i].points
              }));
            } else if (playerData.rankings[i].type === "doubles" && playerData.rankings[i].race_ranking === false) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerDoublesRanking: playerData.rankings[i].rank,
                playerDoublesRankingPoints: playerData.rankings[i].points
              }));
            } else if (playerData.rankings[i].type === "doubles" && playerData.rankings[i].race_ranking === true) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerDoublesRaceRanking: playerData.rankings[i].rank,
                playerDoublesRaceRankingPoints: playerData.rankings[i].points
              }));
            }
          }
        }

        setPlayerRankingsData(playerData)
        setDetailLevel("high")
      }
    }
    gatherPlayerRankings(playerData)
  }, [])

  useEffect(() => {
    if (detailLevel !== "none") {
      setLoaded(true)
    }
  }, [detailLevel])

  const handlePlayerDetails = (id) => {

    localStorage.setItem('currentPlayer', JSON.stringify(playerData))
    history.push(`/player/${playerData.player.id}`)
  }

  console.log(playerData)
  
  return (

    <>
      
      { !loaded ?
        
        <>
        </>
        
      :

        <>
        
          { (detailLevel === "low") ?
        
            <div className="player-container" key={playerData.player.id} onClick={(e) => handlePlayerDetails(e)}>

              <p className="player-ranking">{playerData.rank}</p>
              <p className="player-name">{playerData.player.name}</p>

              <div className="player-nationality-container">

                <ReactCountryFlag
                  className="emojiFlag"
                  countryCode={alpha2Country}
                  style={{
                    fontSize: '2em',
                    lineHeight: '2em',
                  }}
                  aria-label="United States"
                />
                <p className="player-country">{playerData.player.country_code}</p>

              </div>

              <p className="player-ranking-points">{playerData.points}</p>

            </div>
          
          :

            <>
            
              <div className="player-container" id="high-detail" key={playerData.player.id} onClick={(e) => handlePlayerDetails(e)}>
              
              <div className="player-nationality-container">
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={alpha2Country}
                    style={{
                      fontSize: '2em',
                      lineHeight: '2em',
                    }}
                    aria-label="United States"
                  />
                  <p className="player-country">{playerData.player.country_code}</p>
                </div>
                
                <p className="player-name">{playerData.player.name}</p>
              
              </div>

              <div className="playerDetail-rankings-container">

                <p className="playerDetail-rankings-container-title">Ranking Details</p>

                <div className="detailed-player-rankings-container">

                  <div className="player-rankings-container" id="singles">

                    <p className="player-rankings-container-subtitle">Singles</p>

                    <div className="ranking-category-container">

                      <div className="ranking-discipline-container" id="singles">

                        <p className="player-rankings-container-header">Current</p>

                        <p className="player-ranking-detail">{playerRankings.playerSinglesRanking}</p>

                        <p className="player-ranking-points-detail">{`(`}{playerRankings.playerSinglesRankingPoints} points{`)`}</p>

                      </div>

                      <div className="ranking-discipline-container" id="singles-race">

                        <p className="player-rankings-container-header">Race</p>

                        <p className="player-ranking-detail">{playerRankings.playerSinglesRaceRanking}</p>

                        <p className="player-ranking-points-detail">{`(`}{playerRankings.playerSinglesRaceRankingPoints} points{`)`}</p>

                        </div>
                      
                    </div>

                  </div>

                  <div className="player-rankings-container" id="doubles">

                    <p className="player-rankings-container-subtitle">Doubles</p>

                    <div className="ranking-category-container">

                      <div className="ranking-discipline-container" id="doubles">

                        <p className="player-rankings-container-header">Current</p>

                        <p className="player-ranking-detail">{playerRankings.playerDoublesRanking}</p>
                        
                        <p className="player-ranking-points-detail">{`(`}{playerRankings.playerDoublesRankingPoints} points{`)`}</p>

                      </div>

                      <div className="ranking-discipline-container" id="doubles">

                        <p className="player-rankings-container-header">Race</p>

                        <p className="player-ranking-detail">{playerRankings.playerDoublesRanking}</p>

                        <p className="player-ranking-points-detail">{`(`}{playerRankings.playerDoublesRankingPoints} points{`)`}</p>

                      </div>
                      
                    </div>

                  </div>

                </div>

              </div>
              
            </>
        
          }

        </>

      }
    
    </>
      
  )

}