import React, { useState, useEffect } from 'react'

import Loader from '../components/Loader'
import PlayerCard from '../components/PlayerCard'

import {
  playerRankings,
  playerRaceRankings,
  doublesTeamRankings,
  doublesTeamRaceRankings
} from '../utils/rankings'

export default function Rankings(props) {

  const [loaded, setLoaded] = useState(false)
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


  const [ rankingCategory, setRankingCategory ] = useState(false)

  if (event === "WTA" && discpline === "singles" && viewRace === false) {
    setRankingCategory(femaleSinglesRankings)
  } else if (event === "WTA" && discpline === "singles" && viewRace === true) {
    rankingCategory = femaleDoublesRankings
  } else if (event === "WTA" && discpline === "doubles" && viewRace === false) {
    rankingCategory = femaleSinglesRaceRankings
  } else if (event === "WTA" && discpline === "doubles" && viewRace === true) {
    rankingCategory = femaleDoublesRaceRankings
  } else if (event === "ATP" && discpline === "singles" && viewRace === false) {
    rankingCategory = maleSinglesRankings
  } else if (event === "ATP" && discpline === "singles" && viewRace === true) {
    rankingCategory = maleDoublesRankings
  } else if (event === "ATP" && discpline === "doubles" && viewRace === false) {
    rankingCategory = maleSinglesRaceRankings
  } else if (event === "ATP" && discpline === "doubles" && viewRace === true) {
    rankingCategory = maleDoublesRaceRankings
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
      const combinedDoublesRankings = await doublesTeamRankings()
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
      const combinedDoublesRaceRankings = await doublesTeamRaceRankings()
      setMaleDoublesRaceRankings(combinedDoublesRaceRankings[1])
      setFemaleDoublesRaceRankings(combinedDoublesRaceRankings[0])
      setLoaded(true)
    }
    const timeOut = setTimeout(() => gatherDoublesRaceRankings(), 3001)
    return () => clearTimeout(timeOut)
  }, [])

  const players = rankingCategory && rankingCategory?.map(player => (
    <PlayerCard
      player={player}
      key={player.id}
    />
  ))

  console.log(rankingCategory)
  
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