import React, { useState, useEffect } from 'react'

import Loader from '../components/Loader'
import PlayerCard from '../components/PlayerCard'

import {
  playerRankings,
  playerRaceRankings,
  doubleTeamRankings,
  doubleTeamRaceRankings
} from '../utils/rankings'

export default function Rankings(props) {

  const [loaded, setLoaded]
  const [event, setEvent] = useState('WTA')
  const [discpline, setDiscipline] = useState('singles')
  const [viewRace, setViewRace] = useState(false)

  const [maleSinglesRankings, setMaleSinglesRankings] = useState(null)
  const [femaleSinglesRankings, setFemaleSinglesRankings] = useState(null)
  const [maleDoublesRankings, setMaleDoublesRankings] = useState(null)
  const [femaleDoublesRankings, setFemaleDoublesRankings] = useState(null)

  const [maleSinglesRaceRankings, setMaleSinglesRaceRankings] = useState(null)
  const [femaleSinglesRaceRankings, setFemaleSinglesRaceRankings] = useState(null)
  const [maleDoublesRaceRankings, setMaleDoublesRaceRankings] = useState(null)
  const [femaleDoublesRaceRankings, setFemaleDoublesRaceRankings] = useState(null)


  let rankingCategory

  if (event === "WTA" && discpline === "singles" && viewRace === false) {
    rankingCategory = femaleSinglesRankings
  } else if (event === "WTA" && discpline === "singles" && viewRace === true) {
    rankingCategory = femaleSinglesRaceRankings
  } else if (event === "WTA" && discpline === "doubles" && viewRace === false) {
    rankingCategory = femaleDoublesRaceRankings
  } else if (event === "WTA" && discpline === "doubles" && viewRace === true) {
    rankingCategory = femaleDoublesRaceRankings
  } else if (event === "ATP" && discpline === "singles" && viewRace === false) {
    rankingCategory = femaleSinglesRankings
  } else if (event === "ATP" && discpline === "singles" && viewRace === true) {
    rankingCategory = femaleSinglesRaceRankings
  } else if (event === "ATP" && discpline === "doubles" && viewRace === false) {
    rankingCategory = femaleDoublesRaceRankings
  } else if (event === "ATP" && discpline === "doubles" && viewRace === true) {
    rankingCategory = femaleDoublesRaceRankings
  }

  
  useEffect(() => {
    const gatherSinglesRankings = async () => {
      const combinedSinglesRankings = await playerRankings()
      setMaleSinglesRankings(combinedSinglesRankings[1])
      setFemaleSinglesRankings(combinedSinglesRankings[0])
    }

    gatherSinglesRankings()

  }, [])

  useEffect(() => {
    const gatherDoublesRankings = async () => {
      const combinedDoublesRankings = await doubleTeamRankings()
      setMaleDoublesRankings(combinedDoublesRankings[1])
      setFemaleDoublesRankings(combinedDoublesRankings[0])
    }
    const timeOut = setTimeout(() => gatherDoublesRankings(), 1001)
    return () => clearTimeout(timeOut)
  }, [])

  useEffect(() => {
    const gatherSinglesRaceRankings = async () => {
      const combinedSinglesRaceRankings = await playerRaceRankings()
      setMaleSinglesRaceRankings(combinedSinglesRaceRankings[1])
      setFemaleSinglesRaceRankings(combinedSinglesRaceRankings[0])
    }
    const timeOut = setTimeout(() => gatherSinglesRaceRankings(), 2001)
    return () => clearTimeout(timeOut)
  }, [])

  useEffect(() => {
    const gatherDoublesRaceRankings = async () => {
      const combinedDoublesRaceRankings = await playerRaceRankings()
      setMaleDoublesRaceRankings(combinedDoublesRaceRankings[1])
      setFemaleDoublesRaceRankings(combinedDoublesRaceRankings[0])
    }
    const timeOut = setTimeout(() => gatherDoublesRaceRankings(), 3001)
    return () => clearTimeout(timeOut)
  }, [])

  const players = rankingCategory.map(player => (
    <PlayerCard
      player={player}
      index={index}
      key={player.id}
    />
  ))
  
  return (
    <div className="rankings-container">

      {!loaded ?
        
        <Loader />

        :

        {players}

      }
      
    </div>
  )
}