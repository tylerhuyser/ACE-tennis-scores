import React, { useState, useEffect } from 'react'
import Switch from "react-switch";

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
  const [event, setEvent] = useState('ATP')
  const [discipline, setDiscipline] = useState('Singles')
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
    if (loaded && event === "WTA" && discipline === "Singles" && viewRace === false) {
      setRankingCategory(femaleSinglesRankings)
    } else if (loaded && event === "WTA" && discipline === "Singles" && viewRace === true) {
      setRankingCategory(femaleSinglesRaceRankings)
    } else if (loaded && event === "WTA" && discipline === "Doubles" && viewRace === false) {
      setRankingCategory(femaleDoublesRankings)
    } else if (loaded && event === "WTA" && discipline === "Doubles" && viewRace === true) {
      setRankingCategory(femaleDoublesRaceRankings)
    } else if (loaded && event === "ATP" && discipline === "Singles" && viewRace === false) {
      setRankingCategory(maleSinglesRankings)
    } else if (loaded && event === "ATP" && discipline === "Singles" && viewRace === true) {
      setRankingCategory(maleSinglesRaceRankings)
    } else if (loaded && event === "ATP" && discipline === "Doubles" && viewRace === false) {
      setRankingCategory(maleDoublesRankings)
    } else if (loaded && event === "ATP" && discipline === "Doubles" && viewRace === true) {
      setRankingCategory(maleDoublesRaceRankings)
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
    const timeOut = setTimeout(() => gatherSinglesRaceRankings(), 2002)
    return () => clearTimeout(timeOut)
  }, [])

  useEffect(() => {
    const gatherDoublesRaceRankings = async () => {
      const combinedDoublesRaceRankings = await doublesTeamRaceRankings()
      setMaleDoublesRaceRankings(combinedDoublesRaceRankings.rankings[1])
      setFemaleDoublesRaceRankings(combinedDoublesRaceRankings.rankings[0])
      setLoaded(true)
    }
    const timeOut = setTimeout(() => gatherDoublesRaceRankings(), 3003)
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

  const handleEventSwitch = () => {
    if (event === "WTA") {
      setEvent("ATP")
    } else if (event === "ATP") {
      setEvent("WTA")
    }
  }

  const handleDisciplineSwitch = () => {
    if (discipline === "Singles") {
      setDiscipline("Doubles")
    } else if (discipline === "Doubles") {
      setDiscipline("Singles")
    }
  }

  const handleRaceSwitch = () => {
    setViewRace(!viewRace)
  }
  
  return (
    <>

      {!loaded ?
        
        <Loader />

        :
      
        <>

          <div className="rankings-container">

            <p className="rankings-container-title">{event} {discipline} {viewRace ? "Race" : ""} Rankings</p>

            <div className="rankings-toggle-view-container">

              <div className="switch-container" id="tour-view-switch-container">

                <p className="tour-view-switch-container-copy">ATP</p>

                <Switch onChange={handleEventSwitch} checked={event === "WTA" ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

                <p className="tour-view-switch-container-copy">WTA</p>

              </div>

              <div className="switch-container" id="discipline-view-switch-container">

                <p className="discipline-view-switch-container-copy">SINGLES</p>

                <Switch onChange={handleDisciplineSwitch} checked={discipline === "Doubles" ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

                <p className="discipline-view-switch-container-copy">DOUBLES</p>

              </div>

              <div className="switch-container" id="discipline-view-switch-container">

                <p className="discipline-view-switch-container-copy">ROLLING</p>

                <Switch onChange={handleRaceSwitch} checked={viewRace ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

                <p className="discipline-view-switch-container-copy">RACE</p>

              </div>

            </div>

            {players}


          </div>
          
        </>

      }
      
    </>
  )
}