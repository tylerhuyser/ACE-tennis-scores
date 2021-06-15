import React, { useState, useEffect } from 'react'
import Switch from "react-switch";

import MobileBanner from '../components/adSense/MobileBanner'
import Loader from '../components/Loader'
import Players from '../components/Players'

import './Rankings.css'

import {
  herokuRankings
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

  const [playerCount, setPlayerCount] = useState(0)

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
    const gatherRankings = async () => {
      const combinedRankingsData = await herokuRankings()
      console.log(combinedRankingsData)

      const combinedRankings = JSON.parse(combinedRankingsData[0].data)
      console.log(combinedRankings)

      const ATPRANKINGS = combinedRankings.rankings.ATPRANKINGS
      const WTARANKINGS = combinedRankings.rankings.WTARANKINGS

      console.log(ATPRANKINGS)
      console.log(WTARANKINGS)

      const maleSinglesRankingsData = ATPRANKINGS.ATPRankings.ATPSINGLESRANKINGS.ATP_SINGLES_RANKINGS

      console.log(JSON.parse(maleSinglesRankingsData).data.dataList)

      setMaleSinglesRankings(JSON.parse(ATPRANKINGS.ATPRankings.ATPSINGLESRANKINGS.ATP_SINGLES_RANKINGS).data.dataList)
      setFemaleSinglesRankings(JSON.parse(WTARANKINGS.WTARankings.WTASINGLESRANKINGS.WTA_SINGLES_RANKINGS).data.dataList)
      setMaleSinglesRaceRankings(JSON.parse(ATPRANKINGS.ATPRankings.ATPSINGLESRACERANKINGS.ATP_SINGLES_RACE_RANKINGS).data.dataList)
      setFemaleSinglesRaceRankings(JSON.parse(WTARANKINGS.WTARankings.WTASINGLESRACERANKINGS.WTA_SINGLES_RACE_RANKINGS).data.dataList)
      setMaleDoublesRankings(JSON.parse(ATPRANKINGS.ATPRankings.ATPDOUBLESRANKINGS.ATP_DOUBLES_RANKINGS).data.dataList)
      setFemaleDoublesRankings(JSON.parse(WTARANKINGS.WTARankings.WTADOUBLESRANKINGS.WTA_DOUBLES_RANKINGS).data.dataList)
      setMaleDoublesRaceRankings(JSON.parse(ATPRANKINGS.ATPRankings.ATPDOUBLESRACERANKINGS.ATP_DOUBLES_RACE_RANKINGS).data.dataList)
      setFemaleDoublesRaceRankings(JSON.parse(WTARANKINGS.WTARankings.WTADOUBLESRACERANKINGS.WTA_DOUBLES_RACE_RANKINGS).data.dataList)
      
      setLoaded(true)
    }

    gatherRankings()

  }, [])

  const handleEventSwitch = () => {
    if (event === "WTA") {
      setPlayerCount(0)
      setEvent("ATP")
    } else if (event === "ATP") {
      setPlayerCount(0)
      setEvent("WTA")
    }
  }

  const handleDisciplineSwitch = () => {
    if (discipline === "Singles") {
      setPlayerCount(0)
      setDiscipline("Doubles")
    } else if (discipline === "Doubles") {
      setPlayerCount(0)
      setDiscipline("Singles")
    }
  }

  const handleRaceSwitch = () => {
    setPlayerCount(0)
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

            <MobileBanner />

              <Players rankingCategory={rankingCategory} discipline={discipline} viewRace={viewRace} playerCount={playerCount} setPlayerCount={setPlayerCount} />
            
          </div>
          
        </>

      }
      
    </>
  )
}