import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"

import "./MatchCard.css";

import {
  getMatch,
} from '../utils/matches'

export default function MatchCard(props) {
  const { matchData, key } = props;
  const history = useHistory();

  console.log(matchData)

  const [currentMatchData, setCurrentMatchData] = useState(matchData)

  const [match, setMatch] = useState(null)

  const [matchInfo, setMatchInfo] = useState({

    tournamentEvent: matchData.sport_event.tournament.gender,
    tournamentDiscipline: matchData.sport_event.sport_event_type,
    tournamentRound: matchData.sport_event.tournament_round.name,

    matchFormat: matchData.sport_event_conditions.match_mode,
    matchCourt: matchData.sport_event_conditions.venue.name,
    matchStatus: matchData.sport_event_status.status,

    homeCompetitorID: matchData.sport_event.competitors[0].id,
    homeCompetitor: matchData.sport_event.competitors[0].name,

    awayCompetitorID: matchData.sport_event.competitors[1].id,
    awayCompetitor: matchData.sport_event.competitors[1].name

  })

  const [scoreInfo, setScoreInfo] = useState({

    setOneScoreHome: "",
    setOneScoreAway: "",
    setTwoScoreHome: "",
    setTwoScoreAway: "",
    setThreeScoreHome: "",
    setThreeScoreAway: "",
    setFourScoreHome: "",
    setFourScoreAway: "",
    setFiveScoreHome: "",
    setFiveScoreAway: "",
    serviceScoreHome: "",
    serviceScoreAway: "",
    server: ""

  })

  const getCountryISO2 = require("country-iso-3-to-2");

  useEffect(() => {
    
    if (match === null || (currentMatchData.sport_event.id !== match.sport_event.id)) {
      console.log('setMatchData')
      setMatch(matchData)
    }
    
  }, [currentMatchData])

  useEffect(() => {

    const interval = setInterval(() => {

      if (matchInfo.matchStatus.toLowerCase() === "live") {

        const currentMatchID = matchData.sport_event.id

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

  }, [scoreInfo])

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
          case "round_of_64":
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
          case "round_of_16":
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
          case "semifinal":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "Semifinal"
            }));
            break;
          case "round_of_2":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "FINAL"
            }));
            break;
          case "final":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentRound: "FINAL"
            }));
            break;
          default:
            break;
        }
      };

      parseTournamentRound(
        match.sport_event.tournament_round.name
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
            break;
        }
      };

      parseTournamentDiscipline(
        match.sport_event.sport_event_type
      );

      const parseTournamentGender = (tournamentGender) => {
        switch (tournamentGender) {
          case "men":
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
          case "mixed":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "MIXED"
            }));
            break;
          default:
            break;
        }
      };

      parseTournamentGender(
        match.sport_event.tournament.gender
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
          default:
            break;
        }
      };


      parseMatchStatus(
        matchData.sport_event_status.status
      );

    }
  }, [match])

  useEffect(() => {

    const currentMatch = match

    if (currentMatch !== null) {

      const handleHomeScore = () => {
        if ((matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "ended" || matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "interrupted") && match.sport_event_status.game_state !== undefined) {

          if (match.sport_event_status.game_state.home_score === 50) {

            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreHome: "AD"
            }))

          } else {

            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreHome: match.sport_event_status.game_state.home_score
            }))

          }


        }
      }

      const handleAwayScore = () => {
        
        if ((matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "ended" || matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "interrupted") && match.sport_event_status.game_state !== undefined) {

          if (match.sport_event_status.game_state.away_score === 50) {

            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreAway: "AD"
            }))

          } else {
            setScoreInfo(prevState => ({
              ...prevState,
              serviceScoreAway: match.sport_event_status.game_state.away_score
            }))
          }
        }
      }

      const generateSets = (formatValue) => {
        
        if ((matchInfo.matchStatus.toLowerCase() === "live" || matchInfo.matchStatus.toLowerCase() === "ended" || matchInfo.matchStatus.toLowerCase() === "closed" || matchInfo.matchStatus.toLowerCase() === "interrupted") && match.sport_event_status.period_scores !== undefined) {

          const sets = ["setOneScore", "setTwoScore", "setThreeScore", "setFourScore", "setFiveScore"]

          for (let i = 0; i < formatValue; i++) {

            if (match.sport_event_status.period_scores[i] !== undefined) {
          
              let homeScore = sets[i] + "Home"
              let awayScore = sets[i] + "Away"

              setScoreInfo(prevState => ({
                ...prevState,
                [homeScore]: match.sport_event_status.period_scores[i].home_score,
                [awayScore]: match.sport_event_status.period_scores[i].away_score
              }))
            }
          }
        }
      }

      const handleServer = () => {
        if (matchInfo.matchStatus.toLowerCase() === "live") {
          if (match.sport_event_status.game_state.serving) {
            setScoreInfo(prevState => ({
              ...prevState,
              server: match.sport_event_status.game_state.serving
            }))
          }
        } else if (matchInfo.matchStatus.toLowerCase() === "closed") {
          if (match.sport_event_status.winner_id) {
            if (match.sport_event_status.winner_id === matchInfo.homeCompetitorID) {
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

      if (matchInfo.matchFormat === "bo3") {

        let formatValue = 3

        generateSets(formatValue, match)

      } else if (matchInfo.matchFormat === "bo5") {

        let formatValue = 5

        generateSets(formatValue, match)

      }

    }
  }, [match, matchInfo])

  const handleMatch = (matchInfo, scoreInfo, matchID) => {
    localStorage.setItem("currentMatch", JSON.stringify(match))
    history.push(`/match/${matchID}`);
  };

  const generateCompetitor = (index, type) => {
    if (matchData.sport_event.sport_event_type === "doubles") {

      const competitor = matchData.sport_event.competitors[index]

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
                fontSize: '1em',
                lineHeight: '1em',
            }}
              aria-label="United States"
            />
            
            <p className="player-country-seperator">/</p>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={partnerBAlpha2Country}
              style={{
                fontSize: '1em',
                lineHeight: '1em',
            }}
              aria-label="United States"
            />

          <p className="competitor-name">{doublesTeamInfo.partnerA.name}{'/'}{doublesTeamInfo.partnerB.name}{' '}{(competitor.seed !== null || competitor.seed !== undefined) ? doublesTeamInfo.seed : ''}</p>

        </div>

      )

    } else {

      const competitor = matchData.sport_event.competitors[index]
      const competitorName = competitor.name
      const competitorSeed = '(' + competitor.seed + ')'
      const competitorCountryCode = competitor.country_code
      const alpha2Country = getCountryISO2(competitorCountryCode)

      return (

        <div className="competitor-name-container" id={type}>

            <ReactCountryFlag
              className="emojiFlag"
              countryCode={alpha2Country}
              style={{
                fontSize: '1em',
                lineHeight: '1em',
              }}
              aria-label="United States"
            />

          <p className="competitor-name">{competitorName}{' '}{(competitor.seed !== null || competitor.seed !== undefined) ? competitorSeed : ''}</p>

        </div>

      )
    }
  }
  
  const homePlayer = generateCompetitor(0, "home")

  const awayPlayer = generateCompetitor(1, "away")

  return (
    <div
      className="match-card-container"
      id={key}
      key={key}
      onClick={(e) => handleMatch(matchInfo, scoreInfo, matchData.sport_event.id)}
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
              
              <i class="fas fa-check service-icon"></i>
                
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
