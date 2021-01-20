import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./MatchCard.css";

export default function MatchCard(props) {
  const { match, index, key } = props;
  const history = useHistory();

  // const [matchData, setMatchData] = useState({

  // })

  const parseTournamentRound = (tournamentRound) => {
    switch (tournamentRound) {
      case "round_of_128":
        return "Round of 128";
      case "round_of_64":
        return "Round of 64";
      case "round_of_32":
        return "Round of 32";
      case "Round of 16":
        return "Completed Matches";
      case "round_of_8":
        return "Quarterfinal";
      case "quarterfinal":
        return "Quarterfinal";
      case "round_of_4":
        return "Semifinal";
      case "round_of_4":
        return "Semifinal";
      case "round_of_2":
        return "Final";
      case "final":
        return "Final";
      default:
        return "";
    }
  };

  const tournamentRound = parseTournamentRound(
    match.sport_event.tournament_round.name
  );

  const parseTournamentDiscipline = (tournamentType) => {
    switch (tournamentType) {
      case "singles":
        return "Singles";
      case "doubles":
        return "Doubles";
      case "mixed":
        return "Mixed";
      default:
        return "";
    }
  };

  const tournamentDiscipline = parseTournamentDiscipline(
    match.sport_event.sport_event_type
  );

  const parseTournamentGender = (tournamentGender) => {
    switch (tournamentGender) {
      case "men":
        return "Men's";
      case "women":
        return "Women's";
      case "mixed":
        return "Mixed";
      default:
        return "";
    }
  };

  const tournamentGender = parseTournamentGender(
    match.sport_event.tournament.gender
  );

  const players =
    match &&
    match?.sport_event.competitors.map((competitor, index) => (
      <div className={ index === 0 ? "competitor-container home" : "competitor-container away" } >
        <p className="competitor-name">{`${competitor.name}`}</p>
      </div>
    ));

  const completedSets =
    match.sport_event_status.period_scores &&
    match?.sport_event_status.period_scores.map((set, index) => (
      <div className="completed-set-container" id={index} >
        <p className="completed-set-score home">{set.home}</p>

        <p className="completed-set-score away">{set.away}</p>
      </div>
    ));

  const generateSets = function (match, completedSets) {
    let totalCompletedSets =
      completedSets === undefined ? 0 : completedSets.length;

    console.log(totalCompletedSets)

    let incompleteSets = []

    if (match.sport_event_conditions.match_mode === "bo3") {

      for (let i = 1; i <= 3 - totalCompletedSets; i++) {
        
        incompleteSets[i] =

          <div className="uncompleted-set-container" id={i} >
            <p className="uncompleted-set-score home"></p>

            <p className="uncompleted-set-score away"></p>
          </div>
        
      }

      return incompleteSets

    } else {

      for (let i = 1; i <= 5 - totalCompletedSets; i++) {
        
        incompleteSets[i] =
          
          <div className="uncompleted-set-container" id={i} >
            <p className="uncompleted-set-score home"></p>

            <p className="uncompleted-set-score away"></p>
          </div>
        
      }

      return incompleteSets

    }
  };

  const incompleteSets = generateSets(match, completedSets);

  console.log(completedSets)
  console.log(incompleteSets)

  const handleMatch = (match, matchid) => {
    localStorage.setItem("currentSinglesTournament", JSON.stringify(match));
    history.push(`/tournament/${matchid}`);
  };

  return (
    <div
      className="match-card-container"
      id={key}
      key={key}
      onClick={(e) => handleMatch(match, match.id)}
    >
      <div className="match-card-header-container">
        <p className="match-card-title">{`${tournamentGender} ${tournamentDiscipline} - ${tournamentRound}`}</p>
        <p className="match-court">{`${match.sport_event_conditions.venue.name}`}</p>
      </div>

      <div className="match-container">

        <div className="competitors-container">
          {players}
        </div>

        <div className="score-container">

          <div className="service-container">

            {match.sport_event_status.status === "live" ? (

              match.sport_event_status.game_state.serving === "home" ? (
                <>
                  <i className="fas fa-circle server-icon home"></i>

                  <div className="receiver-icon away" />
                </>
              ) : (
                <>
                  <div className="receiver-icon home" />

                  <i className="fas fa-circle server-icon away"></i>
                </>
              )
            ) : (
              <>
                <i className="fas fa-circle server-icon home"></i>

                <div className="receiver-icon away" />
              </>
            )}
            
          </div>

          <div className="service-score-container">

            {match.sport_event_status.status === "live" ? (
              <>
                <p className="service-score home">
                  {match.sport_event_status.game_state.home_score}
                </p>

                <p className="service-score away">
                  {match.sport_event_status.game_state.away_score}
                </p>
              </>
            ) : (
              <>
                <p className="service-score home"></p>

                <p className="service-score away"></p>
              </>
            )}
          </div>

          {completedSets}

          {incompleteSets}

        </div>
      </div>

      <div className="match-status-container">
        {match.sport_event_status.status}
      </div>
    </div>
  );
}
