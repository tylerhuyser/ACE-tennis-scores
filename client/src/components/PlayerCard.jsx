import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import ReactCountryFlag from "react-country-flag"

import './PlayerCard.css'

export default function PlayerCard(props) {

  const [detailLevel, setDetailLevel] = useState("low")
  const [playerRankings, setPlayerRankings] = useState({
    playerSinglesRanking: "",
    playerSinglesRaceRankings: "",
    playerDoublesRanking: "",
    playerDoublesRaceRankings: ""
  })

  const [playerSinglesRanking, setplayerSinglesRanking] = useState("")
  const [playerSinglesRaceRanking, setPlayerSinglesRaceRanking] = useState("")
  const [playerDoublesRanking, setPlayerDoublesRanking] = useState("")
  const [playerDoublesRaceRanking, setPlayerDoublesRaceRanking] = useState("")

  const { playerData, discipline } = props
  const getCountryISO2 = require("country-iso-3-to-2");

  const history = useHistory()
  const alpha2Country = getCountryISO2(playerData.player.country_code)

  useEffect(() => {
    const gatherPlayerRankings = (playerData) => {

      if (playerData.rank) {

        setPlayerRanking(playerData.rank)
        setDetailLevel("low")

      } else if (playerData.rankings) {

        const setPlayerRankingsData = (playerData) => {
          for (let i = 0; i < playerData.rankings.length; i++) {
            if (playerData.rankings[i].type === "singles" && playerData.rankings[i].race_rankings === false) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerSinglesRanking: playerData.rankings[i].rank
              }));
            } else if (playerData.rankings[i].type === "singles" && playerData.rankings[i].race_rankings === true) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerSinglesRaceRanking: playerData.rankings[i].rank
              }));
            } else if (playerData.rankings[i].type === "doubles" && playerData.rankings[i].race_rankings === false) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerDoublesRanking: playerData.rankings[i].rank
              }));
            } else if (playerData.rankings[i].type === "doubles" && playerData.rankings[i].race_rankings === true) {
              setPlayerRankings(prevState => ({
                ...prevState,
                playerDoublesRaceRanking: playerData.rankings[i].rank
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

  const handlePlayerDetails = (id) => {

    localStorage.setItem('currentPlayer', JSON.stringify(playerData))
    history.push(`/player/${playerData.player.id}`)
  }

  console.log(playerData)
  
  return (

    <>
      
      { detailLevel = "low" ?
      
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
        </>
      
      }

    </>

  )
}