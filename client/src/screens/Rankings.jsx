import React, { useState, useEffect } from 'react'

import Loader from '../components/Loader'
import PlayerCard from '../components/PlayerCard'

import './Rankings.css'

import {
  playerRankings,
  playerRaceRankings,
  doublesTeamRankings,
  doublesTeamRaceRankings
} from '../utils/rankings'

export default function Rankings(props) {

  const [loaded, setLoaded] = useState(false)
  const [event, setEvent] = useState('WTA')
  const [discipline, setDiscipline] = useState('singles')
  const [viewRace, setViewRace] = useState(false)

  const [maleSinglesRankings, setMaleSinglesRankings] = useState(null)
  const [femaleSinglesRankings, setFemaleSinglesRankings] = useState(null)
  const [maleDoublesRankings, setMaleDoublesRankings] = useState(null)
  const [femaleDoublesRankings, setFemaleDoublesRankings] = useState(null)

  const [maleSinglesRaceRankings, setMaleSinglesRaceRankings] = useState(null)
  const [femaleSinglesRaceRankings, setFemaleSinglesRaceRankings] = useState(null)
  const [maleDoublesRaceRankings, setMaleDoublesRaceRankings] = useState(null)
  const [femaleDoublesRaceRankings, setFemaleDoublesRaceRankings] = useState(null)


  const [ rankingCategory, setRankingCategory ] = useState(false)

  useEffect(() => {
    if (loaded && event === "WTA" && discipline === "singles" && viewRace === false) {
      console.log('here')
      console.log(femaleSinglesRankings)
      setRankingCategory(femaleSinglesRankings)
    } else if (event === "WTA" && discipline === "singles" && viewRace === true) {
      rankingCategory = femaleDoublesRankings
    } else if (event === "WTA" && discipline === "doubles" && viewRace === false) {
      rankingCategory = femaleSinglesRaceRankings
    } else if (event === "WTA" && discipline === "doubles" && viewRace === true) {
      rankingCategory = femaleDoublesRaceRankings
    } else if (event === "ATP" && discipline === "singles" && viewRace === false) {
      rankingCategory = maleSinglesRankings
    } else if (event === "ATP" && discipline === "singles" && viewRace === true) {
      rankingCategory = maleDoublesRankings
    } else if (event === "ATP" && discipline === "doubles" && viewRace === false) {
      rankingCategory = maleSinglesRaceRankings
    } else if (event === "ATP" && discipline === "doubles" && viewRace === true) {
      rankingCategory = maleDoublesRaceRankings
    }
  }, [loaded, event, discipline, viewRace])

  
  useEffect(() => {
    const gatherSinglesRankings = async () => {
      const combinedSinglesRankings = await playerRankings()
      console.log(combinedSinglesRankings)
      setMaleSinglesRankings(combinedSinglesRankings.rankings[1])
      setFemaleSinglesRankings(combinedSinglesRankings.rankings[0])
    }

    gatherSinglesRankings()

  }, [])

  useEffect(() => {
    const gatherDoublesRankings = async () => {
      const combinedDoublesRankings = await doublesTeamRankings()
      setMaleDoublesRankings(combinedDoublesRankings.rankings[1])
      setFemaleDoublesRankings(combinedDoublesRankings.rankings[0])
    }
    const timeOut = setTimeout(() => gatherDoublesRankings(), 1001)
    return () => clearTimeout(timeOut)
  }, [])

  useEffect(() => {
    const gatherSinglesRaceRankings = async () => {
      const combinedSinglesRaceRankings = await playerRaceRankings()
      setMaleSinglesRaceRankings(combinedSinglesRaceRankings.rankings[1])
      setFemaleSinglesRaceRankings(combinedSinglesRaceRankings.rankings[0])
    }
    const timeOut = setTimeout(() => gatherSinglesRaceRankings(), 2001)
    return () => clearTimeout(timeOut)
  }, [])

  useEffect(() => {
    const gatherDoublesRaceRankings = async () => {
      const combinedDoublesRaceRankings = await doublesTeamRaceRankings()
      setMaleDoublesRaceRankings(combinedDoublesRaceRankings.rankings[1])
      setFemaleDoublesRaceRankings(combinedDoublesRaceRankings.rankings[0])
      setLoaded(true)
    }
    const timeOut = setTimeout(() => gatherDoublesRaceRankings(), 3001)
    return () => clearTimeout(timeOut)
  }, [])

  const players = rankingCategory && rankingCategory?.player_rankings.map((player) => (
    <PlayerCard
      playerData={player}
      key={player.player.id}
    />
  ))

  console.log(rankingCategory)
  console.log(players)
  
  return (
    <>

      {!loaded ?
        
        <Loader />

        :
      
        <>

          <div className="rankings-container">
            {players}
          </div>
          
        </>

      }
      
    </>
  )
}