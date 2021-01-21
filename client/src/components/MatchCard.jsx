import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./MatchCard.css";

import {
  getMatch,
  getMatchDetails
} from '../utils/matches'

export default function MatchCard(props) {
  const { matchData, index, key } = props;
  const history = useHistory();

  const [ match, setMatch ] = useState(null)

  const [matchInfo, setMatchInfo] = useState({

    tournamentEvent: match.sport_event.tournament.gender,
    tournamentDiscipline: match.sport_event.sport_event_type,
    tournamentRound: match.sport_event.tournament_round.name,

    matchFormat: match.sport_event_conditions.match_mode,
    matchCourt: match.sport_event_conditions.venue.name,
    matchStatus: match.sport_event_status.status,

    homeCompetitor: match.sport_event.competitors[0].name,
    awayCompetitor: match.sport_event.competitors[1].name

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

  useEffect(() => {
    if (match === null) {
      setMatch(matchData)
    } else {
      const fetchMatch = async (matchID) => {
        const data = await getMatch(matchID)
        setMatch(data)
      }
      fetchMatch(matchData.id)
    }  
  }, [])

  useEffect(() => {

    if (match !== null) {

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
              tournamentDiscipline: "Singles"
            }));
            break;
          case "doubles":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentDiscipline: "Doubles"
            }));
            break;
          case "mixed":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentDiscipline: "Mixed"
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
              tournamentEvent: "Men's"
            }));
            break;
          case "women":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "Women's"
            }));
            break;
          case "mixed":
            setMatchInfo(prevState => ({
              ...prevState,
              tournamentEvent: "Mixed"
            }));
            break;
          default:
            break;
        }
      };

      parseTournamentGender(
        match.sport_event.tournament.gender
      );
    }
  }, [match])

  useEffect(() => {

    if (matchInfo.matchStatus === "live") {

      setScoreInfo(prevState => ({
        ...prevState,
        server: match.sport_event_status.game_state.serving
      }))

      setScoreInfo(prevState => ({
        ...prevState,
        serviceScoreHome: match.sport_event_status.game_state.home_score
      }))

      setScoreInfo(prevState => ({
        ...prevState,
        serviceScoreAway: match.sport_event_status.game_state.away_score
      }))

      let formatValue

      const generateSets = (formatValue) => {

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

      if (matchInfo.matchFormat === "bo3") {

        formatValue = 3

        generateSets(formatValue)

      } else if (matchInfo.matchFormat === "bo5") {

        formatValue = 5

        generateSets(formatValue)

      }
    }
  }, [matchInfo])

  const handleMatch = (matchInfo, scoreInfo, matchid) => {
    localStorage.setItem("currentMatchInfo", JSON.stringify(matchInfo))
    localStorage.setItem("currentMatchScore", JSON.stringify(scoreInfo));
    history.push(`/tournament/${matchid}`);
  };

  return (
    <div
      className="match-card-container"
      id={key}
      key={key}
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

          <p className="competitor-name">{`${matchInfo.homeCompetitor}`}</p>

          {scoreInfo.server === "home" ? 
          
            <i className="fas fa-circle service-icon" id="server home"></i>
            
          :
            
            <div className="service-icon" id="receiver home" />
          
          }

          <p className="service-score home">{scoreInfo.serviceScoreHome}</p>

          <p className="set-score home" id="set-one">{scoreInfo.setOneScoreHome}</p>

          <p className="set-score home" id="set-two">{scoreInfo.setTwoScoreHome}</p>

          <p className="set-score home" id="set-three">{scoreInfo.setThreeScoreHome}</p>

          <p className="set-score home" id="set-four">{scoreInfo.setFourScoreHome}</p>

          <p className="set-score home" id="set-five">{scoreInfo.setFiveScoreHome}</p>

        </div>

        <div className="set-labels-container">

          <p className="set-label" id="set-one">1</p>

          <p className="set-label" id="set-two">2</p>

          <p className="set-label" id="set-three">3</p>

          <p className="set-label" id="set-four">4</p>

          <p className="set-label" id="set-five">5</p>

        </div>
        

        <div className="competitor-container" id="away">

          <p className="competitor-name">{`${matchInfo.awayCompetitor}`}</p>

          {scoreInfo.server === "away" ? 

            <i className="fas fa-circle service-icon" id="server away"></i>
            
          :
            
            <div className="service-icon" id="receiver away" />

          }

          <p className="service-score away">{scoreInfo.serviceScoreAway}</p>

          <p className="set-score away" id="set-one">{scoreInfo.setOneScoreAway}</p>

          <p className="set-score away" id="set-two">{scoreInfo.setTwoScoreAway}</p>

          <p className="set-score away" id="set-three">{scoreInfo.setThreeScoreAway}</p>

          <p className="set-score away" id="set-four">{scoreInfo.setFourScoreAway}</p>

          <p className="set-score away" id="set-five">{scoreInfo.setFiveScoreAway}</p>

        </div>

      </div>

      <div className="match-stats-container"
           onClick={(e) => handleMatch(matchInfo, match.id)}>
        VIEW MATCH STATS
      </div>
      
    </div>
  );
}
