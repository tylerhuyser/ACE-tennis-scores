import React, { useState, useEffect, Suspense, lazy } from 'react'
import Switch from "react-switch";

import MobileBanner from '../components/adSense/MobileBanner'
import Loader from '../components/Loader'
// import Players from '../components/Players'
import IconLogo from '../components/IconLogo'

import './Rankings.css'

import {
  herokuRankings
} from '../utils/rankings'

const Players = React.lazy(() => import('../components/Players'))

export default function Rankings(props) {

  const [loaded, setLoaded] = useState(false)
  const [activateSwitch, setActivateSwitch] = useState(false)

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

  // The Below UseEffect collects ranking data via Heroku API

    useEffect(() => {

    if ( !loaded ) {
      
      const gatherRankings = async () => {
        const combinedRankingsData = await herokuRankings()

        const combinedRankings = JSON.parse(combinedRankingsData[0].data)

        const ATPRANKINGS = combinedRankings.rankings.ATPRANKINGS
        const WTARANKINGS = combinedRankings.rankings.WTARANKINGS

        setMaleSinglesRankings(JSON.parse(ATPRANKINGS.ATPSINGLESRANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setFemaleSinglesRankings(JSON.parse(WTARANKINGS.WTASINGLESRANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setMaleSinglesRaceRankings(JSON.parse(ATPRANKINGS.ATPSINGLESRACERANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setFemaleSinglesRaceRankings(JSON.parse(WTARANKINGS.WTASINGLESRACERANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setMaleDoublesRankings(JSON.parse(ATPRANKINGS.ATPDOUBLESRANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setFemaleDoublesRankings(JSON.parse(WTARANKINGS.WTADOUBLESRANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setMaleDoublesRaceRankings(JSON.parse(ATPRANKINGS.ATPDOUBLESRACERANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        setFemaleDoublesRaceRankings(JSON.parse(WTARANKINGS.WTADOUBLESRACERANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))

        setRankingCategory(JSON.parse(ATPRANKINGS.ATPSINGLESRANKINGS).data.dataList.sort((a,b) => (parseInt(a.ranking) > parseInt(b.ranking)) ? 1 : -1 ))
        
        setLoaded(true)
      }

      gatherRankings()
  
    }

  }, [loaded])

// The Below Functions Handle Switch Actions for Ranking Data

  const handleEventSwitch = () => {
    if (event === "WTA") {
      setEvent("ATP")
      // setActivateSwitch(true)
    } else if (event === "ATP") {
      setEvent("WTA")
      // setActivateSwitch(true)
    }
  }

  const handleDisciplineSwitch = () => {
    if (discipline === "Singles") {
      setDiscipline("Doubles")
      // setActivateSwitch(true)
    } else if (discipline === "Doubles") {
      setDiscipline("Singles")
      // setActivateSwitch(true)
    }
  }

  const handleRaceSwitch = () => {
    setViewRace(!viewRace)
    // setActivateSwitch(true)
  }

  const handleSwitch = (switchType) => {
    setActivateSwitch(true)
    if (switchType === "Event") {
      handleEventSwitch()
    } else if (switchType === "Discipline") {
      handleDisciplineSwitch()
    } else if (switchType === "Race") {
      handleRaceSwitch()
    }
  }

  // The Below UseEffect activates when ActivateSwitch is true, thereby changing the current ranking data fed to the Players component and rendered as individual PlayerCards

  useEffect(() => {
    if (loaded && activateSwitch && event === "WTA" && discipline === "Singles" && viewRace === false) {
      setRankingCategory(femaleSinglesRankings)
    } else if (loaded && activateSwitch && event === "WTA" && discipline === "Singles" && viewRace === true) {
      setRankingCategory(femaleSinglesRaceRankings)
    } else if (loaded && activateSwitch && event === "WTA" && discipline === "Doubles" && viewRace === false) {
      setRankingCategory(femaleDoublesRankings)
    } else if (loaded && activateSwitch && event === "WTA" && discipline === "Doubles" && viewRace === true) {
      setRankingCategory(femaleDoublesRaceRankings)
    } else if (loaded && activateSwitch && event === "ATP" && discipline === "Singles" && viewRace === false) {
      setRankingCategory(maleSinglesRankings)
    } else if (loaded && activateSwitch && event === "ATP" && discipline === "Singles" && viewRace === true) {
      setRankingCategory(maleSinglesRaceRankings)
    } else if (loaded && activateSwitch && event === "ATP" && discipline === "Doubles" && viewRace === false) {
      setRankingCategory(maleDoublesRankings)
    } else if (loaded && activateSwitch && event === "ATP" && discipline === "Doubles" && viewRace === true) {
      setRankingCategory(maleDoublesRaceRankings)
    }
  }, [event, discipline, viewRace])

// Below UseEffect triggers when RankingCategory changes AND when ActivateSwitch is TRUE. It sets ActivateSwitch back to false.

  useEffect(() => {
    if (loaded && activateSwitch && rankingCategory) {
      setActivateSwitch(false)
    }
  }, [rankingCategory])

  
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

                <Switch onChange={(e) => handleSwitch("Event")} checked={event === "WTA" ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

                <p className="tour-view-switch-container-copy">WTA</p>

              </div>

              <div className="switch-container" id="discipline-view-switch-container">

                <p className="discipline-view-switch-container-copy">SINGLES</p>

                <Switch onChange={(e) => handleSwitch("Discipline")} checked={discipline === "Doubles" ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

                <p className="discipline-view-switch-container-copy">DOUBLES</p>

              </div>

              <div className="switch-container" id="discipline-view-switch-container">

                <p className="discipline-view-switch-container-copy">ROLLING</p>

                <Switch onChange={(e) => handleSwitch("Race")} checked={viewRace ? true : false} onColor="#F39C12" checkedIcon={false} uncheckedIcon={false} />

                <p className="discipline-view-switch-container-copy">RACE</p>

              </div>

            </div>

            <MobileBanner />

              <Suspense fallback={        
                <div className="loader-icon heartbeat" id="rankings-loader">

                  <IconLogo />

                </div>
              }>

                <Players rankingCategory={rankingCategory} discipline={discipline} viewRace={viewRace} activateSwitch={activateSwitch} />

              </Suspense>
            
          </div>
          
        </>

      }
      
    </>
  )
}