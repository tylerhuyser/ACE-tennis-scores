import React from "react";

import MatchCard from "../components/MatchCard";

import "./Matches.css";

export default function Matches(props) {
  const { matchesData, supportingMatchesData, view, discipline, tournamentGender } = props;

  console.log(matchesData)

  const matches =
    matchesData &&
    matchesData?.map((matchData, index) => {

      console.log(supportingMatchesData)

      const correspondingMatchData = supportingMatchesData && supportingMatchesData?.filter((match) => { console.log(matchData); console.log(match); return (match.title.includes(matchData.player[0]["@name"].split(" ")[1]) || match.title.includes(matchData.player[1]["@name"].split(" ")[1])) })

      return (
        <MatchCard
          matchData={matchData}
          index={index}
          key={matchData.id}
          discipline={discipline}
          tournamentGender={tournamentGender}
          supportingMatchData={(correspondingMatchData === null || correspondingMatchData === undefined || correspondingMatchData.length === 0) ? "No Corresponding Match" : correspondingMatchData}
          court={(correspondingMatchData === null || correspondingMatchData === undefined || correspondingMatchData.length === 0) ? "" : correspondingMatchData[0].court}
          round={(correspondingMatchData === null || correspondingMatchData === undefined || correspondingMatchData.length === 0) ? "" : correspondingMatchData[0].round_name}
          status={matchData["@status"]}
        />
      )
    });

  return (
    <div className="matches-container">
      {matchesData !== undefined &&
      matchesData !== null &&
      matchesData.length !== 0 ? (
        <>{matches}</>
      ) : (
        <p className="match-container-copy">
          {`Currently, there are no ${view.toLowerCase()} to display. :(`}
        </p>
      )}
    </div>
  );
}
