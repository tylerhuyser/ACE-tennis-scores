import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"
import XMLParser from 'react-xml-parser';

import "./MatchCard.css";

import {
  getLiveMatchGoalServe
} from '../utils/live'

export default function MatchCard(props) {
  const { matchData, supportingMatchData, discipline, tournamentGender, court, round, status } = props;
  const history = useHistory();

  const [currentMatchData, setCurrentMatchData] = useState(matchData)

  const [match, setMatch] = useState(null)

  const [matchInfo, setMatchInfo] = useState({

    tournamentEvent: tournamentGender,
    tournamentDiscipline: discipline,
    tournamentRound: round,

    matchCourt: court,
    matchStatus: status,

    homeCompetitorID: matchData.player[0]["@id"],
    homeCompetitor: matchData.player[0]["@name"],

    awayCompetitorID: matchData.player[1]["@id"],
    awayCompetitor: matchData.player[0]["@name"]

  })

  const [scoreInfo, setScoreInfo] = useState({

    setOneScoreHome: matchData.player[0]["@s1"].split(".")[0],
    setOneScoreAway: matchData.player[1]["@s1"].split(".")[0],
    setTwoScoreHome: matchData.player[0]["@s2"].split(".")[0],
    setTwoScoreAway: matchData.player[1]["@s2"].split(".")[0],
    setThreeScoreHome: matchData.player[0]["@s3"].split(".")[0],
    setThreeScoreAway: matchData.player[1]["@s3"].split(".")[0],
    setFourScoreHome: matchData.player[0]["@s4"].split(".")[0],
    setFourScoreAway: matchData.player[1]["@s4"].split(".")[0],
    setFiveScoreHome: matchData.player[0]["@s5"].split(".")[0],
    setFiveScoreAway: matchData.player[1]["@s5"].split(".")[0],
    serviceScoreHome: matchData.player[0]["@game_score"],
    serviceScoreAway: matchData.player[1]["@game_score"],
    server: ""

  })

  const getCountryISO2 = require("country-iso-3-to-2");
  const CountryCodes = require('countrycodes/countryCodes.js')

  useEffect(() => {
    if (match === null) {
      console.log("UseEffect #1 - MatchCard.js - MatchCard component Initializing - Setting Match with MatchData prop")
      setMatch(matchData)
    }
  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      if (matchInfo.matchStatus.toLowerCase() === "inprogress" || matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "set 1" || matchInfo.matchStatus.toLowerCase() === "set 2" || matchInfo.matchStatus.toLowerCase() === "set 3" || matchInfo.matchStatus.toLowerCase() === "set 4" || matchInfo.matchStatus.toLowerCase() === "set 5") {

        const currentMatchID = matchData["@id"]

        console.log('UseEffect #2 - MatchCard.js - Interval to fetch updated Match Data from Goal Serve about to execute')

        const fetchMatch = async (matchID) => {

          const liveMatchDataXML = await getLiveMatchGoalServe(matchID)
          const liveMatchDataJSON = new XMLParser().parseFromString(liveMatchDataXML)


          setMatch(liveMatchDataJSON)

          setMatchInfo(prevState => ({
            ...prevState,
            matchStatus: liveMatchDataJSON.children[0].children[0].attributes.status
          }))

          setScoreInfo(prevState => ({
            ...prevState,
            setOneScoreHome: liveMatchDataJSON.children[0].children[0].children[0].attributes.s1.split(".")[0],
            setOneScoreAway: liveMatchDataJSON.children[0].children[0].children[1].attributes.s1.split(".")[0],
            setTwoScoreHome: liveMatchDataJSON.children[0].children[0].children[0].attributes.s2.split(".")[0],
            setTwoScoreAway: liveMatchDataJSON.children[0].children[0].children[1].attributes.s2.split(".")[0],
            setThreeScoreHome: liveMatchDataJSON.children[0].children[0].children[0].attributes.s3.split(".")[0],
            setThreeScoreAway: liveMatchDataJSON.children[0].children[0].children[1].attributes.s3.split(".")[0],
            setFourScoreHome: liveMatchDataJSON.children[0].children[0].children[0].attributes.s4.split(".")[0],
            setFourScoreAway: liveMatchDataJSON.children[0].children[0].children[1].attributes.s4.split(".")[0],
            setFiveScoreHome: liveMatchDataJSON.children[0].children[0].children[0].attributes.s5.split(".")[0],
            setFiveScoreAway: liveMatchDataJSON.children[0].children[0].children[1].attributes.s5.split(".")[0],
            serviceScoreHome: liveMatchDataJSON.children[0].children[0].children[0].attributes.game_score,
            serviceScoreAway: liveMatchDataJSON.children[0].children[0].children[1].attributes.game_score,
          }))
        }

        fetchMatch(currentMatchID)
      } else {

        clearInterval(interval)

      }
    }, 60000);
   
    return () => clearInterval(interval);

  }, [match, scoreInfo])

  useEffect(() => {

    const currentMatch = match

    console.log(currentMatch)

    if (currentMatch !== null) {

      const handleHomeScore = () => {
        if (matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "inprogress" || matchInfo.matchStatus.toLowerCase() === "set 1" || matchInfo.matchStatus.toLowerCase() === "set 2" || matchInfo.matchStatus.toLowerCase() === "set 3" || matchInfo.matchStatus.toLowerCase() === "set 4" || matchInfo.matchStatus.toLowerCase() === "set 5") {

          if (match.player) {

            if (match.player[0]["@game_score"] === "A") {

              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreHome: "AD"
              }))

            } else {

              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreHome: match.player[0]["@game_score"]
              }))

            }
          
          } else {

            if (match.children[0].children[0].children[0].attributes.game_score === "A") {

              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreHome: "AD"
              }))
  
            } else {
  
              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreHome: match.children[0].children[0].children[0].attributes.game_score
              }))
  
            }

          }

        }
      }

      const handleAwayScore = () => {
        
        if (matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "set 1" || matchInfo.matchStatus.toLowerCase() === "set 2" || matchInfo.matchStatus.toLowerCase() === "set 3" || matchInfo.matchStatus.toLowerCase() === "set 4" || matchInfo.matchStatus.toLowerCase() === "set 5") {

          if (match.player) {

            if (match.player[1]["@game_score"] === "A") {

              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreAway: "AD"
              }))

            } else {
              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreAway: match.player[1]["@game_score"]
              }))
            }

          } else {

            if (match.children[0].children[0].children[1].attributes.game_score === "A") {

              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreHome: "AD"
              }))
  
            } else {
  
              setScoreInfo(prevState => ({
                ...prevState,
                serviceScoreHome: match.children[0].children[0].children[1].attributes.game_score
              }))
  
            }

          }
        }
      }

      const handleServer = () => {
        if (matchInfo.matchStatus.toLowerCase() === "inprogress" || matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "set 1" || matchInfo.matchStatus.toLowerCase() === "set 2" || matchInfo.matchStatus.toLowerCase() === "set 3" || matchInfo.matchStatus.toLowerCase() === "set 4" || matchInfo.matchStatus.toLowerCase() === "set 5") {

          if (match.player) {

            if (match.player[0]["@serve"] === "True") {

              console.log('generating server')

              setScoreInfo(prevState => ({
                ...prevState,
                server: "home"
              }))

            } else if (match.player[1]["@serve"] === "True") {

              console.log('generating server')
              
              setScoreInfo(prevState => ({
                ...prevState,
                server: "away"
              }))
            }

          } else {

            if (match.children[0].children[0].children[0].attributes.serve === "True") {

              console.log('generating server')
  
              setScoreInfo(prevState => ({
                ...prevState,
                server: "home"
              }))
  
            } else if (match.children[0].children[0].children[1].attributes.serve === "True") {
  
              console.log('generating server')
              
              setScoreInfo(prevState => ({
                ...prevState,
                server: "away"
              }))
            }

          }

        } else if (matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "finished" || matchInfo.matchStatus.toLowerCase() === "complete" || matchInfo.matchStatus.toLowerCase() === "retired") {

          if (match.player) {

            if (match.player[0]["@winner"] === "True") {

              setScoreInfo(prevState => ({
                ...prevState,
                server: "homeWinner"
              }))

            } else if (match.player[1]["@winner"] === "True") {
              
              setScoreInfo(prevState => ({
                ...prevState,
                server: "awayWinner"
              }))
            }

          } else {

            if (match.children[0].children[0].attributes.winner === "True") {

              console.log('generating winner')
  
              setScoreInfo(prevState => ({
                ...prevState,
                server: "homeWinner"
              }))
  
            } else if (match.children[0].children[1].attributes.winner === "True") {
  
              console.log('generating winner')
              
              setScoreInfo(prevState => ({
                ...prevState,
                server: "awayWinner"
              }))
            }

          }

        }
      }
        
      handleHomeScore()
      handleAwayScore()
      handleServer()


    }
  }, [match, matchInfo])

  const handleMatch = (matchInfo, scoreInfo, matchID) => {
    localStorage.setItem("currentMatch", JSON.stringify(match))
    history.push(`/match/${matchID}`);
  };

  const generateCompetitor = (index, type) => {

    if (matchInfo.tournamentDiscipline === "Doubles") {

      const doublesTeamInfo = {
        partnerA: {
          name: matchInfo.homeCompetitor.split('/ ')[0]
        },
        partnerB: {
          name: matchInfo.homeCompetitor.split('/ ')[1]
        },
      }

      return (

        <div className="competitor-name-container" id={type}>

          <p className="competitor-name">{doublesTeamInfo.partnerA.name}{'/'}{doublesTeamInfo.partnerB.name}</p>

        </div>

      )

    } else {

      const competitor = matchData.player[index]
      const competitorName = competitor["@name"].split(". ")[competitor["@name"].split(". ").length - 1]

      const generateRanking = (type) => {
        if (supportingMatchData !== "No Corresponding Match" && type === "home" && supportingMatchData[0].home) {

          const ranking = '(' + supportingMatchData[0].home.ranking + ')'
          return ranking

        } else if (supportingMatchData !== "No Corresponding Match" && type === "away" && supportingMatchData[0].away) {


          const ranking = '(' + supportingMatchData[0].away.ranking + ')'
          return ranking

        } else {

          const ranking = ""
          return ranking

        }
      }

      const competitorRanking = generateRanking(type)

      const generateCountry = (type) => {
        if (supportingMatchData !== "No Corresponding Match" && type === "home" && supportingMatchData[0].home) {
  
          const country = supportingMatchData[0].home.country
          return country
  
        } else if (supportingMatchData !== "No Corresponding Match" && type === "away" && supportingMatchData[0].away) {
  
          const country = supportingMatchData[0].away.country
          return country
  
        }
      } 

      return (

        <div className="competitor-name-container" id={type}>


          {supportingMatchData !== "No Corresponding Match" && supportingMatchData[0].home && supportingMatchData[0].away ?
            
            <>

              <ReactCountryFlag
                className="emojiFlag"
                countryCode={CountryCodes.getCountry(generateCountry(type)).iso2}
                aria-label="United States"
                style={{
                  fontSize: '150%',
                  lineHeight: '150%',
                }}
              />
              
            </>

            :

            <></>

          }

          <p className="competitor-name">{competitorName}{' '}{(competitorRanking !== null && competitorRanking !== undefined) ? competitorRanking : ''}</p>

        </div>

      )
    }
  }
  
  const homePlayer = generateCompetitor(0, "home")

  const awayPlayer = generateCompetitor(1, "away")

  return (
    <div
      className="match-card-container"
      id={matchData.id}
      key={matchData.id}
    >
      <div className="match-card-header-container">

        <p className="match-card-title">{`${matchInfo.tournamentEvent} ${matchInfo.tournamentDiscipline}`}</p>

        <p className="match-court">{`${matchInfo.matchCourt}`}</p>

      </div>

      <div className="match-container">

        <div className="match-info-container">

          <p className="match-round">{`${matchInfo.tournamentRound}`}</p>

          <p className="match-status">{`${matchInfo.matchStatus}`}</p>

        </div>

        <div className="competitor-container" id="home">

          {homePlayer}

          {scoreInfo.server === "home" ? 
          
            <i className="fas fa-circle service-icon heartbeat" id="server home"></i>
            
          :
            
          <>
            
          {
            scoreInfo.server === "homeWinner" ?
            
            <i className="fas fa-check service-icon"></i>
              
          :
          
            <div className="service-icon" id="receiver home" />

          }
          </>
          
          }

          <p className="service-score home">{scoreInfo.serviceScoreHome}</p>

          <p className="set-score home" id="set-one">{scoreInfo.setOneScoreHome}</p>

          <p className="set-score home" id="set-two">{scoreInfo.setTwoScoreHome}</p>

          <p className="set-score home" id="set-three">{scoreInfo.setThreeScoreHome}</p>

          <p className="set-score home" id="set-four">{scoreInfo.setFourScoreHome}</p>

          <p className="set-score home" id="set-five">{scoreInfo.setFiveScoreHome}</p>

        </div>

        <div className="set-labels-container">

        <p className="set-label" id="service-score">SERVICE</p>

          <p className="set-label" id="set-one">1</p>

          <p className="set-label" id="set-two">2</p>

          <p className="set-label" id="set-three">3</p>

          <p className="set-label" id="set-four">4</p>

          <p className="set-label" id="set-five">5</p>

        </div>
        

        <div className="competitor-container" id="away">

          {awayPlayer}

          {scoreInfo.server === "away" ?

            <i className="fas fa-circle service-icon heartbeat" id="server away"></i>
            
            :
          
            <>
            
            {
              scoreInfo.server === "awayWinner" ?
              
              <i className="fas fa-check service-icon"></i>
                
            :
            
              <div className="service-icon" id="receiver away" />

            }
            </>

          }

          <p className="service-score away">{scoreInfo.serviceScoreAway}</p>

          <p className="set-score away" id="set-one">{scoreInfo.setOneScoreAway}</p>

          <p className="set-score away" id="set-two">{scoreInfo.setTwoScoreAway}</p>

          <p className="set-score away" id="set-three">{scoreInfo.setThreeScoreAway}</p>

          <p className="set-score away" id="set-four">{scoreInfo.setFourScoreAway}</p>

          <p className="set-score away" id="set-five">{scoreInfo.setFiveScoreAway}</p>

        </div>

      </div>

      <div className="match-stats-container">
        VIEW MATCH STATS
      </div>
      
    </div>
  );
}
