import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"

import "./MatchCard.css";

import {
  getMatch,
} from '../utils/matches'

export default function MatchCard(props) {
  const { matchData, supportingMatchData, discipline, tournamentGender, court, round, status } = props;
  const history = useHistory();

  console.log(matchData)
  console.log(supportingMatchData)

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

    setOneScoreHome: matchData.player[0]["@s1"],
    setOneScoreAway: matchData.player[1]["@s1"],
    setTwoScoreHome: matchData.player[0]["@s2"],
    setTwoScoreAway: matchData.player[1]["@s2"],
    setThreeScoreHome: matchData.player[0]["@s3"],
    setThreeScoreAway: matchData.player[1]["@s3"],
    setFourScoreHome: matchData.player[0]["@s4"],
    setFourScoreAway: matchData.player[1]["@s4"],
    setFiveScoreHome: matchData.player[0]["@s5"],
    setFiveScoreAway: matchData.player[1]["@s5"],
    serviceScoreHome: matchData.player[0]["@game_score"],
    serviceScoreAway: matchData.player[1]["@game_score"],
    server: ""

  })

  const getCountryISO2 = require("country-iso-3-to-2");
  const CountryCodes = require('countrycodes/countryCodes.js')

  useEffect(() => {
    setCurrentMatchData(matchData)
  }, [matchData])

  useEffect(() => {
    
    if (match === null || (currentMatchData.id !== match.id)) {
      console.log('setMatchData')
      setMatch(matchData)
    }
    
  }, [matchData, currentMatchData])

  useEffect(() => {

    const interval = setInterval(() => {

      if (matchInfo.matchStatus.toLowerCase() === "inprogress") {

        const currentMatchID = matchData["@id"]

        console.log('live data')
        console.log(matchData)
        const fetchMatch = async (matchID) => {
          const data = await getMatch(matchID)
          console.log("interval for fetchMatch within MatchCard")
          setMatch(data)
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

    if (currentMatch !== null) {

      const parseTournamentRound = (tournamentRound) => {
        switch (tournamentRound) {
          case "round_of_128":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 128"
            }));
            break;
          case "1/128":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 128"
            }));
          break;
          case "round_of_64":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 64"
            }));
            break;
          case "1/64":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 64"
            }));
          break;
          case "round_of_32":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 32"
            }));
            break;
          case "1/32":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 32"
            }));
          break;
          case "round_of_16":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 16"
            }));
            break;
          case "1/16":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Round of 16"
            }));
          break;
          case "round_of_8":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Quarterfinal"
            }));
            break;
          case "1/8":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Quarterfinal"
            }));
          break;
          case "quarterfinal":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Quarterfinal"
            }));
            break;
          case "round_of_4":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Semifinal"
            }));
            break;
          case "1/4":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Semifinal"
            }));
          break;
          case "semifinal":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Semifinal"
            }));
            break;
          case "round_of_2":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Final"
            }));
            break;
          case "1/2":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Final"
            }));
          break;
          case "final":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Final"
            }));
            break;
          default:
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: tournamentRound
            }));
            break;
        }
      };

      parseTournamentRound(
        round
      );

      const parseTournamentDiscipline = (tournamentType) => {
        switch (tournamentType) {
          case "singles":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentDiscipline: "SINGLES"
            }));
            break;
          case "doubles":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentDiscipline: "DOUBLES"
            }));
            break;
          case "mixed":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentDiscipline: "MIXED"
            }));
            break;
          default:
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentDiscipline: discipline
            }))
            break;
        }
      };

      parseTournamentDiscipline(
        discipline
      );

      const parseTournamentGender = (tournamentGender) => {
        switch (tournamentGender) {
          case "men":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "MEN'S"
            }));
            break;
          case "ATP":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "MEN'S"
            }));
          break;
          case "women":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "WOMEN'S"
            }));
            break;
          case "WTA":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "MEN'S"
            }));
          break;
          case "mixed":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "MIXED"
            }));
            break;
          default:
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: tournamentGender
            }));
            break;
        }
      };

      parseTournamentGender(
        tournamentGender
      );

      const parseMatchStatus = (props) => {
        switch (props) {
          case "not_started":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Not Started"
            }));
            break;
          case "match_about_to_start":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Match To Start"
            }));
            break;
          case "live":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Live"
            }));
            break;
          case "closed":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Complete"
            }));
            break;
          case "ended":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Complete"
            }));
            break;
          case "interrupted":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Interrupted"
            }));
            break;
          case "suspended":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Suspended"
            }));
            break;
          case "cancelled":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Cancelled"
            }));
            break;
          case "delayed":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Delayed"
            }));
            break;
          case "abandoned":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Abandoned"
            }));
            break;
          case "inprogress":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Live"
            }));
          break;
          case "notstarted":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Not Started"
            }));
          break;
          case "finished":
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: "Complete"
            }));
          break;
          default:
            setMatchInfo(prevState => ({
              ...prevState,
              matchStatus: status
            }));
            break;
        }
      };


      parseMatchStatus(
        status
      );

      const parseMatchCompetitors = (match) => {
        setMatchInfo(prevState => ({
          ...prevState,
          homeCompetitorID: matchData.player[0]["@id"]
        }));
        setMatchInfo(prevState => ({
          ...prevState,
          homeCompetitor: matchData.player[0]["@name"]
        }));
        setMatchInfo(prevState => ({
          ...prevState,
          awayCompetitorID: matchData.player[1]["@id"]
        }));
        setMatchInfo(prevState => ({
          ...prevState,
          awayCompetitor: matchData.player[1]["@name"]
        }));
      }

      parseMatchCompetitors(matchData)

    }
  }, [match])

  useEffect(() => {

    const currentMatch = match

    if (currentMatch !== null) {

      const handleHomeScore = () => {
        if ((matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "ended" || matchInfo.matchStatus.toLowerCase() === "finished" || matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "interrupted") && match.result !== undefined) {

          if (match.result === 50) {

            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreHome: "AD"
            }))

          } else {

            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreHome: match.result
            }))

          }


        }
      }

      const handleAwayScore = () => {
        
        if ((matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "ended" || matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "interrupted") && match.result !== undefined) {

          if (match.result === 50) {

            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreAway: "AD"
            }))

          } else {
            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreAway: match.result
            }))
          }
        }
      }

      const generateSets = () => {
        
        if ((matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "ended" || matchInfo.matchStatus.toLowerCase() === "finished" || matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "interrupted" || matchInfo.matchStatus.toLowerCase() === "complete") && match.result !== undefined) {

          const sets = ["setOneScore", "setTwoScore", "setThreeScore", "setFourScore", "setFiveScore"]

          for (let i = 1; i <= 5; i++) {

            let index = i - 1

            let test = `home_set${i}`

            if (match.result.[test] !== undefined) {
          
              let homeScore = sets[index] + "Home"
              let awayScore = sets[index] + "Away"

              let homeEndpoint = `home_set${i}`
              let awayEndpoint = `away_set${i}`

              setScoreInfo(prevState => ({
                ...prevState,
                [homeScore]: match.result.[homeEndpoint],
                [awayScore]: match.result.[awayEndpoint]
              }))
            }
          }
        }
      }

      const handleServer = () => {
        if (matchInfo.matchStatus.toLowerCase() === "live") {
          if (match.result.serving) {
            setScoreInfo(prevState => ({
              ...prevState,
              server: match.result.serving
            }))
          }
        } else if (matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "finished" || matchInfo.matchStatus.toLowerCase() === "complete") {
          if (match.result.winner_id) {
            if (match.result.winner_id === matchInfo.homeCompetitorID) {
              setScoreInfo(prevState => ({
                ...prevState,
                server: "homeWinner"
              }))
            } else {
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
      generateSets(match)

    }
  }, [match, matchInfo])

  const handleMatch = (matchInfo, scoreInfo, matchID) => {
    localStorage.setItem("currentMatch", JSON.stringify(match))
    history.push(`/match/${matchID}`);
  };

  const generateCompetitor = (index, type) => {
    if (matchInfo.tournamentDiscipline === "Doubles") {

      const competitor = matchData.type

      const doublesTeamInfo = {
        partnerA: {
          name: competitor.players[0].name.split(',')[0],
          countryCode: competitor.players[0].country_code
        },
        partnerB: {
          name: competitor.players[1].name.split(',')[0],
          countryCode: competitor.players[1].country_code
        },
        seed: competitor.seed
      }

      const partnerAAlpha2Country = getCountryISO2(doublesTeamInfo.partnerA.countryCode)
      const partnerBAlpha2Country = getCountryISO2(doublesTeamInfo.partnerB.countryCode)

      return (

        <div className="competitor-name-container" id={type}>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={partnerAAlpha2Country}
              style={{
                fontSize: '150%',
                lineHeight: '150%',
            }}
              aria-label="United States"
            />
            
            <p className="player-country-seperator">/</p>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={partnerBAlpha2Country}
              style={{
                fontSize: '150%',
                lineHeight: '150%',
            }}
              aria-label="United States"
            />

          <p className="competitor-name">{doublesTeamInfo.partnerA.name}{'/'}{doublesTeamInfo.partnerB.name}{' '}{(competitor.seed !== null || competitor.seed !== undefined) ? doublesTeamInfo.seed : ''}</p>

        </div>

      )

    } else {

      const competitor = matchData.player[index]
      const competitorName = competitor["@name"]

      const generateRanking = (type) => {
        if (type === "home") {

          const ranking = '(' + supportingMatchData[0].home.ranking + ')'
          return ranking

        } else if (type === "away") {

          const ranking = '(' + supportingMatchData[0].away.ranking + ')'
          return ranking

        }
      }

      const competitorRanking = generateRanking(type)
        console.log(competitorRanking)

      const generateCountry = (type) => {
        if (type === "home") {
  
          const country = supportingMatchData[0].home.country
          return country
  
        } else if (type === "away") {
  
          const country = supportingMatchData[0].away.country
          return country
  
        }
      }
      
      const competitorCountry = CountryCodes.getCountry(generateCountry(type))
        console.log(competitorCountry)
      
      const competitorCountryCode = competitorCountry.iso2
        console.log(competitorCountryCode)  

      return (

        <div className="competitor-name-container" id={type}>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={competitorCountryCode}
              aria-label="United States"
              style={{
                fontSize: '150%',
                lineHeight: '150%',
            }}
            />

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
